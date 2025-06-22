import { create } from 'zustand';
import { createJSONStorage, persist } from 'expo-zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserStore } from './types';
import { backendHttpClient } from '@lib/helpers/httpClient';

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      address: null,
      token: null,
      signIn: () => {
        try {
          const mockedUser = {
            id: 1,
            clientId: 1,
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
            if (response.status.toString().startsWith('4')) {
              console.error('Client error during login');
              // TODO: implementar uma lógica de tratamento de erro que retorne uma mensagem amigável ao usuário
            }
            if (response.status.toString().startsWith('5')) {
              console.error('Server error during login');
            }
            return;
          }

          const { token, user } = response.data;
          if (!token) {
            console.error('No token received from the server');
            return;
          }
          const userData = {
            id: user.id,
            clientId: user.clientId,
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
        } catch (error) {
          console.error('Error during login with password:', error);
          return;
        }
      },
      signOut: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      //@ts-ignore
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
