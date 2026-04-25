import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { createStyles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { useUserStore } from '@stores/User';
import { useAppointmentStore, InvoiceData } from '@stores/Appointment';
import InvoiceTemplate from '@components/features/InvoiceTemplate';
import { generatePDF } from '@lib/helpers/fileGenerator';
import { downloadFile } from '@lib/helpers/shareHelperSimple';
import { useColors } from '@theme/ThemeProvider';
import { NavigationParams } from '@screens/types';

type StatusType = 'loading' | 'success' | 'error';

type PaymentStatusRouteParams = NavigationParams['PaymentStatus'];

function PaymentStatusScreen() {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<{ params: PaymentStatusRouteParams }, 'params'>>();
  const { user } = useUserStore();
  const { fetchInvoice } = useAppointmentStore();

  const appointmentId = route.params?.appointmentId;
  const [status, setStatus] = useState<StatusType>(
    appointmentId ? 'loading' : 'error',
  );
  const [message, setMessage] = useState(
    appointmentId
      ? 'Verificando seu pagamento...'
      : 'Informações de pagamento não encontradas.',
  );
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  const colors = useColors();
  const styles = createStyles(colors);

  useEffect(() => {
    if (!appointmentId || !user) return;

    const loadInvoice = async () => {
      try {
        const invoice = await fetchInvoice(appointmentId);
        if (invoice) {
          setInvoiceData(invoice);
        }
        setStatus('success');
        setMessage('Seu pagamento foi concluído e o serviço confirmado!');
      } catch (err: any) {
        console.error('[PaymentStatus] Erro:', err.message);
        setStatus('error');
        setMessage(
          err.message || 'Ocorreu um erro ao carregar dados do pagamento.',
        );
      }
    };

    loadInvoice();
  }, [appointmentId, user, fetchInvoice]);

  const handlePrintOrDownload = useCallback(async () => {
    if (!invoiceData) {
      Alert.alert('Erro', 'Dados do recibo indisponíveis.');
      return;
    }

    setIsGeneratingPDF(true);
    try {
      const htmlContent = InvoiceTemplate(invoiceData);
      const fileName = `recibo-${invoiceData.invoiceNumber}.pdf`;
      const uri = await generatePDF(htmlContent);
      await downloadFile(uri, fileName);
      Alert.alert('Sucesso', 'Recibo salvo com sucesso.');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao gerar o recibo.');
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [invoiceData]);

  if (status === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primaryBlue} />
        <Text style={[styles.title, { marginTop: 24, fontSize: 20 }]}>
          {message}
        </Text>
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={[styles.iconContainer, styles.iconError]}>
            <FontAwesome name="times" size={40} color={colors.errorText} />
          </View>
          <Text style={styles.title}>Pagamento Falhou</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            style={[styles.button, styles.errorButton]}
            onPress={() => navigation.navigate('Feed' as never)}>
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
          <FontAwesome name="check" size={40} color={colors.successText} />
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
              <ActivityIndicator color={colors.primaryWhite} />
            ) : (
              <>
                <FontAwesome
                  name="file-text-o"
                  size={16}
                  color={colors.primaryWhite}
                />
                <Text style={styles.buttonText}>Salvar Recibo</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.homeButton]}
          // @ts-ignore
          onPress={() => navigation.navigate('MySchedules')}>
          <Text style={styles.buttonText}>Ir para Meus Agendamentos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PaymentStatusScreen;
