import { create } from 'zustand';
import { createJSONStorage, persist } from 'expo-zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeStore, ThemeMode } from './types';
import { Platform } from 'react-native';

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: ThemeMode.LIGHT,

      setTheme: (theme: ThemeMode) => {
        set({ theme });

        // Salva também no localStorage para web
        if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
          const storeValue = JSON.stringify({ state: { theme }, version: 0 });
          localStorage.setItem('theme-storage', storeValue);
        }
      },

      getTheme: () => {
        const currentTheme = get().theme;
        return currentTheme;
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
