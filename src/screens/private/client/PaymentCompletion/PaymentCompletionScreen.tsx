import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckCircle, Description, Share, Download } from '@mui/icons-material';
import { Button } from '@components/Button';
import InvoiceTemplate from '@components/InvoiceTemplate';
import { generatePDF } from '@lib/helpers/pdfGenerator';
import { shareContent, downloadPDF } from '@lib/helpers/shareHelperSimple';
import { useAppointmentStore } from '@stores/Appointment';
import { InvoiceData } from '@stores/Appointment/types';

export const PaymentCompletionScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  const { fetchInvoice } = useAppointmentStore();

  // Modificar a função handleShareInvoice
  const handleShareInvoice = useCallback(async () => {
    try {
      setIsGeneratingPDF(true);

      // Garante que os dados da nota existam antes de gerar
      if (!invoiceData) {
        Alert.alert('Erro', 'Dados da nota fiscal não estão disponíveis.');
        setIsGeneratingPDF(false);
        return;
      }

      // Gera o HTML da nota fiscal
      const htmlContent = InvoiceTemplate(invoiceData);

      // Gera o PDF
      const result = await generatePDF(htmlContent);

      // No caso da web, não precisamos compartilhar pois a janela de impressão já foi aberta
      if (Platform.OS !== 'web' && result !== 'web-pdf-printed') {
        // Compartilha o PDF diretamente apenas em plataformas nativas
        const success = await shareContent(result);

        if (success) {
          Alert.alert('Sucesso!', 'Nota fiscal compartilhada com sucesso!', [
            { text: 'OK' },
          ]);
        }
      }
    } catch (error) {
      console.error('Erro ao compartilhar nota fiscal:', error);
      Alert.alert(
        'Erro',
        'Não foi possível compartilhar a nota fiscal. Tente novamente.',
        [{ text: 'OK' }],
      );
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [invoiceData]);

  // Modificar a função handleDownloadPDF de forma similar
  const handleDownloadPDF = useCallback(async () => {
    try {
      setIsGeneratingPDF(true);

      // Garante que os dados da nota existam antes de gerar
      if (!invoiceData) {
        Alert.alert('Erro', 'Dados da nota fiscal não estão disponíveis.');
        setIsGeneratingPDF(false);
        return;
      }

      // Gera o HTML da nota fiscal
      const htmlContent = InvoiceTemplate(invoiceData);

      // Na web, usamos a mesma função que já abre a janela de impressão
      const result = await generatePDF(
        htmlContent,
        `nota-fiscal-${invoiceData.invoiceNumber}`,
      );

      // Apenas para dispositivos móveis
      if (Platform.OS !== 'web' && result !== 'web-pdf-printed') {
        const success = await downloadPDF(
          result,
          `nota-fiscal-${invoiceData.invoiceNumber}.pdf`,
        );

        if (success) {
          Alert.alert('Download Iniciado!', 'O PDF está sendo baixado.', [
            { text: 'OK' },
          ]);
        } else {
          Alert.alert('Erro', 'Não foi possível baixar o PDF.', [
            { text: 'OK' },
          ]);
        }
      }
    } catch (error) {
      console.error('Erro ao baixar PDF:', error);
      Alert.alert('Erro', 'Não foi possível baixar o PDF. Tente novamente.', [
        { text: 'OK' },
      ]);
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [invoiceData]);

  const handleBackToHome = useCallback(() => {
    navigation.navigate('Feed' as never);
  }, [navigation]);

  useEffect(() => {
    const loadInvoiceData = async () => {
      try {
        const data = await fetchInvoice(1);
        setInvoiceData(data);
      } catch (error) {
        console.error('Erro ao carregar dados da nota fiscal:', error);
        Alert.alert(
          'Erro',
          'Não foi possível carregar os dados da nota fiscal. Tente novamente.',
          [{ text: 'OK' }],
        );
      }
    };
    loadInvoiceData();
  }, [fetchInvoice]);

  if (!invoiceData) {
    return null;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header de Sucesso */}
        <View style={styles.successHeader}>
          <CheckCircle style={styles.successIcon} />
          <Text style={styles.successTitle}>Pagamento Realizado!</Text>
          <Text style={styles.successSubtitle}>
            Seu serviço foi agendado com sucesso
          </Text>
        </View>

        {/* Informações do Serviço */}
        <View style={styles.serviceInfo}>
          <Text style={styles.sectionTitle}>Detalhes do Serviço</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Serviço:</Text>
            <Text style={styles.infoValue}>{invoiceData.serviceName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Profissional:</Text>
            <Text style={styles.infoValue}>{invoiceData.professionalName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Data:</Text>
            <Text style={styles.infoValue}>{invoiceData.serviceDate}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Horário:</Text>
            <Text style={styles.infoValue}>{invoiceData.serviceTime}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Pago:</Text>
            <Text style={styles.totalValue}>
              R$ {invoiceData.total.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>

        {/* Seção da Nota Fiscal */}
        <View style={styles.invoiceSection}>
          <View style={styles.invoiceHeader}>
            <Description style={styles.invoiceIcon} />
            <Text style={styles.invoiceTitle}>Nota Fiscal</Text>
          </View>

          <Text style={styles.invoiceDescription}>
            Sua nota fiscal foi gerada automaticamente. Compartilhe com
            WhatsApp, Google Drive, email ou faça o download para salvar em seu
            dispositivo.
          </Text>

          <View style={styles.buttonGroup}>
            <Button
              variant="outlined"
              onPress={handleShareInvoice}
              disabled={isGeneratingPDF}
              style={styles.shareButton}>
              {isGeneratingPDF ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#4A90E2" />
                  <Text style={styles.loadingText}>Gerando Link...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <Share style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Compartilhar PDF</Text>
                </View>
              )}
            </Button>

            {/* Botão de Download */}
            <Button
              variant="outlined"
              onPress={handleDownloadPDF}
              disabled={isGeneratingPDF}
              style={styles.shareButton}>
              {isGeneratingPDF ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#4A90E2" />
                  <Text style={styles.loadingText}>Baixando PDF...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <Download style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Baixar PDF</Text>
                </View>
              )}
            </Button>
          </View>
        </View>

        {/* Botão para voltar */}
        <Button
          variant="contained"
          onPress={handleBackToHome}
          style={styles.backButton}>
          Voltar ao Início
        </Button>

        {/* Informações adicionais */}
        <View style={styles.additionalInfo}>
          <Text style={styles.additionalInfoText}>
            ✅ Você receberá uma confirmação por SMS
          </Text>
          <Text style={styles.additionalInfoText}>
            ✅ O profissional entrará em contato em breve
          </Text>
          <Text style={styles.additionalInfoText}>
            ✅ Avalie o serviço após a conclusão
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

// Estilos locais para evitar problemas de importação
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
    paddingBottom: 80,
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 32,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  successIcon: {
    fontSize: 64,
    color: '#4CAF50',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  serviceInfo: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    padding: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  invoiceSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  invoiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  invoiceIcon: {
    fontSize: 24,
    color: '#4A90E2',
    marginRight: 8,
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  invoiceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  shareButton: {
    borderColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 12,
    flex: 1,
  },
  backButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 24,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#4A90E2',
    marginLeft: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 18,
    color: '#4A90E2',
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  additionalInfo: {
    backgroundColor: '#e8f5e8',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  additionalInfoText: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 8,
    lineHeight: 20,
  },
});
