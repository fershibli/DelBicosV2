import React, { useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import ProfileWrapper from './ProfileWrapper';
import { useUserStore } from '@stores/User';
import colors from '@theme/colors';
import { HTTP_DOMAIN } from '@config/varEnvs';
import DefaultAvatar from '@assets/logo.png';

const UserProfileScreen: React.FC = () => {
  const { user, uploadAvatar, removeAvatar } = useUserStore();
  const [uploading, setUploading] = useState<boolean>(false);

  const getAvatarSource = () => {
    if (user?.avatar_uri) {
      const baseUrl = user.avatar_uri.startsWith('http')
        ? user.avatar_uri
        : `${HTTP_DOMAIN}/${user.avatar_uri}`;
      return { uri: `${baseUrl}?timestamp=${new Date().getTime()}` };
    }
    return { uri: DefaultAvatar.toString() };
  };

  const handleAvatarChange = async (base64Image: string | null) => {
    if (uploading) return;
    setUploading(true);

    try {
      if (base64Image) {
        await uploadAvatar(base64Image);
        Alert.alert('Sucesso', 'Avatar atualizado!');
      } else {
        await removeAvatar();
        Alert.alert('Sucesso', 'Avatar removido!');
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao atualizar avatar.');
    } finally {
      setUploading(false);
    }
  };

  const avatarSource = getAvatarSource();

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
        userId: String(user.id),
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        avatarSource: avatarSource,
        onAvatarChange: handleAvatarChange,
        uploading: uploading,
      }}
    />
  );
};

export default UserProfileScreen;
