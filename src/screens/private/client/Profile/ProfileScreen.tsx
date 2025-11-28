import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import ProfileWrapper from './ProfileWrapper';
import { useUserStore } from '@stores/User';
import { useColors } from '@theme/ThemeProvider';
import DefaultAvatar from '@assets/logo.png';

const UserProfileScreen: React.FC = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const { user, avatarBase64, uploadAvatar, removeAvatar, fetchCurrentUser } =
    useUserStore();
  const colors = useColors();

  const handleAvatarChange = async (base64Image: string | null) => {
    if (uploading) return;

    setUploading(true);

    try {
      if (base64Image) {
        const response = await uploadAvatar(base64Image);

        if (response.erro) {
          Alert.alert('Erro', response.mensagem);
        } else {
          Alert.alert('Sucesso', response.mensagem);
        }
      } else {
        const response = await removeAvatar();

        if (response.erro) {
          Alert.alert('Erro', response.mensagem);
        } else {
          Alert.alert('Sucesso', response.mensagem);
        }
      }
    } catch (error) {
      console.error('Erro ao processar avatar:', error);
      Alert.alert('Erro', 'Erro inesperado ao processar avatar');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primaryOrange} />
      </View>
    );
  }

  return (
    <ProfileWrapper
      user={{
        userId: `${user?.id}`,
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        userCpf: user.cpf,
        avatarSource: {
          uri: avatarBase64 ? avatarBase64 : DefaultAvatar.toString(),
        },
        onAvatarChange: handleAvatarChange,
        uploading: uploading,
      }}
    />
  );
};

export default UserProfileScreen;
