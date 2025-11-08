import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

type BlobType = 'text/csv' | 'application/octet-stream';
type EncodingType = 'utf8' | 'base64';

export async function generateFileURI(
  content: string,
  filename: string,
  type: BlobType,
  encoding: EncodingType = 'utf8',
): Promise<string | null> {
  try {
    if (Platform.OS === 'web') {
      let blob: Blob;

      if (encoding === 'base64') {
        const binario = atob(content);
        const array = new Uint8Array(binario.length);
        for (let i = 0; i < binario.length; i++) {
          array[i] = binario.charCodeAt(i);
        }
        blob = new Blob([array], { type });
      } else {
        blob = new Blob([content], { type });
      }

      const url = URL.createObjectURL(blob);

      return url;
    }

    const fileUri = `${FileSystem.cacheDirectory}${filename}`;

    await FileSystem.writeAsStringAsync(fileUri, content, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Sharing.shareAsync(fileUri);

    return fileUri;
  } catch (error) {
    console.error('Erro ao compartilhar:', error);
    return null;
  }
}
