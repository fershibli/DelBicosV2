import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { styles } from './styles';
import { NavigationParams } from '@screens/types';
import { useColors } from '@theme/ThemeProvider';

import { stripePromise } from '@lib/stripe/stripe';
import { Elements } from '@stripe/react-stripe-js';
import { HTTP_DOMAIN } from '@config/varEnvs';
import CheckoutForm from './CheckoutForm';
import { useUserStore } from '@stores/User';
import { Address } from '@stores/Address/types';

// Store Imports
import { useProfessionalStore } from '@stores/Professional';
import AddressSelectionModal from '@components/features/AddressSelectionModal';

// Tipos da Rota
type CheckoutRouteParams = NavigationParams['Checkout'];

// Função para buscar o clientSecret do backend
async function fetchPaymentIntent(
  amount: number,
  professionalId: number,
  serviceId: number, // Precisamos saber o serviceId
  selectedTime: string,
  addressId: number,
): Promise<string | null> {
  try {
    const { token } = useUserStore.getState();
    const backendUrl = `${HTTP_DOMAIN}/api/payments/create-payment-intent`;

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: amount, // Ex: 250.00
        currency: 'brl', // Defina sua moeda
        professionalId: professionalId,
        serviceId: serviceId,
        selectedTime: selectedTime,
        addressId: addressId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[CheckoutScreen] Erro do Backend:', errorData);
      throw new Error(
        errorData.error || `Erro do servidor: ${response.status}`,
      );
    }

    const data = await response.json();
    if (!data.clientSecret) {
      throw new Error('Client Secret não encontrado na resposta.');
    }

    return data.clientSecret;
  } catch (e: any) {
    console.error('[CheckoutScreen] Erro ao buscar Payment Intent:', e.message);
    return null;
  }
}

