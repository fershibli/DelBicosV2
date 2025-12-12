import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { useUserStore } from '@stores/User';
import { useColors } from '@theme/ThemeProvider';
import { createLoadingStyles } from './styles';
import ProfileWrapper from '@screens/private/client/Profile/Tabs/ProfileWrapper';

const UserProfileScreen: React.FC = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const { user, avatarBase64, uploadAvatar, removeAvatar, fetchCurrentUser } =
    useUserStore();

  const colors = useColors();
  const styles = createLoadingStyles(colors);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const handleAvatarChange = useCallback(
    async (base64Image: string | null) => {
      if (uploading) return;

      setUploading(true);

      try {
        let response;

        if (base64Image) {
          response = await uploadAvatar(base64Image);
        } else {
          response = await removeAvatar();
        }

        if (response.erro) {
          Alert.alert('Erro', response.mensagem);
        } else {
          Alert.alert('Sucesso', response.mensagem);
        }
      } catch (error) {
        console.error('Erro ao processar avatar:', error);
        Alert.alert('Erro', 'Erro inesperado ao processar avatar.');
      } finally {
        setUploading(false);
      }
    },
    [uploading, uploadAvatar, removeAvatar],
  );

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryOrange} />
      </View>
    );
  }

  return (
    <ProfileWrapper
      user={{
        userId: String(user.id),
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        userCpf: user.cpf,
        avatarSource: { uri: avatarBase64 || null },
        onAvatarChange: handleAvatarChange,
        uploading: uploading,
      }}
    />
  );
};

export default UserProfileScreen;
