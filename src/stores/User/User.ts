import { create } from 'zustand';
import { createJSONStorage, persist } from 'expo-zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserStore, UploadAvatarResponse, ErrorResponse, User } from './types';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { AxiosError } from 'axios';
import { HTTP_DOMAIN } from '@config/varEnvs';

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      address: null,
      token: null,
      verificationEmail: null,
      setVerificationEmail: (email) => set({ verificationEmail: email }),

      signIn: () => {
        try {
          const mockedUser = {
            id: 1,
            client_id: 1,
            name: 'Douglas W.',
            email: 'douglas@delbicos.com',
            phone: '+55 11 99999-9999',
            cpf: '123.456.789-00',
          };
          const mockedAddress = {
            id: 2,
            lat: '-22.90684700',
            lng: '-43.17289600',
            street: 'Rua B',
            number: '456',
            complement: 'Casa 2',
            neighborhood: 'Bairro B',
            city: 'Cidade B',
            state: 'RJ',
            country_iso: 'BR',
            postal_code: '23456789',
          };
          set({ user: mockedUser, address: mockedAddress });
        } catch (error) {
          console.error('Error during login:', error);
          return;
        }
      },

      signInPassword: async (email: string, password: string) => {
        try {
          const response = await backendHttpClient.post('/api/user/login', {
            email,
            password,
          });

          if (!response.status.toString().startsWith('2')) {
          }

          const { token, user } = response.data;
          if (!token) {
            console.error('No token received from the server');
            return;
          }
          const userData = {
            id: user.id,
            client_id: user.client_id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            cpf: user.cpf,
          };
          const addressData = {
            id: user.address.id,
            lat: user.address.lat,
            lng: user.address.lng,
            street: user.address.street,
            number: user.address.number,
            complement: user.address.complement,
            neighborhood: user.address.neighborhood,
            city: user.address.city,
            state: user.address.state,
            country_iso: user.address.country_iso,
            postal_code: user.address.postal_code,
          };
          set({ user: userData, address: addressData, token });
          console.log('Login successful:', userData);
          return;
        } catch (error: any | AxiosError) {
          if (error instanceof AxiosError && error.status) {
            if (error.status.toString().startsWith('4')) {
              throw new Error(
                'Credenciais inválidas. Por favor, tente novamente.',
              );
            }
            if (error.status.toString().startsWith('5')) {
              throw new Error(
                'Erro interno do servidor. Por favor, tente novamente mais tarde.',
              );
            }
          }
          throw new Error('Erro ao fazer login. Por favor, tente novamente.');
        }
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        try {
          const token = get().token;
          const headers = token
            ? { Authorization: `Bearer ${token}` }
            : undefined;

          const response = await backendHttpClient.post(
            '/api/user/change-password',
            {
              current_password: currentPassword,
              new_password: newPassword,
            },
            { headers },
          );

          if (!response.status.toString().startsWith('2')) {
            throw new Error('Não foi possível alterar a senha.');
          }
          return;
        } catch (error: any | AxiosError) {
          if (error instanceof AxiosError && error.status) {
            if (error.status.toString().startsWith('4')) {
              throw new Error('Dados inválidos. Verifique e tente novamente.');
            }
            if (error.status.toString().startsWith('5')) {
              throw new Error(
                'Erro interno do servidor. Tente novamente mais tarde.',
              );
            }
          }
          throw new Error(
            'Erro ao alterar a senha. Por favor, tente novamente.',
          );
        }
      },

      uploadAvatar: async (
        userId: string,
        base64Image: string,
      ): Promise<UploadAvatarResponse> => {
        try {
          console.log(
            '📤 Base64 completo (primeiros 200 chars):',
            base64Image.substring(0, 200),
          );
          console.log('📤 Tipo MIME detectado:', base64Image.substring(0, 50));
          console.log('📤 Tamanho do base64:', base64Image.length);

          const token = get().token;

          const response = await fetch(
            `${HTTP_DOMAIN}/api/user/${userId}/avatar`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                base64Image: base64Image,
                userId: userId,
              }),
            },
          );

          console.log('📤 Status da resposta:', response.status);

          if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Erro na resposta:', errorText);

            try {
              const errorData = JSON.parse(errorText);
              return {
                erro: true,
                mensagem: errorData.error || `Erro ${response.status}`,
              };
            } catch {
              return {
                erro: true,
                mensagem: `Erro ${response.status}: ${errorText}`,
              };
            }
          }

          const data = await response.json();
          console.log('✅ Resposta do servidor:', data);

          // Atualiza o avatar_uri do usuário na store
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                avatar_uri: data.avatar_uri,
              },
            });
          }

          return {
            erro: false,
            mensagem: 'Avatar atualizado com sucesso!',
            avatar_uri: data.avatar_uri,
          };
        } catch (error: any) {
          console.error('❌ Erro no upload:', error);
          return {
            erro: true,
            mensagem: error.message || 'Erro ao fazer upload do avatar',
          };
        }
      },

      removeAvatar: async (userId: string): Promise<ErrorResponse> => {
        try {
          const token = get().token;
          const response = await fetch(
            `${HTTP_DOMAIN}/api/user/${userId}/avatar`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (!response.ok) {
            const errorText = await response.text();
            console.error(
              '❌ Erro na remoção do avatar no servidor:',
              errorText,
            );
            return {
              erro: true,
              mensagem: errorText || 'Erro ao remover avatar',
            };
          }

          // Atualiza o avatar_uri do usuário na store
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                avatar_uri: null,
              },
            });
          }

          return {
            erro: false,
            mensagem: 'Avatar removido com sucesso!',
          };
        } catch (error: any) {
          console.error('Erro ao remover avatar:', error);
          return {
            erro: true,
            mensagem: 'Falha ao remover o avatar',
          };
        }
      },

      fetchUserById: async (
        userId: string,
      ): Promise<{ erro: boolean; mensagem: string; user?: User }> => {
        try {
          const token = get().token;
          const response = await fetch(`${HTTP_DOMAIN}/api/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            return {
              erro: true,
              mensagem: 'Erro ao buscar usuário',
            };
          }

          const data = await response.json();

          return {
            erro: false,
            mensagem: 'Usuário carregado com sucesso',
            user: data,
          };
        } catch (error: any) {
          console.error('Erro ao carregar dados do usuário:', error);
          return {
            erro: true,
            mensagem: 'Não foi possível carregar os dados do usuário.',
          };
        }
      },

      signOut: () =>
        set({
          user: null,
          address: null,
          token: null,
        }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      //@ts-ignore
      partialize: (state) => ({
        user: state.user,
        address: state.address,
        token: state.token,
      }),
    },
  ),
);
