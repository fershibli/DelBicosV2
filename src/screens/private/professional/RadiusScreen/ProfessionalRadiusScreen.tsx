import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useUserStore } from '@stores/User';
import { useProfessionalStore } from '@stores/Professional';
import { useColors } from '@theme/ThemeProvider';
import CustomTextInput from '@components/ui/CustomTextInput';

const ProfessionalRadiusScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useUserStore();
  const { fetchProfessionalById, updateRadius } = useProfessionalStore();
  const colors = useColors();

  const [radiusKm, setRadiusKm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const professionalId = user?.professional_id;

  useEffect(() => {
    if (!professionalId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchProfessionalById(professionalId).then((prof) => {
      if (prof?.service_radius_km != null) {
        setRadiusKm(String(prof.service_radius_km));
      }
      setLoading(false);
    });
  }, [professionalId, fetchProfessionalById]);

  const handleSave = async () => {
    const km = parseInt(radiusKm, 10);
    if (isNaN(km) || km < 0) {
      Alert.alert('Inválido', 'Informe um raio válido (número inteiro ≥ 0).');
      return;
    }
    if (!professionalId) return;

    setSaving(true);
    try {
      await updateRadius(professionalId, km);
      Alert.alert('Sucesso', 'Raio de atendimento atualizado!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (e: any) {
      Alert.alert(
        'Erro',
        e?.response?.data?.error || e.message || 'Falha ao salvar raio.',
      );
    } finally {
      setSaving(false);
    }
  };

  const styles = createStyles(colors);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primaryOrange} />
      </View>
    );
  }

  if (!professionalId) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Você ainda não possui perfil de profissional.
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <FontAwesome
              name="arrow-left"
              size={16}
              color={colors.primaryOrange}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Área de Atendimento</Text>
        </View>

        {/* Info card */}
        <View style={styles.infoCard}>
          <FontAwesome
            name="map-marker"
            size={20}
            color={colors.primaryOrange}
          />
          <Text style={styles.infoText}>
            Defina até quantos quilômetros você atende a partir do seu endereço
            principal. Clientes fora desse raio não poderão agendar com você.
          </Text>
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Raio de atendimento (km)"
            placeholder="Ex: 20"
            value={radiusKm}
            onChangeText={(v) => setRadiusKm(v.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            maxLength={4}
          />
          {radiusKm !== '' && (
            <Text style={styles.preview}>
              Você atenderá até {radiusKm} km do seu endereço.
            </Text>
          )}
        </View>

        {/* Save button */}
        <TouchableOpacity
          style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.85}>
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveBtnText}>Salvar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    flex: { flex: 1, backgroundColor: colors.background },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    scrollContent: { padding: 24 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    backBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.cardBackground || '#f3f4f6',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    title: {
      fontFamily: 'Afacad-Bold',
      fontSize: 22,
      color: colors.primaryBlack,
    },
    infoCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colors.cardBackground || '#fff7ed',
      borderRadius: 12,
      padding: 16,
      gap: 12,
      marginBottom: 28,
    },
    infoText: {
      flex: 1,
      fontFamily: 'Afacad-Regular',
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    inputContainer: { marginBottom: 8 },
    preview: {
      fontFamily: 'Afacad-Regular',
      fontSize: 13,
      color: colors.primaryOrange,
      marginTop: 6,
    },
    saveBtn: {
      backgroundColor: colors.primaryOrange,
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 24,
    },
    saveBtnDisabled: { backgroundColor: colors.textSecondary },
    saveBtnText: { fontFamily: 'Afacad-Bold', fontSize: 16, color: '#fff' },
    errorText: {
      fontFamily: 'Afacad-Regular',
      fontSize: 15,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

export default ProfessionalRadiusScreen;
