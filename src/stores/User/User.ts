import { create } from 'zustand';
import { createJSONStorage, persist } from 'expo-zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserStore } from './types';
import { backendHttpClient } from '@lib/helpers/httpClient';

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      signIn: () => {
        try {
          const mockedUser = {
            id: '1',
            name: 'Douglas W.',
            email: 'douglas@delbicos.com',
            phone: '+55 11 99999-9999',
            location: 'São Paulo, SP',
          };
          set({ user: mockedUser });
        } catch (error) {
          console.error('Error during login:', error);
          return;
        }
      },
      signInPassword: async (email: string, password: string) => {
        try {
          const response = await backendHttpClient.post('/api/user/login', {
            params: {
              email,
              password,
            },
          });

          if (response.status === 200) {
            const { token, user } = response.data;
            if (token) {
              set({ user, token });
            } else {
              console.error('No token received from the server');
              return;
            }
          } else {
            console.error('Login failed:', response.statusText);
          }
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
