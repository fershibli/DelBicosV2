import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserStore } from './types';

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
      signOut: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
