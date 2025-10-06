import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { AddressCard, Address } from '@components/AddressCard';
import ConfirmationModal from '@components/ConfirmationModal';

// Dados de exemplo
const initialAddresses: Address[] = [
  {
    id: 1,
    cep: '23585-500',
    endereco: 'Rua Alvorada de Minas',
    numero: '1972',
    bairro: 'Jardim Alvorada',
    uf: 'RJ',
    cidade: 'Rio de Janeiro',
    isPrimary: true,
  },
  {
    id: 2,
    cep: '01310-200',
    endereco: 'Av. Paulista',
    numero: '1000',
    bairro: 'Bela Vista',
    uf: 'SP',
    cidade: 'São Paulo',
    isPrimary: false,
  },
];

export default function AlterarEnderecoForm() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isModalVisible, setModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

  const handleUpdate = (id: number, data: Partial<Address>) => {
    setAddresses((currentAddresses) =>
      currentAddresses.map((addr) =>
        addr.id === id ? { ...addr, ...data } : addr,
      ),
    );
    Alert.alert('Sucesso', 'Endereço atualizado!');
  };

  const handleDelete = (id: number) => {
    const address = addresses.find((addr) => addr.id === id);
    if (address) {
      setAddressToDelete(address);
      setModalVisible(true);
    }
  };

  const confirmDelete = () => {
    if (addressToDelete) {
      setAddresses((currentAddresses) =>
        currentAddresses.filter((addr) => addr.id !== addressToDelete.id),
      );
      setModalVisible(false);
      setAddressToDelete(null);
    }
  };

  const handleSetPrimary = (id: number) => {
    setAddresses((currentAddresses) =>
      currentAddresses.map((addr) => ({ ...addr, isPrimary: addr.id === id })),
    );
  };

  const handleAddNewAddress = () => {
    const newAddress: Address = {
      id: Date.now(), // ID simples para o exemplo
      cep: '',
      endereco: '',
      numero: '',
      bairro: '',
      uf: 'SP',
      cidade: '',
    };
    setAddresses((currentAddresses) => [...currentAddresses, newAddress]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.pageTitle}>Meus Endereços</Text>

      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          addressData={address}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onSetPrimary={handleSetPrimary}
        />
      ))}

      <TouchableOpacity style={styles.newButton} onPress={handleAddNewAddress}>
        <Text style={styles.newButtonText}>+ Adicionar Novo Endereço</Text>
      </TouchableOpacity>

      {addressToDelete && (
        <ConfirmationModal
          visible={isModalVisible}
          title="Confirmar Exclusão"
          message={`Você tem certeza que deseja excluir o endereço "${addressToDelete.endereco}, ${addressToDelete.numero}"?`}
          cancelText="Cancelar"
          confirmText="Excluir"
          onCancel={() => setModalVisible(false)}
          onConfirm={confirmDelete}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },
  contentContainer: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 24,
    fontFamily: 'Afacad-Bold',
  },
  newButton: {
    backgroundColor: '#ff7f00',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  newButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Afacad-Bold',
  },
});
