import { create } from 'zustand';
import { createJSONStorage, persist } from 'expo-zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeStore, ThemeMode } from './types';

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: ThemeMode.LIGHT,

      setTheme: (theme: ThemeMode) => {
        set({ theme });
      },

      getTheme: () => {
        return get().theme;
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      //@ts-ignore
      partialize: (state) => ({
        theme: state.theme,
      }),
    },
  ),
);
