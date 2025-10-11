import { backendHttpClient } from '@lib/helpers/httpClient';
import { InvoiceData } from '../components/InvoiceTemplate';

export interface EmailInvoiceRequest {
  invoiceData: InvoiceData;
  recipientEmail: string;
  customerEmail?: string;
}

export interface EmailInvoiceResponse {
  success: boolean;
  message: string;
  emailId?: string;
}

/**
 * Envia nota fiscal por email através do back-end
 * @param data - Dados da nota fiscal e destinatário
 * @returns Promise com resposta do servidor
 */
export const sendInvoiceByEmail = async (
  data: EmailInvoiceRequest,
): Promise<EmailInvoiceResponse> => {
  try {
    const response = await backendHttpClient.post('/api/email/send-invoice', {
      invoiceData: data.invoiceData,
      recipientEmail: data.recipientEmail,
      customerEmail: data.customerEmail,
    });

    return {
      success: true,
      message: 'Email enviado com sucesso!',
      emailId: response.data.emailId,
    };
  } catch (error: any) {
    console.error('Erro ao enviar email:', error);

    let errorMessage = 'Erro interno do servidor';

    if (error.response) {
      // Erro da API
      errorMessage = error.response.data?.message || 'Erro ao enviar email';
    } else if (error.request) {
      // Erro de conexão
      errorMessage = 'Erro de conexão. Verifique sua internet.';
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

/**
 * Compartilha nota fiscal via WhatsApp/Telegram (gera link)
 * @param invoiceData - Dados da nota fiscal
 * @returns Promise com URL para compartilhamento
 */
export const generateShareableInvoiceLink = async (
  invoiceData: InvoiceData,
): Promise<{ success: boolean; shareUrl?: string; message: string }> => {
  try {
    const response = await backendHttpClient.post(
      '/api/invoice/generate-link',
      {
        invoiceData,
      },
    );

    return {
      success: true,
      shareUrl: response.data.shareUrl,
      message: 'Link gerado com sucesso!',
    };
  } catch (error: any) {
    console.error('Erro ao gerar link:', error);

    return {
      success: false,
      message: 'Erro ao gerar link de compartilhamento',
    };
  }
};
