import { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InvoiceTemplate, {
  type InvoiceData,
} from '../../components/InvoiceTemplate';
import { generateInvoicePDF } from '../helpers/pdfGenerator';
import { shareInvoice } from '../helpers/shareHelperSimple';

export const usePaymentCompletion = () => {
  const navigation = useNavigation();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Dados mockados da nota fiscal usando useMemo para otimização
  const mockInvoiceData: InvoiceData = useMemo(
    () => ({
      invoiceNumber: `NF${Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, '0')}`,
      date: new Date().toLocaleDateString('pt-BR'),
      customerName: 'João da Silva Santos',
      customerCpf: '123.456.789-00',
      customerAddress:
        'Rua das Flores, 123 - Centro - São Paulo/SP - CEP: 01234-567',
      professionalName: 'Maria Oliveira Costa',
      professionalCpf: '987.654.321-00',
      serviceName: 'Limpeza Residencial Completa',
      serviceDescription:
        'Limpeza completa de casa com 3 quartos, incluindo cozinha, banheiros e áreas comuns',
      servicePrice: 150.0,
      serviceDate: new Date().toLocaleDateString('pt-BR'),
      serviceTime: '14:00 - 17:00',
      total: 150.0,
    }),
    [],
  );

  const handleShareInvoice = useCallback(async () => {
    try {
      setIsGeneratingPDF(true);

      // Gera o HTML da nota fiscal
      const htmlContent = InvoiceTemplate(mockInvoiceData);

      // Gera o PDF
      const pdfUri = await generateInvoicePDF(htmlContent);

      // Compartilha o PDF
      const success = await shareInvoice(pdfUri);

      if (success) {
        Alert.alert('Sucesso!', 'Nota fiscal compartilhada com sucesso!', [
          { text: 'OK' },
        ]);
      }
    } catch (error) {
      console.error('Erro ao processar nota fiscal:', error);
      Alert.alert(
        'Erro',
        'Não foi possível gerar a nota fiscal. Tente novamente.',
        [{ text: 'OK' }],
      );
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [mockInvoiceData]);

  const handleBackToHome = useCallback(() => {
    navigation.navigate('Feed' as never);
  }, [navigation]);

  return {
    isGeneratingPDF,
    mockInvoiceData,
    handleShareInvoice,
    handleBackToHome,
  };
};
