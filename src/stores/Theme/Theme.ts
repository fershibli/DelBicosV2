import { create } from 'zustand';
import { createJSONStorage, persist } from 'expo-zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeStore, ThemeMode } from './types';
import { Platform, Appearance } from 'react-native';

// Usado apenas como padrão inicial (antes da reidratação do AsyncStorage).
// O toggle manual do usuário, uma vez salvo, sempre prevalece sobre o tema do sistema.
const getSystemDefaultTheme = (): ThemeMode => {
  const scheme = Appearance.getColorScheme();
  return scheme === 'dark' ? ThemeMode.DARK : ThemeMode.LIGHT;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: getSystemDefaultTheme(),

      setTheme: (theme: ThemeMode) => {
        set({ theme });

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
