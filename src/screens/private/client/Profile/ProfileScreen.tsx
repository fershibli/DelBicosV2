import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, Alert, Platform } from 'react-native';
import { Paths, Directory, File } from 'expo-file-system';
import ProfileWrapper from './ProfileWrapper';
import { useUserStore } from '@stores/User';
import colors from '@theme/colors';
import { HTTP_DOMAIN } from '@config/varEnvs';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  active: boolean;
  avatar_uri: string | null;
  banner_uri: string;
  createdAt: string;
  updatedAt: string;
}

const UserProfileScreen: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const { user } = useUserStore();

  const userId = user?.id.toString() || '';

  const uploadAvatarToServer = async (base64Image: string) => {
    try {
      setUploading(true);

      console.log(
        '📤 Base64 completo (primeiros 200 chars):',
        base64Image.substring(0, 200),
      );
      console.log('📤 Tipo MIME detectado:', base64Image.substring(0, 50));
      console.log('📤 Tamanho do base64:', base64Image.length);

      const { token } = useUserStore.getState();

      const response = await fetch(`${HTTP_DOMAIN}/api/user/${userId}/avatar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          base64Image: base64Image,
          userId: userId,
        }),
      });

      console.log('📤 Status da resposta:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro na resposta:', errorText);

        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || `Erro ${response.status}`);
        } catch {
          throw new Error(`Erro ${response.status}: ${errorText}`);
        }
      }

      const data = await response.json();
      console.log('✅ Resposta do servidor:', data);

      const newUri = `${HTTP_DOMAIN}/${data.avatar_uri}`;
      setAvatarUri(newUri);
      Alert.alert('Sucesso', 'Avatar atualizado com sucesso!');
      return data;
    } catch (error: any) {
      console.error('❌ Erro no upload:', error);
      Alert.alert('Erro', error.message || 'Erro ao fazer upload do avatar');
      throw error;
    } finally {
      setUploading(false);
    }
  };

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

  const removeAvatar = async () => {
    try {
      const { token } = useUserStore.getState();
      const response = await fetch(`${HTTP_DOMAIN}/api/user/${userId}/avatar`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro na remoção do avatar no servidor:', errorText);
        throw new Error(errorText);
      }

      if (Platform.OS === 'web') {
        const storageKey = `userImages/${userId}/avatar.uri`;
        localStorage.removeItem(storageKey);
      } else {
        const userImageDir = new Directory(Paths.cache, 'userImages', userId);
        const avatarFile = new File(userImageDir, 'avatar.jpg');
        if (avatarFile.exists) {
          avatarFile.delete();
        }
      }

      setAvatarUri(null);
      Alert.alert('Sucesso', 'Avatar removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover avatar:', error);
      Alert.alert('Erro', 'Falha ao remover o avatar');
    }
  };

  const handleAvatarChange = async (base64Image: string | null) => {
    console.log('Mudando o avatar:', base64Image ? 'SIM' : 'NÃO');
    if (uploading) return;

    try {
      if (base64Image) {
        const response = await uploadAvatarToServer(base64Image);
        if (response.avatarUrl) {
          await saveAvatarLocally(userId, response.avatarUrl);
        }
      } else {
        await removeAvatar();
      }
    } catch (error) {
      console.error('Erro ao processar avatar:', error);
    }
  };

  const loadSavedAvatar = useCallback(
    async (apiAvatarUri: string | null) => {
      if (!apiAvatarUri) {
        setAvatarUri(null);
        return;
      }

      const fullAvatarUrl = `http://localhost:3000/${apiAvatarUri}`;

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
    const fetchUserData = async () => {
      try {
        const { token } = useUserStore.getState();
        const response = await fetch(`${HTTP_DOMAIN}/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Erro ao buscar usuário');

        const data: User = await response.json();
        setUserData(data);

        await loadSavedAvatar(data.avatar_uri);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, loadSavedAvatar]);

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
