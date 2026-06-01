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

interface AvatarUploadProps {
  currentUri?: string | null;
  editable?: boolean;
  onImagePicked?: (uri: string) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentUri,
  editable = false,
  onImagePicked,
}) => {
  const pickImage = async () => {
    if (!editable) return;

    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permissão Necessária', 'Precisamos de acesso à sua galeria para escolher a foto.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const uri = result.assets[0].uri;
        if (onImagePicked) onImagePicked(uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  const getShadowColor = () => {
    return colors.primaryWhite === '#1E1E1E' ? 'rgba(255,255,255,0.1)' : '#000';
  };

  const dynamicStyles = {
    container: {
      backgroundColor: colors.secondaryGray,
      borderColor: colors.cardBackground,
      shadowColor: getShadowColor(),
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
          <Ionicons name="person" size={50} style={dynamicStyles.placeholderIcon} />
        </View>
      )}
      {editable && (
        <View style={[styles.editOverlay, dynamicStyles.editOverlay]}>
          <Ionicons name="camera" size={22} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 3,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    alignSelf: 'center',
    marginTop: -60,
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
    bottom: 0,
    right: 0,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AvatarUpload;