import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, Alert, Platform } from 'react-native';
import { Paths, Directory, File } from 'expo-file-system';
import ProfileWrapper from './ProfileWrapper';
import { useUserStore } from '@stores/User';
import colors from '@theme/colors';
import { HTTP_DOMAIN } from '@config/varEnvs';
import { User } from '@stores/User/types';

const UserProfileScreen: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const { user, uploadAvatar, removeAvatar, fetchUserById } = useUserStore();

  const userId = user?.id.toString() || '';

  const saveAvatarLocally = async (userId: string, apiAvatarUri: string) => {
    try {
      if (Platform.OS === 'web') {
        const storageKey = `userImages/${userId}/avatar.uri`;
        localStorage.setItem(storageKey, apiAvatarUri);
        console.log('✅ URI do avatar salva localmente no localStorage!');
      } else {
        console.log(
          'Lógica de armazenamento local em outras plataformas ainda não implementada.',
        );
      }
    } catch (error) {
      console.error('Erro ao salvar URI do avatar localmente:', error);
    }
  };

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
          if (response.avatar_uri) {
            const newUri = `${HTTP_DOMAIN}/${response.avatar_uri}`;
            setAvatarUri(newUri);
            await saveAvatarLocally(userId, response.avatar_uri);
          }
          Alert.alert('Sucesso', response.mensagem);
        }
      } else {
        const response = await removeAvatar(userId);

        if (response.erro) {
          Alert.alert('Erro', response.mensagem);
        } else {
          if (Platform.OS === 'web') {
            const storageKey = `userImages/${userId}/avatar.uri`;
            localStorage.removeItem(storageKey);
          } else {
            const userImageDir = new Directory(
              Paths.cache,
              'userImages',
              userId,
            );
            const avatarFile = new File(userImageDir, 'avatar.jpg');
            if (avatarFile.exists) {
              avatarFile.delete();
            }
          }
          setAvatarUri(null);
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

  const loadSavedAvatar = useCallback(
    async (apiAvatarUri: string | null) => {
      if (!apiAvatarUri) {
        setAvatarUri(null);
        return;
      }

      const fullAvatarUrl = `${HTTP_DOMAIN}/${apiAvatarUri}`;

      if (Platform.OS === 'web') {
        setAvatarUri(fullAvatarUrl);
        console.log('💻 Imagem carregada via URL:', fullAvatarUrl);
        return;
      }

      try {
        const userImageDir = new Directory(Paths.cache, 'userImages', userId);
        const avatarFile = new File(userImageDir, 'avatar.jpg');

        if (avatarFile.exists) {
          setAvatarUri(avatarFile.uri);
          console.log('📱 Imagem carregada do cache local:', avatarFile.uri);
        } else {
          const downloadedFile = await File.downloadFileAsync(
            fullAvatarUrl,
            avatarFile,
          );
          setAvatarUri(downloadedFile.uri);
          console.log(
            '📱 Imagem baixada e carregada do servidor:',
            downloadedFile.uri,
          );
        }
      } catch (error) {
        console.error('❌ Erro ao carregar/baixar avatar:', error);
        setAvatarUri(fullAvatarUrl);
        console.log('🔄 Tentando carregar diretamente via URL:', fullAvatarUrl);
      }
    },
    [userId],
  );

  useEffect(() => {
    const loadUserData = async () => {
      const response = await fetchUserById(userId);

      if (response.erro) {
        console.error('Erro ao carregar dados do usuário:', response.mensagem);
        Alert.alert('Erro', response.mensagem);
      } else if (response.user) {
        setUserData(response.user);
        await loadSavedAvatar(response.user.avatar_uri);
      }

      setLoading(false);
    };

    loadUserData();
  }, [userId, loadSavedAvatar, fetchUserById]);

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
        avatarSource: { uri: avatarUri },
        onAvatarChange: handleAvatarChange,
        uploading: uploading,
      }}
    />
  );
};

export default UserProfileScreen;
