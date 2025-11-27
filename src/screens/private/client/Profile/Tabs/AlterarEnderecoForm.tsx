import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  View,
} from 'react-native';
import AddressCard from '@components/ui/AddressCard';
import ConfirmationModal from '@components/ui/ConfirmationModal';
import { useColors } from '@theme/ThemeProvider';
import { Address, useAddressStore } from '@stores/Address';
import { useUserStore } from '@stores/User';

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
  const [isModalVisible, setModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);
  const colors = useColors();
  const styles = createStyles(colors);

  useEffect(() => {
    if (user?.id) {
      fetchAddressesByUserId(user.id);
    }
  }, [user?.id, fetchAddressesByUserId]);

  const handleUpdate = async (id: number, data: Partial<Address>) => {
    try {
      await updateAddress(id, data);
      Alert.alert('Sucesso', 'Endereço atualizado!');
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar o endereço.');
    }
  };

  const handleDelete = (id: number) => {
    const address = addresses.find((addr) => addr.id === id);
    if (address) {
      setAddressToDelete(address);
      setModalVisible(true);
    }
  };

  const confirmDelete = async () => {
    if (addressToDelete) {
      try {
        await deleteAddress(addressToDelete.id);
        setModalVisible(false);
        setAddressToDelete(null);
        Alert.alert('Sucesso', 'Endereço excluído!');
      } catch {
        Alert.alert('Erro', 'Não foi possível excluir o endereço.');
      }
    }
  };

  const handleSetPrimary = async (id: number) => {
    try {
      await setPrimaryAddress(id);
      Alert.alert('Sucesso', 'Endereço principal atualizado!');
    } catch {
      Alert.alert('Erro', 'Não foi possível definir o endereço principal.');
    }
  };

  const handleAddNewAddress = async () => {
    try {
      if (!user?.id) {
        Alert.alert('Erro', 'Usuário não identificado.');
        return;
      }

      const newAddress: Omit<Address, 'id'> = {
        lat: 0, // Você pode integrar com um serviço de geolocalização
        lng: 0,
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: 'SP',
        country_iso: 'BR',
        postal_code: '',
        user_id: user.id,
        active: true,
      };
      await addAddress(newAddress);
    } catch {
      Alert.alert('Erro', 'Não foi possível adicionar o endereço.');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.pageTitle}>Meus Endereços</Text>

      {isLoading && addresses.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primaryOrange} />
          <Text style={styles.loadingText}>Carregando endereços...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => user?.id && fetchAddressesByUserId(user.id)}>
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : addresses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Você ainda não possui endereços cadastrados
          </Text>
        </View>
      ) : (
        addresses.map((address) => (
          <AddressCard
            key={address.id}
            addressData={address}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onSetPrimary={handleSetPrimary}
          />
        ))
      )}

      <TouchableOpacity style={styles.newButton} onPress={handleAddNewAddress}>
        <Text style={styles.newButtonText}>+ Adicionar Novo Endereço</Text>
      </TouchableOpacity>

      {addressToDelete && (
        <ConfirmationModal
          visible={isModalVisible}
          title="Confirmar Exclusão"
          message={`Você tem certeza que deseja excluir o endereço "${addressToDelete.street}, ${addressToDelete.number}"?`}
          cancelText="Cancelar"
          confirmText="Excluir"
          onCancel={() => setModalVisible(false)}
          onConfirm={confirmDelete}
        />
      )}
    </ScrollView>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      padding: 20,
    },
    pageTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.primaryBlue,
      marginBottom: 24,
      fontFamily: 'Afacad-Bold',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: colors.primaryBlack,
      fontFamily: 'Afacad-Regular',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    errorText: {
      fontSize: 16,
      color: colors.primaryOrange,
      textAlign: 'center',
      marginBottom: 20,
      fontFamily: 'Afacad-Regular',
    },
    retryButton: {
      backgroundColor: colors.primaryBlue,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    retryButtonText: {
      color: colors.primaryWhite,
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 16,
      color: colors.primaryBlack,
      textAlign: 'center',
      fontFamily: 'Afacad-Regular',
    },
    newButton: {
      backgroundColor: colors.primaryOrange,
      paddingVertical: 14,
      paddingHorizontal: 22,
      borderRadius: 8,
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 10,
    },
    newButtonText: {
      color: colors.primaryWhite,
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
    },
  });
