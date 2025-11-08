import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { stripePromise } from '@lib/stripe/stripe';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { HTTP_DOMAIN } from '@config/varEnvs';
import { useUserStore } from '@stores/User';
import {
  useAppointmentStore,
  Appointment,
  InvoiceData,
} from '@stores/Appointment';
import InvoiceTemplate from '@components/features/InvoiceTemplate';
import { generatePDF } from '@lib/helpers/fileGenerator';
import { downloadFile } from '@lib/helpers/shareHelperSimple';

type StatusType = 'loading' | 'success' | 'error';

function PaymentStatusLogic() {
  const navigation = useNavigation();
  const stripe = useStripe();
  const { user } = useUserStore();
  const { fetchInvoice } = useAppointmentStore();

  const [status, setStatus] = useState<StatusType>('loading');
  const [message, setMessage] = useState('Verificando seu pagamento...');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  useEffect(() => {
    if (!stripe || !user || Platform.OS !== 'web') {
      return;
    }

    const verifyPayment = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const clientSecret = urlParams.get('payment_intent_client_secret');
        const paymentIntentId = urlParams.get('payment_intent');

        if (!clientSecret || !paymentIntentId) {
          throw new Error('Identificador de pagamento não encontrado na URL.');
        }

        const { error, paymentIntent } =
          await stripe.retrievePaymentIntent(clientSecret);

        if (error) throw error;

        if (paymentIntent?.status === 'succeeded') {
          const { token } = useUserStore.getState();
          const confirmResponse = await fetch(
            `${HTTP_DOMAIN}/api/payments/confirm`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                paymentIntentId: paymentIntentId,
                userId: user.id,
              }),
            },
          );

          const confirmData = await confirmResponse.json();

          if (!confirmResponse.ok) {
            throw new Error(
              confirmData.error ||
                'Falha ao confirmar agendamento no servidor.',
            );
          }

          const newAppointment = confirmData.appointment as Appointment;

          const invoice = await fetchInvoice(newAppointment.id);

          if (!invoice) {
            console.warn(
              'Agendamento criado, mas falha ao buscar dados da nota.',
            );
            setStatus('success');
            setMessage(
              'Pagamento concluído! (Recibo indisponível no momento).',
            );
          } else {
            setInvoiceData(invoice);
            setStatus('success');
            setMessage(
              'Seu pagamento foi concluído e seu agendamento está confirmado!',
            );
          }
        } else {
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
  }, [stripe, user, fetchInvoice]);

  const handlePrintOrDownload = useCallback(() => {
    if (!invoiceData) {
      Alert.alert('Erro', 'Dados do recibo não estão disponíveis.');
      return;
    }

    setIsGeneratingPDF(true);
    try {
      const htmlContent = InvoiceTemplate(invoiceData);
      const fileName = `recibo-${invoiceData.invoiceNumber}.pdf`;

      if (Platform.OS === 'web') {
        generatePDF(htmlContent);
        setIsGeneratingPDF(false);
      } else {
        (async () => {
          const uri = await generatePDF(htmlContent);
          await downloadFile(uri, fileName);
          setIsGeneratingPDF(false);
        })();
      }
    } catch (error: any) {
      Alert.alert(
        'Erro ao Gerar PDF',
        error.message || 'Não foi possível gerar o PDF.',
      );
      setIsGeneratingPDF(false);
    }
  }, [invoiceData]);

  if (status === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#003366" />
        <Text style={[styles.title, { marginTop: 20 }]}>{message}</Text>
      </View>
    );
  }

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

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[styles.iconContainer, styles.iconSuccess]}>
          <FontAwesome name="check" size={40} color="#2E7D32" />
        </View>
        <Text style={styles.title}>Pagamento Aprovado!</Text>
        <Text style={styles.message}>{message}</Text>

        {invoiceData && (
          <TouchableOpacity
            style={[
              styles.button,
              styles.receiptButton,
              isGeneratingPDF && styles.buttonDisabled,
            ]}
            onPress={handlePrintOrDownload}
            disabled={isGeneratingPDF}>
            {isGeneratingPDF ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                <FontAwesome name="print" size={16} />{' '}
                {Platform.OS === 'web' ? 'Imprimir Recibo' : 'Salvar Recibo'}
              </Text>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.homeButton]}
          onPress={() => navigation.navigate('MySchedules')}>
          <Text style={styles.buttonText}>Ir para Meus Agendamentos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PaymentStatusScreen() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentStatusLogic />
    </Elements>
  );
}

export default PaymentStatusScreen;
