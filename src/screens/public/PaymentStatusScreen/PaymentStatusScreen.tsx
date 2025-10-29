import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { stripePromise } from '@lib/stripe/stripe';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { HTTP_DOMAIN } from '@config/varEnvs';
import { useUserStore } from '@stores/User';

// Define os status da tela
type StatusType = 'loading' | 'success' | 'error';

function PaymentStatusLogic() {
  const navigation = useNavigation();
  const stripe = useStripe(); // Obtém a instância do Stripe
  const { user } = useUserStore();

  const [status, setStatus] = useState<StatusType>('loading');
  const [message, setMessage] = useState('Verificando seu pagamento...');
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!stripe || !user || Platform.OS !== 'web') {
      // O estado 'loading' padrão será exibido enquanto 'user' é nulo
      console.log(
        '[PaymentStatus] Aguardando Stripe e/ou reidratação do usuário...',
      );
      return;
    }

    const verifyPayment = async () => {
      try {
        // 1. Pega os parâmetros da URL
        const urlParams = new URLSearchParams(window.location.search);
        const clientSecret = urlParams.get('payment_intent_client_secret');
        const paymentIntentId = urlParams.get('payment_intent'); // O ID "pi_..."

        if (!clientSecret || !paymentIntentId) {
          throw new Error('Identificador de pagamento não encontrado na URL.');
        }

        const { error, paymentIntent } =
          await stripe.retrievePaymentIntent(clientSecret);

        if (error) throw error; // Erro do Stripe

        // 3. Verifica o Status do Pagamento
        if (paymentIntent?.status === 'succeeded') {
          // 4. CHAMA O NOSSO BACKEND PARA CRIAR O AGENDAMENTO
          // Como o authMiddleware está desabilitado, enviamos o userId manualmente
          // TODO: Quando o authMiddleware estiver ativo, envie o token no header
          // e remova o userId do body
          const confirmResponse = await fetch(
            `${HTTP_DOMAIN}/api/payments/confirm`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                paymentIntentId: paymentIntentId,
                userId: user.id, // <-- 'user.id' agora existe
              }),
            },
          );

          const confirmData = await confirmResponse.json();

          if (!confirmResponse.ok) {
            // Se o backend falhar (ex: erro ao salvar no DB), lança um erro
            throw new Error(
              confirmData.error ||
                'Falha ao confirmar agendamento no servidor.',
            );
          }

          // TUDO CERTO!
          setStatus('success');
          setMessage(
            'Seu pagamento foi concluído e seu agendamento está confirmado!',
          );
          setReceiptUrl(
            (paymentIntent as any).charges?.data[0]?.receipt_url || null,
          );
          console.log(
            '[PaymentStatus] Agendamento criado no backend:',
            confirmData.appointment,
          );
        } else {
          // Se o status do Stripe não for 'succeeded'
          throw new Error(
            `Pagamento não concluído. Status: ${paymentIntent?.status}`,
          );
        }
      } catch (err: any) {
        console.error(
          '[PaymentStatus] Erro ao verificar pagamento:',
          err.message,
        );
        setStatus('error');
        setMessage(
          err.message || 'Ocorreu um erro ao processar seu pagamento.',
        );
      }
    };

    verifyPayment();
  }, [stripe, user]); // Executa quando o Stripe estiver pronto

  // Renderização condicional baseada no status

  // Estado de Loading
  if (status === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#003366" />
        <Text style={[styles.title, { marginTop: 20 }]}>{message}</Text>
      </View>
    );
  }

  // Estado de Erro
  if (status === 'error') {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={[styles.iconContainer, styles.iconError]}>
            <FontAwesome name="times" size={40} color="#D32F2F" />
          </View>
          <Text style={styles.title}>Pagamento Falhou</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Voltar para o Início</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Estado de Sucesso
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[styles.iconContainer, styles.iconSuccess]}>
          <FontAwesome name="check" size={40} color="#2E7D32" />
        </View>
        <Text style={styles.title}>Pagamento Aprovado!</Text>
        <Text style={styles.message}>{message}</Text>

        {/* Opção 1: Mostrar o link do recibo do Stripe */}
        {receiptUrl && (
          <TouchableOpacity
            onPress={() =>
              Platform.OS === 'web' && window.open(receiptUrl, '_blank')
            }>
            <Text style={styles.receiptLink}>Ver recibo do pagamento</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MySchedules')}>
          <Text style={styles.buttonText}>Ir para Meus Agendamentos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PaymentStatusScreen() {
  return (
    // 8. Envolva sua lógica de tela com o <Elements> provider
    // Note: Ele só precisa do 'stripe', não do 'options'/'clientSecret'
    <Elements stripe={stripePromise}>
      <PaymentStatusLogic />
    </Elements>
  );
}

export default PaymentStatusScreen;
