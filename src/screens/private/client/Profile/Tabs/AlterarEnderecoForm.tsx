import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { AddressCard, Address } from '@components/AddressCard'; // Importando o novo componente

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

  const handleUpdate = (id: number, data: Partial<Address>) => {
    setAddresses((currentAddresses) =>
      currentAddresses.map((addr) =>
        addr.id === id ? { ...addr, ...data } : addr,
      ),
    );
    Alert.alert('Sucesso', 'Endereço atualizado!');
  };

  const handleDelete = (id: number) => {
    setAddresses((currentAddresses) =>
      currentAddresses.filter((addr) => addr.id !== id),
    );
    Alert.alert('Sucesso', 'Endereço removido!');
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
