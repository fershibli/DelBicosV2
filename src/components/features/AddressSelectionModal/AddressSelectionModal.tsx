import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';
import { Address, useAddressStore } from '@stores/Address';
import { useForm } from 'react-hook-form';
import { AddressForm } from '@components/features/AddressForm/AddressForm';
import { FontAwesome } from '@expo/vector-icons';

type AddressSelectionModalProps = {
  visible: boolean;
  onClose: () => void;
  onAddressSelect: (address: Address) => void;
  userId: number;
};

type ViewMode = 'list' | 'create';

const formatAddress = (address: Address) => {
  return `${address.street}, ${address.number} - ${address.neighborhood}`;
};

function AddressSelectionModal({
  visible,
  onClose,
  onAddressSelect,
  userId,
}: AddressSelectionModalProps) {
  const {
    addresses,
    isLoading: loading,
    error,
    fetchAddressesByUserId,
    addAddress, // Precisamos da função de adicionar
  } = useAddressStore();

  const colors = useColors();
  const styles = createStyles(colors);

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isSaving, setIsSaving] = useState(false);

  // Configuração do formulário de novo endereço
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
      fetchAddressesByUserId(userId);
      setViewMode('list'); // Reseta para lista ao abrir
      reset();
    }
  }, [visible, userId, fetchAddressesByUserId, reset]);

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleConfirmSelection = () => {
    if (selectedAddress) {
      onAddressSelect(selectedAddress);
      onClose();
      setSelectedAddress(null);
    } else {
      Alert.alert('Atenção', 'Por favor, selecione um endereço');
    }
  };

  const handleSaveNewAddress = async (formData: any) => {
    setIsSaving(true);
    try {
      const cleanCep = formData.cep ? formData.cep.replace(/\D/g, '') : '';
      const payload = {
        user_id: userId,
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

      await addAddress(payload);

      setViewMode('list');
      reset();
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Falha ao salvar o endereço.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* --- MODO LISTA --- */}
          {viewMode === 'list' ? (
            <>
              <View style={styles.headerRow}>
                <Text style={styles.modalTitle}>Selecione o Endereço</Text>
                <TouchableOpacity onPress={onClose}>
                  <FontAwesome
                    name="close"
                    size={20}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    size="large"
                    color={colors.primaryOrange}
                  />
                  <Text style={styles.loadingText}>
                    Carregando endereços...
                  </Text>
                </View>
              ) : error ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>{error}</Text>
                </View>
              ) : (
                <>
                  {addresses.length === 0 ? (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>
                        Nenhum endereço encontrado.
                      </Text>
                    </View>
                  ) : (
                    <FlatList
                      data={addresses}
                      keyExtractor={(item) => item.id.toString()}
                      style={styles.addressesList}
                      contentContainerStyle={styles.addressesListContent}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={[
                            styles.addressItem,
                            selectedAddress?.id === item.id &&
                              styles.selectedAddressItem,
                          ]}
                          onPress={() => handleSelectAddress(item)}>
                          <View style={styles.addressRadio}>
                            <View
                              style={[
                                styles.radioCircle,
                                selectedAddress?.id === item.id &&
                                  styles.radioCircleSelected,
                              ]}
                            />
                          </View>
                          <View style={styles.addressInfo}>
                            <Text style={styles.addressText}>
                              {formatAddress(item)}
                            </Text>
                            <Text style={styles.addressNeighborhood}>
                              {item.city} - {item.state}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  )}

                  <TouchableOpacity
                    style={styles.newAddressButton}
                    onPress={() => setViewMode('create')}>
                    <Text style={styles.newAddressButtonText}>
                      + Adicionar novo endereço
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={[
                        styles.confirmButton,
                        !selectedAddress && styles.disabledButton,
                      ]}
                      onPress={handleConfirmSelection}
                      disabled={!selectedAddress}>
                      <Text style={styles.confirmButtonText}>
                        Confirmar Seleção
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </>
          ) : (
            /* --- MODO CRIAÇÃO (FORMULÁRIO) --- */
            <>
              <View style={styles.headerRow}>
                <TouchableOpacity
                  onPress={() => setViewMode('list')}
                  style={styles.backButton}>
                  <FontAwesome
                    name="arrow-left"
                    size={18}
                    color={colors.primaryOrange}
                  />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Novo Endereço</Text>
                <View style={styles.headerSpacer} />
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.formScrollView}>
                <AddressForm
                  control={control}
                  errors={errors}
                  setValue={setValue}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleSubmit(handleSaveNewAddress)}
                    disabled={isSaving}>
                    {isSaving ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text style={styles.confirmButtonText}>
                        Salvar Endereço
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

export default AddressSelectionModal;
