import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { styles } from './styles';
import { Address } from '@stores/Address';

type AddressSelectionModalProps = {
  visible: boolean;
  onClose: () => void;
  onAddressSelect: (address: Address) => void;
  userId: string;
};

function AddressSelectionModal({
  visible,
  onClose,
  onAddressSelect,
  userId,
}: AddressSelectionModalProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const fetchAddresses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/address/user/${userId}`,
      );

      if (!response.ok) {
        throw new Error('Erro ao carregar endereços');
      }

      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
      Alert.alert('Erro', 'Não foi possível carregar os endereços');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleConfirm = () => {
    if (selectedAddress) {
      onAddressSelect(selectedAddress);
      onClose();
      setSelectedAddress(null);
    } else {
      Alert.alert('Atenção', 'Por favor, selecione um endereço');
    }
  };

  const formatAddress = (address: Address) => {
    return `${address.street}, ${address.number}${address.complement ? ` - ${address.complement}` : ''}, ${address.neighborhood}, ${address.city} - ${address.state}`;
  };

  useEffect(() => {
    if (visible) {
      fetchAddresses();
    }
  }, [visible, fetchAddresses]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Selecione o Endereço</Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FC8200" />
              <Text style={styles.loadingText}>Carregando endereços...</Text>
            </View>
          ) : addresses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum endereço cadastrado</Text>
              <Text style={styles.emptySubtext}>
                Cadastre um endereço antes de agendar
              </Text>
            </View>
          ) : (
            <>
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
                        {item.neighborhood} - {item.city}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[
                    styles.confirmButton,
                    !selectedAddress && styles.disabledButton,
                  ]}
                  onPress={handleConfirm}
                  disabled={!selectedAddress}>
                  <Text style={styles.confirmButtonText}>
                    Selecionar Endereço
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

export default AddressSelectionModal;
