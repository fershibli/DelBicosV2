import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Image,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import CustomTextInput from '@components/ui/CustomTextInput';
import CustomSelect from '@components/ui/CustomSelect';
import { useServicesStore, ServiceItem } from '@stores/Services/Services';
import { useSubCategoryStore } from '@stores/SubCategory';
import { useCategoryStore } from '@stores/Category';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { useColors } from '@theme/ThemeProvider';
import AvailabilityManager from '@components/features/ServiceAvailability/AvailabilityManager';

type Props = {
  initial?: ServiceItem | null;
  onClose: () => void;
};

const DURATION_OPTIONS = [
  { label: '15 min', value: '15' },
  { label: '30 min', value: '30' },
  { label: '45 min', value: '45' },
  { label: '1h', value: '60' },
  { label: '1h 30min', value: '90' },
  { label: '2h', value: '120' },
  { label: '3h', value: '180' },
];

// Formata string para máscara de moeda (R$): "1234" → "R$ 12,34"
function maskCurrency(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  const cents = parseInt(digits, 10);
  return (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

// Remove máscara e retorna string numérica "12.34"
function unmaskCurrency(masked: string): string {
  const digits = masked.replace(/\D/g, '');
  if (!digits) return '';
  return (parseInt(digits, 10) / 100).toFixed(2);
}

const ServiceForm: React.FC<Props> = ({ initial, onClose }) => {
  const { createService, updateService, reloadServices, reloadMyServices } =
    useServicesStore();
  const {
    subCategories,
    fetchAllSubCategories,
    fetchSubCategoriesByCategoryId,
  } = useSubCategoryStore();
  const { categories, fetchCategories } = useCategoryStore();
  const colors = useColors();
  const styles = createStyles(colors);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const [subcategoryError, setSubcategoryError] = useState<string | null>(null);
  const saveBtnAnim = useRef(new Animated.Value(1)).current;

  // Anima o botão Salvar ao entrar/sair do estado desabilitado
  useEffect(() => {
    Animated.timing(saveBtnAnim, {
      toValue: submitting || uploading ? 0.55 : 1,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [submitting, uploading, saveBtnAnim]);

  useEffect(() => {
    fetchCategories();
    fetchAllSubCategories();
  }, [fetchCategories, fetchAllSubCategories]);

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: initial?.title || '',
      description: initial?.description || '',
      price: initial?.price_cents
        ? maskCurrency(String(initial.price_cents))
        : '',
      duration: initial?.duration ? String(initial.duration) : '',
      category_id: initial?.category_id ? String(initial.category_id) : '',
      subcategory_id: initial?.subcategory_id
        ? String(initial.subcategory_id)
        : '',
      banner_uri: initial?.banner_uri || '',
      active: initial?.active !== undefined ? initial.active : true,
      availabilities: initial?.availabilities || [],
    },
  });

  const bannerUri = watch('banner_uri');

  const categoryOptions = categories.map((c) => ({
    label: c.title,
    value: String(c.id),
  }));

  const subCategoryOptions = subCategories
    .filter((s) => {
      const catId = watch('category_id');
      if (!catId) return true;
      return s.category_id === Number(catId);
    })
    .map((s) => ({ label: s.title, value: String(s.id) }));

  const pickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Permita acesso à galeria para adicionar foto.',
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
      base64: false,
    });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setUploading(true);
      try {
        // 1. Solicitar presigned URL ao backend
        const ext = (asset.uri.split('.').pop() || 'jpg').toLowerCase();
        const { data } = await backendHttpClient.post('/api/uploads', {
          filename: `service-banner.${ext}`,
          contentType: asset.mimeType || `image/${ext}`,
        });
        // backend may return presignedUrl or uploadUrl — use whichever is present
        const presignedUrl: string = data.presignedUrl || data.uploadUrl;
        const fileUrl: string = data.fileUrl || data.url;

        // 2. Fazer upload direto para o S3
        const blob = await fetch(asset.uri).then((r) => r.blob());
        await fetch(presignedUrl, {
          method: 'PUT',
          body: blob,
          headers: { 'Content-Type': asset.mimeType || `image/${ext}` },
        });

        // 3. Salvar URL pública no formulário
        setValue('banner_uri', fileUrl);
      } catch (e) {
        console.error('[ServiceForm] upload banner', e);
        Alert.alert('Erro', 'Não foi possível enviar a foto. Tente novamente.');
      } finally {
        setUploading(false);
      }
    }
  }, [setValue]);

  // Desabilita o botão imediatamente no toque, antes de react-hook-form validar
  const handleSave = useCallback(async () => {
    if (submittingRef.current || submitting) return;
    setSubmitting(true);
    submittingRef.current = true;
    // handleSubmit só chama onSubmit se a validação passar;
    // se falhar, onSubmit não roda e finally não reseta — resetamos aqui
    await handleSubmit(onSubmit)();
    if (submittingRef.current) {
      setSubmitting(false);
      submittingRef.current = false;
    }
  }, [submitting, handleSubmit]);

  const onSubmit = async (data: any) => {
    if (subcategoryError) {
      setSubmitting(false);
      submittingRef.current = false;
      Alert.alert('Erro', subcategoryError);
      return;
    }

    const payload: any = {
      title: data.title,
      description: data.description,
      // Contrato: enviar price como float; backend calcula price_cents
      price: data.price ? Number(unmaskCurrency(data.price)) : undefined,
      duration: data.duration ? Number(data.duration) : undefined,
      category_id: data.category_id ? Number(data.category_id) : undefined,
      subcategory_id: data.subcategory_id
        ? Number(data.subcategory_id)
        : undefined,
      banner_uri: data.banner_uri || undefined,
      active: data.active,
      availabilities: Array.isArray(data.availabilities)
        ? data.availabilities.map((a: any) => ({
            day: Number(a.day),
            start: String(a.start),
            end: String(a.end),
          }))
        : undefined,
    };

    try {
      let result;
      if (initial?.id) {
        result = await updateService(initial.id, payload);
      } else {
        result = await createService(payload);
      }

      // Refresh public list of services to reflect changes immediately
      try {
        if (typeof reloadMyServices === 'function') {
          await reloadMyServices();
        } else {
          await reloadServices();
        }
      } catch (e) {
        console.warn('[ServiceForm] reload services failed', e);
      }

      // success: close modal
      onClose();
    } catch (error: any) {
      console.error('[ServiceForm] save error', error);
      const status = error?.response?.status;
      const data = error?.response?.data;
      const message =
        data?.error ||
        data?.message ||
        data?.msg ||
        error?.message ||
        'Erro ao salvar serviço.';
      if (status === 401) {
        try {
          const signOut =
            require('@stores/User').useUserStore.getState().signOut;
          if (typeof signOut === 'function') signOut();
        } catch (e) {
          console.error('Failed to sign out after 401', e);
        }
      }
      Alert.alert('Erro', message);
    } finally {
      setSubmitting(false);
      submittingRef.current = false;
    }
  };

  // Validação UX: subcategoria pertence à categoria selecionada
  useEffect(() => {
    const catId = watch('category_id');
    const subId = watch('subcategory_id');
    if (!subId) {
      setSubcategoryError(null);
      return;
    }
    const found = subCategories.find((s) => String(s.id) === String(subId));
    if (!found) {
      setSubcategoryError('Subcategoria inválida');
      return;
    }
    if (catId && String(found.category_id) !== String(catId)) {
      setSubcategoryError(
        'A subcategoria não pertence à categoria selecionada',
      );
    } else {
      setSubcategoryError(null);
    }
  }, [watch('category_id'), watch('subcategory_id'), subCategories]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.header}>
        {initial ? 'Editar Serviço' : 'Novo Serviço'}
      </Text>

      {/* Título */}
      <Controller
        control={control}
        name="title"
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CustomTextInput
            label="Título *"
            value={value}
            onChangeText={onChange}
            error={error ? 'Campo obrigatório' : undefined}
          />
        )}
      />

      {/* Descrição */}
      <Controller
        control={control}
        name="description"
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CustomTextInput
            label="Descrição *"
            value={value}
            onChangeText={onChange}
            multiline
            numberOfLines={3}
            error={error ? 'Campo obrigatório' : undefined}
          />
        )}
      />

      {/* Categoria */}
      <Controller
        control={control}
        name="category_id"
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CustomSelect
            label="Categoria *"
            value={value}
            options={categoryOptions}
            onChange={(v) => {
              onChange(v);
              // limpar subcategoria ao trocar categoria
              setValue('subcategory_id', '');
            }}
            placeholder="Selecione a categoria"
            error={error}
          />
        )}
      />

      {/* Subcategoria */}
      <Controller
        control={control}
        name="subcategory_id"
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CustomSelect
            label="Subcategoria *"
            value={value}
            options={subCategoryOptions}
            onChange={onChange}
            placeholder="Selecione a subcategoria"
            error={error ? 'Campo obrigatório' : subcategoryError}
          />
        )}
      />

      {/* Disponibilidades */}
      <Text style={styles.fieldLabel}>Disponibilidades</Text>
      <AvailabilityManager
        control={control}
        setValue={setValue}
        watch={watch}
      />

      {/* Duração */}
      <Controller
        control={control}
        name="duration"
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CustomSelect
            label="Duração *"
            value={value}
            options={DURATION_OPTIONS}
            onChange={onChange}
            placeholder="Selecione a duração"
            error={error}
          />
        )}
      />

      {/* Preço */}
      <Controller
        control={control}
        name="price"
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CustomTextInput
            label="Preço *"
            value={value}
            onChangeText={(text) => onChange(maskCurrency(text))}
            keyboardType="numeric"
            error={error ? 'Campo obrigatório' : undefined}
          />
        )}
      />

      {/* Foto do serviço */}
      <Text style={styles.fieldLabel}>Foto do serviço</Text>
      {uploading ? (
        <View style={styles.imagePlaceholder}>
          <ActivityIndicator color={colors.primaryOrange} />
          <Text
            style={[
              styles.imagePlaceholderText,
              { marginTop: 8, fontSize: 12 },
            ]}>
            Enviando foto…
          </Text>
        </View>
      ) : bannerUri ? (
        <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
          <Image source={{ uri: bannerUri }} style={styles.bannerPreview} />
          <Text style={styles.changePhotoText}>Trocar foto</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.imagePlaceholder}
          onPress={pickImage}
          activeOpacity={0.8}>
          <Text style={styles.imagePlaceholderText}>+ Adicionar foto</Text>
        </TouchableOpacity>
      )}

      {/* Ativo */}
      <Controller
        control={control}
        name="active"
        render={({ field: { onChange, value } }) => (
          <View style={styles.toggleRow}>
            <Text style={styles.fieldLabel}>Serviço ativo</Text>
            <Switch
              value={value}
              onValueChange={onChange}
              trackColor={{
                false: colors.borderColor,
                true: colors.primaryOrange,
              }}
              thumbColor="#fff"
            />
          </View>
        )}
      />

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
        <Animated.View
          style={[styles.saveBtnWrapper, { opacity: saveBtnAnim }]}>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            disabled={uploading || submitting}
            activeOpacity={0.85}>
            {submitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.saveText}>Salvar</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.inputBackground },
    header: {
      fontFamily: 'Afacad-Bold',
      fontSize: 18,
      marginBottom: 12,
      color: colors.primaryBlack,
    },
    fieldLabel: {
      fontFamily: 'Afacad-SemiBold',
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 12,
      marginBottom: 4,
    },
    imagePlaceholder: {
      height: 140,
      borderRadius: 10,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.borderColor,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.cardBackground,
    },
    imagePlaceholderText: {
      fontFamily: 'Afacad-SemiBold',
      color: colors.primaryOrange,
      fontSize: 15,
    },
    bannerPreview: {
      width: '100%',
      height: 160,
      borderRadius: 10,
      resizeMode: 'cover',
    },
    changePhotoText: {
      textAlign: 'center',
      color: colors.primaryOrange,
      fontFamily: 'Afacad-SemiBold',
      marginTop: 6,
      fontSize: 13,
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 16,
      marginBottom: 8,
    },
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
      marginBottom: 32,
    },
    cancelBtn: {
      flex: 1,
      marginRight: 8,
      padding: 13,
      borderRadius: 8,
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.borderColor,
      alignItems: 'center',
    },
    cancelText: { fontFamily: 'Afacad-SemiBold', color: colors.textSecondary },
    saveBtnWrapper: {
      flex: 1,
      marginLeft: 8,
    },
    saveBtn: {
      padding: 13,
      borderRadius: 8,
      backgroundColor: colors.primaryOrange,
      alignItems: 'center',
    },
    saveText: { fontFamily: 'Afacad-SemiBold', color: '#fff' },
  });

export default ServiceForm;
