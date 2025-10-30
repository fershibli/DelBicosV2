import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import ProfileWrapper from './ProfileWrapper';
import { useUserStore } from '@stores/User';
import { User } from '@stores/User/types';
import colors from '@theme/colors';

const UserProfileScreen: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);

  const {
    user,
    avatarBase64,
    uploadAvatar,
    removeAvatar,
    fetchUserById,
    setAvatarBase64,
  } = useUserStore();

  const userId = user?.id.toString() || '';

  const handleAvatarChange = async (base64Image: string | null) => {
    console.log('Mudando o avatar:', base64Image ? 'SIM' : 'NÃO');
    if (uploading) return;

    setUploading(true);

    try {
      if (base64Image) {
        const response = await uploadAvatar(userId, base64Image);

        if (response.erro) {
          Alert.alert('Erro', response.mensagem);
        } else {
          Alert.alert('Sucesso', response.mensagem);
        }
      } else {
        const response = await removeAvatar(userId);

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
    const loadUserData = async () => {
      const response = await fetchUserById(userId);

      if (response.erro) {
        console.error('Erro ao carregar dados do usuário:', response.mensagem);
        Alert.alert('Erro', response.mensagem);
      } else if (response.user) {
        setUserData(response.user);
      }

      setLoading(false);
    };

    loadUserData();
  }, [userId, fetchUserById]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primaryOrange} />
      </View>
    );
  }

  if (!userData) return null;

  return (
    <ProfileWrapper
      user={{
        userId: String(userData.id),
        userName: userData.name,
        userEmail: userData.email,
        userPhone: userData.phone,
        avatarSource: { uri: avatarBase64 },
        onAvatarChange: handleAvatarChange,
        uploading: uploading,
      }}
    />
  );
};

export default UserProfileScreen;
