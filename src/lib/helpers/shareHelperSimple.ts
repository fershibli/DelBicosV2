import { shareAsync } from 'expo-sharing';
import { Alert, Platform } from 'react-native';

/**
 * Compartilha um arquivo PDF de forma simples
 */
export const shareInvoice = async (uri: string): Promise<boolean> => {
  try {
    if (Platform.OS === 'web') {
      // No web, primeiro tenta Web Share API nativa
      if (typeof navigator !== 'undefined' && (navigator as any).share) {
        try {
          // Busca o arquivo e converte para blob
          const response = await fetch(uri);
          const blob = await response.blob();
          const file = new File([blob], 'nota-fiscal-delbicos.pdf', {
            type: 'application/pdf',
          });

          await (navigator as any).share({
            title: 'Nota Fiscal - DelBicos',
            text: 'Confira sua nota fiscal do serviço realizado',
            files: [file],
          });
          return true;
        } catch {
          console.log('Web Share API não disponível, mostrando opções manuais');
        }
      }

      // Fallback: Mostra opções de compartilhamento manual
      const userChoice = await new Promise<string>((resolve) => {
        Alert.alert('Compartilhar PDF', 'Escolha como compartilhar:', [
          {
            text: 'WhatsApp Web',
            onPress: () => resolve('whatsapp'),
          },
          {
            text: 'Email',
            onPress: () => resolve('email'),
          },
          {
            text: 'Copiar Link',
            onPress: () => resolve('copy'),
          },
          {
            text: 'Download',
            onPress: () => resolve('download'),
          },
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => resolve('cancel'),
          },
        ]);
      });

      const shareText = 'Nota Fiscal - DelBicos';
      const message = `${shareText}\n\nConfira sua nota fiscal: ${uri}`;

      switch (userChoice) {
        case 'whatsapp':
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
          break;
        case 'email':
          const mailtoUrl = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(message)}`;
          window.open(mailtoUrl, '_blank');
          break;
        case 'copy':
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(uri);
            Alert.alert('Link Copiado!', 'O link do PDF foi copiado.');
          } else {
            // Fallback para navegadores antigos
            const textArea = document.createElement('textarea');
            textArea.value = uri;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            Alert.alert('Link Copiado!', 'O link do PDF foi copiado.');
          }
          break;
        case 'download':
          const link = document.createElement('a');
          link.href = uri;
          link.download = 'nota-fiscal-delbicos.pdf';
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          break;
        case 'cancel':
          return false;
      }

      return userChoice !== 'cancel';
    } else {
      // Em mobile, usa expo-sharing
      await shareAsync(uri);
      return true;
    }
  } catch (error) {
    console.error('Erro ao compartilhar:', error);
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
