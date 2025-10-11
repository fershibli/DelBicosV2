import { printToFileAsync, FilePrintOptions } from 'expo-print';
import { Platform } from 'react-native';

/**
 * Gera um arquivo PDF a partir de conteúdo HTML
 * @param htmlContent - String contendo o HTML que será convertido para PDF
 * @param filename - Nome do arquivo (opcional, padrão: 'invoice')
 * @param customOptions - Opções customizadas para geração do PDF
 * @returns Promise<string> - URI do arquivo PDF gerado
 */
export const generatePDF = async (
  htmlContent: string,
  filename: string = 'invoice',
  customOptions?: Partial<FilePrintOptions>,
): Promise<string> => {
  try {
    if (!htmlContent || htmlContent.trim().length === 0) {
      throw new Error('Conteúdo HTML não pode estar vazio');
    }

    // Tratamento especial para web
    if (Platform.OS === 'web') {
      // Cria uma nova janela com apenas o conteúdo HTML
      const newWindow = window.open('', '_blank');
      if (!newWindow) {
        throw new Error(
          'Não foi possível abrir uma nova janela. Verifique se os pop-ups estão permitidos.',
        );
      }

      newWindow.document.write(htmlContent);
      newWindow.document.close();

      // Dar tempo para o conteúdo carregar antes de imprimir
      setTimeout(() => {
        newWindow.print();
      }, 300);

      return 'web-pdf-printed';
    }

    // Configurações padrão para o PDF (plataformas nativas)
    const defaultOptions: FilePrintOptions = {
      html: htmlContent,
      width: 612, // Largura em pontos (equivale a uma página A4: 8.5 x 11 polegadas)
      height: 792, // Altura em pontos
      base64: false, // Retorna URI ao invés de base64
      margins: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    };

    const options: FilePrintOptions = { ...defaultOptions, ...customOptions };

    // Gera o PDF usando expo-print
    const { uri } = await printToFileAsync(options);

    if (!uri) {
      throw new Error('Falha ao gerar o arquivo PDF');
    }

    console.log('PDF gerado com sucesso:', uri);
    return uri;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error(`Falha ao gerar PDF: ${error}`);
  }
};

/**
 * Gera um PDF com nome personalizado baseado na data atual
 * @param htmlContent - String contendo o HTML que será convertido para PDF
 * @param prefix - Prefixo para o nome do arquivo (opcional, padrão: 'nota_fiscal')
 * @param customOptions - Opções customizadas para geração do PDF
 * @returns Promise<string> - URI do arquivo PDF gerado
 */
export const generateInvoicePDF = async (
  htmlContent: string,
  prefix: string = 'nota_fiscal',
  customOptions?: Partial<FilePrintOptions>,
): Promise<string> => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5); // Remove milissegundos e 'Z'

  const filename = `${prefix}_${timestamp}`;

  return generatePDF(htmlContent, filename, customOptions);
};

/**
 * Gera PDF com configurações otimizadas para nota fiscal
 * @param htmlContent - String contendo o HTML da nota fiscal
 * @returns Promise<string> - URI do arquivo PDF gerado
 */
export const generateOptimizedInvoicePDF = async (
  htmlContent: string,
): Promise<string> => {
  const optimizedOptions: Partial<FilePrintOptions> = {
    margins: {
      top: 30,
      bottom: 30,
      left: 25,
      right: 25,
    },
  };

  return generateInvoicePDF(
    htmlContent,
    'nota_fiscal_delbicos',
    optimizedOptions,
  );
};
