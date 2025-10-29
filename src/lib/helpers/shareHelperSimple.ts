import { isAvailableAsync, shareAsync } from 'expo-sharing';
import { Alert, Platform } from 'react-native';

/**
 * Compartilha um arquivo PDF de forma simples
 */
export const shareContent = async (uri: string): Promise<boolean> => {
  try {
    if (Platform.OS === 'web') {
      const isSharingAvailable = await isAvailableAsync();
      if (!isSharingAvailable) {
        Alert.alert(
          'Compartilhamento não disponível',
          'O compartilhamento não está disponível neste browser ou sistema operacional.',
        );
        return false;
      }
    }
    await shareAsync(uri);
    return true;
  } catch {
    Alert.alert(
      'Erro ao compartilhar',
      'Não foi possível compartilhar o arquivo.',
    );
    return false;
  }
};

/**
 * Faz download direto do arquivo PDF
 */
export const downloadPDF = async (
  uri: string,
  filename: string = 'nota-fiscal-delbicos.pdf',
): Promise<boolean> => {
  try {
    if (Platform.OS === 'web') {
      // No web, força o download
      const link = document.createElement('a');
      link.href = uri;
      link.download = filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } else {
      // Em mobile, usa expo-sharing para salvar
      await shareAsync(uri);
      return true;
    }
  } catch (error) {
    console.error('Erro ao fazer download:', error);
    return false;
  }
};
