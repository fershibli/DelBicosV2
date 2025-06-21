import { create } from 'zustand';
import { createJSONStorage, persist } from 'expo-zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserStore } from './types';
import { backendHttpClient } from '@lib/helpers/httpClient';

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      signIn: () => {
        try {
          const mockedUser = {
            name: 'Douglas W.',
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
          const response = await backendHttpClient.get('/user/login', {
            params: {
              email,
              password,
            },
          });

          if (response.status === 200) {
            const user = response.data;
            set({ user });
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
