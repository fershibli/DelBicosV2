import { create } from 'zustand';
import { createJSONStorage, persist } from 'expo-zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserStore, Address } from './types';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { AxiosError } from 'axios';

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      address: null,
      token: null,
      verificationEmail: null,
      setVerificationEmail: (email) => set({ verificationEmail: email }),

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
          set({ user: userData, address: addressData, token });
          console.log('Login successful:', userData);
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

      changePassword: async (currentPassword: string, newPassword: string) => {
        try {
          const response = await backendHttpClient.post(
            '/api/user/change-password',
            {
              current_password: currentPassword,
              new_password: newPassword,
            },
            // O interceptor do httpClient adiciona o 'Authorization: Bearer ...'
          );

          if (response.status !== 200) {
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
          console.log('[UserStore] Enviando avatar para o backend...');

          const response = await backendHttpClient.post(`/api/user/avatar`, {
            base64Image: base64Image,
          });

          const data = response.data;
          console.log('[UserStore] Avatar atualizado:', data);

          set({ user: data.user });
        } catch (error: any) {
          console.error('Erro no uploadAvatar do UserStore:', error);
          throw new Error(
            error.response?.data?.error || 'Falha ao enviar avatar.',
          );
        }
      },
      removeAvatar: async () => {
        const userId = get().user?.id;
        if (!userId) throw new Error('Usuário não autenticado.');

        try {
          console.log('[UserStore] Chamando API DELETE /api/user/avatar...');

          const response = await backendHttpClient.delete(`/api/user/avatar`);
          console.log(
            '[UserStore] Resposta do backend (removeAvatar):',
            response.data,
          );
          if (!response.data || !response.data.user) {
            console.error(
              '[UserStore] Erro: O backend não retornou o objeto "user" atualizado.',
            );
            // Se o backend não retornar o 'user', atualizamos o estado manualmente
            set((state) => ({
              user: state.user ? { ...state.user, avatar_uri: null } : null,
            }));
            console.log(
              '[UserStore] Avatar removido do estado local (manualmente).',
            );
          } else {
            // Se o backend retornou o 'user', nós o usamos
            set({ user: response.data.user });
            console.log(
              '[UserStore] Estado do usuário atualizado com dados do backend.',
            );
          }
        } catch (error: any) {
          console.error('Erro no removeAvatar do UserStore:', error);
          throw new Error(
            error.response?.data?.error || 'Falha ao remover avatar.',
          );
        }
      },
      signOut: () =>
        set({
          user: null,
          address: null,
          token: null,
          verificationEmail: null,
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
