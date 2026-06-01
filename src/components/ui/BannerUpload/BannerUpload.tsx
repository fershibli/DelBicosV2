import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import colors from '@theme/colors';

interface BannerUploadProps {
  currentUri?: string | null;
  editable?: boolean;
  onImagePicked?: (uri: string) => void;
}

const BannerUpload: React.FC<BannerUploadProps> = ({
  currentUri,
  editable = false,
  onImagePicked,
}) => {
  const pickImage = async () => {
    if (!editable) return;

    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permissão Necessária', 'Precisamos acessar sua galeria para escolher a imagem de banner.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 6],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const uri = result.assets[0].uri;
        onImagePicked?.(uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  const dynamicStyles = {
    container: {
      backgroundColor: colors.secondaryGray,
    },
    editOverlay: {
      backgroundColor: colors.overlay,
    },
    placeholderIcon: {
      color: colors.textTertiary,
    },
  };

  return (
    <TouchableOpacity
      style={[styles.container, dynamicStyles.container]}
      onPress={pickImage}
      disabled={!editable}
      activeOpacity={editable ? 0.7 : 1}
    >
      {currentUri ? (
        <Image source={{ uri: currentUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="image-outline" size={40} style={dynamicStyles.placeholderIcon} />
        </View>
      )}
      {editable && (
        <View style={[styles.editOverlay, dynamicStyles.editOverlay]}>
          <Ionicons name="camera" size={24} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BannerUpload;