function CheckoutScreen() {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<{ params: CheckoutRouteParams }, 'params'>>();
  const { professionalId, selectedTime, imageUrl, serviceId } = route.params;

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [errorIntent, setErrorIntent] = useState<string | null>(null);
  const [isLoadingProfessional, setIsLoadingProfessional] = useState(true);

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);

  const { user } = useUserStore();
  const { selectedProfessional, fetchProfessionalById } =
    useProfessionalStore();

  const colors = useColors();

  const service = useMemo(() => {
    if (selectedProfessional && serviceId) {
      const foundService = selectedProfessional.Services.find(
        (s) => s.id === serviceId,
      );
      if (!foundService) {
        console.error(
          `Serviço com ID ${serviceId} não encontrado no profissional.`,
        );
        setErrorIntent('Erro ao carregar os dados do serviço.');
      }
      return foundService || null;
    }
    return null;
  }, [selectedProfessional, serviceId]);

  useEffect(() => {
    const loadProfessional = async () => {
      setIsLoadingProfessional(true);
      await fetchProfessionalById(professionalId);
      setIsLoadingProfessional(false);
    };
    loadProfessional();
  }, [professionalId, fetchProfessionalById]);

  useEffect(() => {
    if (service && selectedProfessional && selectedAddress) {
      const initializePayment = async () => {
        setLoadingIntent(true);
        setErrorIntent(null);

        const servicePrice = parseFloat(service.price);
        const addressId = selectedAddress.id;

        if (!serviceId) {
          Alert.alert(
            'Erro',
            'Não foi possível identificar o serviço selecionado.',
          );
          setLoadingIntent(false);
          return;
        }

        const secret = await fetchPaymentIntent(
          servicePrice,
          professionalId,
          serviceId,
          selectedTime,
          addressId,
        );

        if (secret) {
          setClientSecret(secret);
        } else {
          setErrorIntent(
            'Não foi possível iniciar o pagamento. Tente novamente.',
          );
        }
        setLoadingIntent(false);
      };
      initializePayment();
    } else {
      setClientSecret(null);
    }
  }, [
    professionalId,
    selectedTime,
    selectedProfessional,
    selectedAddress,
    service,
    serviceId,
  ]);

  // Configurações para o Stripe Elements
  const appearance = { theme: 'stripe', labels: 'floating' } as const;
  const options = clientSecret ? { clientSecret, appearance } : {};

  // Renderização de Loading/Erro
  if (
    isLoadingProfessional ||
    (selectedProfessional && !service && !errorIntent)
  ) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003366" />
        <Text style={styles.loadingText}>Carregando checkout...</Text>
      </View>
    );
  }

  if (errorIntent || !selectedProfessional || !service) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {errorIntent || 'Erro ao carregar dados do serviço.'}
        </Text>
        <TouchableOpacity
          style={styles.backButtonError}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonTextError}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderAddressSection = () => {
    return (
      <View style={styles.addressSection}>
        <Text style={styles.sectionTitle}>Endereço do Serviço</Text>
        {selectedAddress ? (
          <View style={styles.addressCard}>
            <FontAwesome
              name="map-marker"
              size={16}
              color={colors.primaryBlue}
            />
            <Text style={styles.addressText} numberOfLines={2}>
              {`${selectedAddress.street}, ${selectedAddress.number} - ${selectedAddress.neighborhood}, ${selectedAddress.city}`}
            </Text>
            <TouchableOpacity onPress={() => setIsAddressModalVisible(true)}>
              <Text style={styles.summaryLink}>Trocar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.selectAddressButton}
            onPress={() => setIsAddressModalVisible(true)}>
            <Text style={styles.selectAddressButtonText}>
              Selecione um endereço
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (errorIntent || !selectedProfessional) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {errorIntent || 'Erro ao carregar dados.'}
        </Text>
        <TouchableOpacity
          style={styles.backButtonError}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonTextError}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const professional = selectedProfessional;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Header da Página */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={16} color="#003366" />
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mainContent}>
          {/* COLUNA DA ESQUERDA: RESUMO */}
          <View style={styles.leftColumn}>
            <Text style={styles.pageTitle}>Confirmar Agendamento</Text>
            <View style={styles.summaryCard}>
              <Image
                source={{
                  uri:
                    imageUrl ||
                    service.banner_uri ||
                    professional.User.avatar_uri ||
                    undefined,
                }}
                style={styles.summaryImage}
              />
              <View style={styles.summaryContent}>
                <View style={styles.summaryHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.summaryTitle} numberOfLines={1}>
                      {professional.User.name}
                    </Text>
                    <Text style={styles.summarySubtitle} numberOfLines={1}>
                      {service.title}
                    </Text>
                    <View style={styles.summaryRatingRow}>
                      <Rating
                        startingValue={professional.rating || 0}
                        imageSize={14}
                        readonly
                      />
                      <Text style={styles.summaryRatingText}>
                        ({professional.ratings_count || 0} avaliações)
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.summaryPrice}>
                        R$ {parseFloat(service.price).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.summaryDivider} />
                <Text style={styles.summaryServiceTitle}>
                  {service.Subcategory?.name || 'Serviço'}
                </Text>
                <Text style={styles.summaryServiceDate}>{selectedTime}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={styles.summaryLink}>Alterar seleção</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* COLUNA DA DIREITA: PAGAMENTO */}
          <View style={styles.rightColumn}>
            {renderAddressSection()}
            <View style={styles.paymentContainer}>
              <Text style={styles.sectionTitle}>Pagamento Seguro</Text>
              {loadingIntent && (
                <ActivityIndicator
                  size="large"
                  color={colors.primaryBlue}
                  style={{ marginVertical: 40 }}
                />
              )}
              {errorIntent && (
                <Text style={styles.errorText}>{errorIntent}</Text>
              )}
              {clientSecret && selectedAddress && stripePromise && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}
              {!clientSecret && !loadingIntent && selectedAddress && (
                <Text style={styles.errorText}>
                  Não foi possível carregar o pagamento. Tente recarregar a
                  página.
                </Text>
              )}
              {!selectedAddress && !loadingIntent && (
                <Text style={styles.paymentWaitingText}>
                  Por favor, selecione um endereço para continuar.
                </Text>
              )}
              <View style={styles.orderSummaryContainer}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>
                    R$ {parseFloat(service.price).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>
                    R$ {parseFloat(service.price).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      {user && (
        <AddressSelectionModal
          visible={isAddressModalVisible}
          userId={user.id} // Passa o ID do usuário logado
          onClose={() => setIsAddressModalVisible(false)}
          onAddressSelect={(address) => {
            setSelectedAddress(address);
            setIsAddressModalVisible(false);
          }}
        />
      )}
    </ScrollView>
  );
}

export default CheckoutScreen;
