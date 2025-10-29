import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { styles } from './styles';
import { NavigationParams } from '@screens/types';

import { stripePromise } from '@lib/stripe/stripe';
import { Elements } from '@stripe/react-stripe-js';
import { HTTP_DOMAIN } from '@config/varEnvs'; // Importe chave e domínio
import CheckoutForm from './CheckoutForm'; // O componente do formulário Stripe
import { useUserStore } from '@stores/User';

// Store Imports
import { useProfessionalStore } from '@stores/Professional';

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
    const backendUrl = `${HTTP_DOMAIN}/api/payments/create-payment-intent`;
    console.log(`[CheckoutScreen] Chamando backend em: ${backendUrl}`);

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

    console.log('[CheckoutScreen] clientSecret recebido com sucesso.');
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
  const { professionalId, priceFrom, selectedTime, imageUrl } = route.params;

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(true);
  const [errorIntent, setErrorIntent] = useState<string | null>(null);
  const [isLoadingProfessional, setIsLoadingProfessional] = useState(true);

  const { selectedProfessional, fetchProfessionalById } =
    useProfessionalStore();

  const { address: userAddress } = useUserStore();

  // Busca detalhes do profissional
  useEffect(() => {
    const loadProfessional = async () => {
      setIsLoadingProfessional(true);
      await fetchProfessionalById(professionalId);
      setIsLoadingProfessional(false);
    };
    loadProfessional();
  }, [professionalId, fetchProfessionalById]);

  // Busca o Payment Intent (clientSecret)
  useEffect(() => {
    // Só executa se tivermos o preço e os dados do profissional
    if (priceFrom && priceFrom > 0 && selectedProfessional && userAddress) {
      if (!priceFrom || !selectedProfessional || !userAddress) {
        console.log(
          '[CheckoutScreen Debug] useEffect NÃO DISPARADO, dados faltantes:',
          {
            hasPrice: !!(priceFrom && priceFrom > 0),
            hasProfessional: !!selectedProfessional,
            hasUserAddress: !!userAddress,
          },
        );
        return; // Sai se os dados básicos não estiverem prontos
      }

      const initializePayment = async () => {
        setLoadingIntent(true);
        setErrorIntent(null);

        // Precisamos do serviceId. Vamos pegá-lo do profissional buscado.
        const serviceId = selectedProfessional.Service?.id;
        const addressId = userAddress.id;

        if (!serviceId) {
          setErrorIntent('ID do serviço não encontrado.');
          setLoadingIntent(false);
          return;
        }

        const secret = await fetchPaymentIntent(
          priceFrom,
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
    }
  }, [
    priceFrom,
    professionalId,
    selectedTime,
    selectedProfessional,
    userAddress,
    fetchProfessionalById,
  ]);

  // Configurações para o Stripe Elements
  const appearance = { theme: 'stripe', labels: 'floating' } as const;
  const options = clientSecret ? { clientSecret, appearance } : {};

  // Renderização de Loading/Erro
  if (isLoadingProfessional || loadingIntent) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003366" />
        <Text style={styles.loadingText}>Carregando checkout...</Text>
      </View>
    );
  }

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
                    imageUrl || professional.Service?.banner_uri || undefined,
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
                      {professional.Service?.title}
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
                    R${priceFrom.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.summaryDivider} />
                <Text style={styles.summaryServiceTitle}>
                  {professional.Service?.Subcategory?.name || 'Serviço'}
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
            <View style={styles.paymentContainer}>
              <Text style={styles.sectionTitle}>Pagamento Seguro</Text>

              {/* O Stripe Elements será renderizado aqui */}
              {clientSecret && stripePromise && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              )}

              {/* Resumo do Pedido (Total) */}
              <View style={styles.orderSummaryContainer}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>
                    R$ {priceFrom.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>
                    R$ {priceFrom.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default CheckoutScreen;
