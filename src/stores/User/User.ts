import { create } from 'zustand';
import { createJSONStorage, persist } from 'expo-zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserStore, Address, ErrorResponse, User } from './types';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { AxiosError } from 'axios';

export const useUserStore = create<UserStore>(
  persist(
    (set, get) => ({
      user: null,
      address: null,
      token: null,
      verificationEmail: null,
      avatarBase64: null,

      fetchCurrentUser: async () => {
        try {
          const { user } = (await backendHttpClient.get('/api/user/me')).data;

          const userData: User = {
            id: user.id,
            client_id: user.Client.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            cpf: user.Client.cpf,
            avatar_uri: user.avatar_uri,
            banner_uri: user.banner_uri,
          };

          const prevUser = get().user;
          set({
            user: { ...prevUser, ...userData },
            avatarBase64: userData.avatar_uri || null,
          });
        } catch (error) {
          console.error('Erro ao buscar usuário atual:', error);
        }
      },

      setVerificationEmail: (email) => set({ verificationEmail: email }),

      setLoggedInUser: (data: {
        token: string;
        user: User;
        address: Address | null;
      }) => {
        set({
          token: data.token,
          user: data.user,
          address: data.address,
        });
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
          const addressData: Address | null = user.address
            ? {
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
              }
            : null;
          get().setLoggedInUser({
            token,
            user: {
              id: user.id,
              client_id: user.client_id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              cpf: user.cpf,
              avatar_uri: user.avatar_uri,
            },
            address: addressData,
          });
          set({ user: userData, address: addressData, token });
          return;
        } catch (error: any | AxiosError) {
          if (error instanceof AxiosError) {
            if (
              error.response?.status === 401 ||
              error.response?.status === 404
            ) {
              throw new Error(
                'Credenciais inválidas. Verifique seu e-mail e senha.',
              );
            }
            if (error.response?.status.toString().startsWith('5')) {
              throw new Error(
                'Erro interno do servidor. Tente novamente mais tarde.',
              );
            }
          }
          throw new Error('Erro ao fazer login. Por favor, tente novamente.');
        }
      },
      signInAdmin: async (email: string, password: string) => {
        try {
          const response = await backendHttpClient.post('/api/admin/login', {
            email,
            password,
          });

          const { token, user } = response.data;
          if (!token) {
            throw new Error('No token received from the server');
          }

          const userData: User = {
            id: user.id,
            client_id: user.client_id || 0,
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            cpf: user.cpf || '',
            avatar_uri: user.avatar_uri || null,
            admin: true,
          };

          get().setLoggedInUser({ token, user: userData, address: null });
          set({ user: userData, address: null, token });
          return;
        } catch (error: any | AxiosError) {
          if (error instanceof AxiosError) {
            if (
              error.response?.status === 401 ||
              error.response?.status === 404 ||
              error.response?.status === 403
            ) {
              throw new Error('Credenciais inválidas ou sem permissão.');
            }
            if (error.response?.status.toString().startsWith('5')) {
              throw new Error(
                'Erro interno do servidor. Tente novamente mais tarde.',
              );
            }
          }
          throw new Error(
            'Erro ao fazer login do admin. Por favor, tente novamente.',
          );
        }
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        try {
          const response = await backendHttpClient.post(
            '/api/user/change-password',
            {
              current_password: currentPassword,
              new_password: newPassword,
            },
          );

          if (response.status < 200 || response.status >= 300) {
            throw new Error('Não foi possível alterar a senha.');
          }
          return;
        } catch (error: any | AxiosError) {
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
              throw new Error('Senha atual incorreta.');
            }
            if (error.response?.status === 400) {
              throw new Error(
                'Dados inválidos. Verifique os requisitos da nova senha.',
              );
            }
            if (error.response?.status.toString().startsWith('5')) {
              throw new Error(
                'Erro interno do servidor. Tente novamente mais tarde.',
              );
            }
          }
          throw new Error('Erro ao alterar a senha. Tente novamente.');
        }
      },
      uploadAvatar: async (base64Image: string) => {
        try {
          const response = await backendHttpClient.post(
            `/api/user/imgbb/avatar`,
            {
              base64Image: base64Image,
            },
          );

          const { data } = response;

          const currentUser = get().user;
          if (data.user) {
            set({ user: data.user });
          } else if (currentUser) {
            set({
              user: { ...currentUser, avatar_uri: data.avatar_uri },
            });
          }

          set({ avatarBase64: base64Image });

          return {
            erro: false,
            mensagem: 'Avatar atualizado com sucesso!',
            avatar_uri: data.avatar_uri,
          };
        } catch (error: any) {
          if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.error || error.message;
            return {
              erro: true,
              mensagem: errorMessage || 'Erro ao fazer upload do avatar',
            };
          }

          return {
            erro: true,
            mensagem: error.message || 'Erro ao fazer upload do avatar',
          };
        }
      },

      removeAvatar: async (): Promise<ErrorResponse> => {
        try {
          await backendHttpClient.delete(`/api/user/avatar`);

          const currentUser = get().user;
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                avatar_uri: null,
              },
              avatarBase64: null,
            });
          }

          return {
            erro: false,
            mensagem: 'Avatar removido com sucesso!',
          };
        } catch (error: any) {
          console.error('Erro ao remover avatar:', error);

          if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.error || error.message;
            return {
              erro: true,
              mensagem: errorMessage || 'Erro ao remover avatar',
            };
          }

          return {
            erro: true,
            mensagem: 'Falha ao remover o avatar',
          };
        }
      },

      signOut: () => {
        set({
          user: null,
          address: null,
          token: null,
          avatarBase64: null,
          verificationEmail: null,
        });
      },
      registerUser: async (formData) => {
        const { data } = await backendHttpClient.post(
          '/auth/register',
          formData,
        );

        if (!data || data.error) {
          throw new Error(data.error || 'Ocorreu um problema.');
        }

        return data;
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      //@ts-ignore
      partialize: (state) => ({
        user: state.user,
        address: state.address,
        token: state.token,
        avatarBase64: state.avatarBase64,
      }),
    },
  ),
);
