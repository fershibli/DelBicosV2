import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

type Address = {
  id: number;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postal_code: string;
  lat: number;
  lng: number;
};

type AddressSelectionModalProps = {
  visible: boolean;
  onClose: () => void;
  onAddressSelect: (address: Address) => void;
  userId: string;
};

export function AddressSelectionModal({
  visible,
  onClose,
  onAddressSelect,
  userId,
}: AddressSelectionModalProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (visible) {
      fetchAddresses();
    }
  }, [visible, userId]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/address/user/${userId}`);
      
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
  };

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
              <Text style={styles.emptyText}>
                Nenhum endereço cadastrado
              </Text>
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
                      selectedAddress?.id === item.id && styles.selectedAddressItem,
                    ]}
                    onPress={() => handleSelectAddress(item)}>
                    <View style={styles.addressRadio}>
                      <View
                        style={[
                          styles.radioCircle,
                          selectedAddress?.id === item.id && styles.radioCircleSelected,
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

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onClose}>
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  addressesList: {
    maxHeight: 400,
  },
  addressesListContent: {
    paddingBottom: 10,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#FAFAFA',
  },
  selectedAddressItem: {
    borderColor: '#FC8200',
    backgroundColor: '#FFF5EB',
  },
  addressRadio: {
    marginRight: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
  },
  radioCircleSelected: {
    borderColor: '#FC8200',
    backgroundColor: '#FC8200',
  },
  addressInfo: {
    flex: 1,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 2,
  },
  addressNeighborhood: {
    fontSize: 12,
    color: '#666',
  },
  modalButtons: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  confirmButton: {
    backgroundColor: '#FC8200',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '500',
  },
});