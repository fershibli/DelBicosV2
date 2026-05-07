import React, { useState, useEffect, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  View,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { AddressCard } from '@components/ui/AddressCard';
import ConfirmationModal from '@components/ui/ConfirmationModal';
import { useColors } from '@theme/ThemeProvider';
import { Address, useAddressStore } from '@stores/Address';
import { useUserStore } from '@stores/User';
import { FontAwesome } from '@expo/vector-icons';
import { AddressForm } from '@components/features/AddressForm/AddressForm';
import { createStyles } from './styles';

// Interface para as props do Modal
interface AddressModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  isLoading: boolean;
  initialData?: Address | null;
}

const AddressModal: React.FC<AddressModalProps> = ({
  visible,
  onClose,
  onSave,
  isLoading,
  initialData,
}) => {
  const colors = useColors();
  const styles = createStyles(colors);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  });

  useEffect(() => {
    if (visible) {
      if (initialData) {
        setValue('cep', initialData.postal_code || '');
        setValue('street', initialData.street || '');
        setValue('number', initialData.number || '');
        setValue('complement', initialData.complement || '');
        setValue('neighborhood', initialData.neighborhood || '');
        setValue('city', initialData.city || '');
        setValue('state', initialData.state || '');
      } else {
        reset({
          cep: '',
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
        });
      }
    }
  }, [visible, initialData, setValue, reset]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {initialData ? 'Editar Endereço' : 'Novo Endereço'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome
                name="close"
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <AddressForm
              control={control}
              errors={errors}
              setValue={setValue}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.saveModalButton}
                onPress={handleSubmit(onSave)}
                disabled={isLoading}
                activeOpacity={0.8}>
                {isLoading ? (
                  <ActivityIndicator color={colors.primaryWhite} />
                ) : (
                  <Text style={styles.saveModalButtonText}>
                    {initialData ? 'Atualizar Endereço' : 'Salvar Endereço'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function AlterarEnderecoForm() {
  const {
    addresses,
    isLoading,
    error,
    fetchAddressesByUserId,
    updateAddress,
    deleteAddress,
    setPrimaryAddress,
    addAddress,
  } = useAddressStore();

  const { user } = useUserStore();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);

  const colors = useColors();
  const styles = createStyles(colors);

  useEffect(() => {
    if (user?.id) {
      fetchAddressesByUserId(user.id);
    }
  }, [user?.id, fetchAddressesByUserId]);

  const sortedAddresses = useMemo(() => {
    return [...addresses].sort((a, b) => {
      // Endereço principal primeiro
      if (a.isPrimary === b.isPrimary) return 0;
      return a.isPrimary ? -1 : 1;
    });
  }, [addresses]);

  const handleOpenCreate = () => {
    setAddressToEdit(null);
    setAddressModalVisible(true);
  };

  const handleOpenEdit = (address: Address) => {
    setAddressToEdit(address);
    setAddressModalVisible(true);
  };

  const handleDeleteRequest = (id: number) => {
    const address = addresses.find((addr) => addr.id === id);
    if (address) {
      setAddressToDelete(address);
      setDeleteModalVisible(true);
    }
  };

  const confirmDelete = async () => {
    if (addressToDelete) {
      try {
        await deleteAddress(addressToDelete.id);
        setDeleteModalVisible(false);
        setAddressToDelete(null);
      } catch {
        Alert.alert('Erro', 'Não foi possível excluir o endereço.');
      }
    }
  };

  const handleSetPrimary = async (id: number) => {
    try {
      await setPrimaryAddress(id);
    } catch {
      Alert.alert('Erro', 'Não foi possível definir o endereço principal.');
    }
  };

  const handleSaveAddress = async (formData: any) => {
    if (!user?.id) return;
    setIsSaving(true);
    try {
      const cleanCep = formData.cep ? formData.cep.replace(/\D/g, '') : '';
      const payload = {
        user_id: user.id,
        lat: 0,
        lng: 0,
        street: formData.street,
        number: String(formData.number),
        complement: formData.complement,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state,
        postal_code: cleanCep,
        country_iso: 'BR',
        active: true,
      };

      if (addressToEdit) {
        await updateAddress(addressToEdit.id, payload);
      } else {
        await addAddress(payload);
      }

      setAddressModalVisible(false);
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Falha ao salvar o endereço.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.pageTitle}>Meus Endereços</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleOpenCreate}
          activeOpacity={0.8}>
          <FontAwesome name="plus" size={14} color={colors.primaryWhite} />
          <Text style={styles.addButtonText}>Novo Endereço</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {isLoading && addresses.length === 0 ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.primaryOrange} />
            <Text style={styles.loadingText}>Carregando endereços...</Text>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => user?.id && fetchAddressesByUserId(user.id)}>
              <Text style={styles.retryButtonText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : addresses.length === 0 ? (
          <View style={styles.centerContainer}>
            <FontAwesome
              name="map-marker"
              size={48}
              color={colors.textTertiary}
              style={{ marginBottom: 16 }}
            />
            <Text style={styles.emptyText}>
              Você ainda não possui endereços cadastrados.
            </Text>
            <TouchableOpacity
              style={[styles.addButton, { marginTop: 16 }]}
              onPress={handleOpenCreate}>
              <Text style={styles.addButtonText}>Adicionar Agora</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.gridContainer}>
            {sortedAddresses.map((address) => (
              <View
                key={address.id}
                style={[styles.cardWrapper, isDesktop && { width: '48%' }]}>
                <AddressCard
                  addressData={address}
                  onUpdate={() => {}}
                  onDelete={handleDeleteRequest}
                  onSetPrimary={handleSetPrimary}
                  onEditPress={() => handleOpenEdit(address)}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmationModal
        visible={isDeleteModalVisible}
        title="Excluir Endereço"
        message={`Tem certeza que deseja excluir "${addressToDelete?.street}, ${addressToDelete?.number}"?`}
        cancelText="Cancelar"
        confirmText="Excluir"
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={confirmDelete}
      />

      {/* Modal de Formulário (Criação/Edição) */}
      <AddressModal
        visible={isAddressModalVisible}
        onClose={() => setAddressModalVisible(false)}
        onSave={handleSaveAddress}
        isLoading={isSaving}
        initialData={addressToEdit}
      />
    </View>
  );
}
