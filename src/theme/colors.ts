import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types';
import lightScheme from './light';
import darkScheme from './dark';
import lightContrastScheme from './light-contrast';
import { ColorsType } from '@theme/types';
import { Platform } from 'react-native';

const themes: Record<ThemeMode, ColorsType> = {
  [ThemeMode.LIGHT]: lightScheme,
  [ThemeMode.DARK]: darkScheme,
  [ThemeMode.LIGHT_HI_CONTRAST]: lightContrastScheme,
};

export const getColors = (): ColorsType => {
  const currentTheme = useThemeStore.getState().getTheme();
  console.log('getColors - Tema atual:', currentTheme);
  return themes[currentTheme] || lightScheme;
};

// Busca o tema do localStorage na web ou da store
const getCurrentTheme = (): ThemeMode => {
  if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('theme-storage');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const theme = parsed?.state?.theme;
        console.log('colors.ts - Tema do localStorage:', theme);
        return theme || ThemeMode.LIGHT;
      } catch (e) {
        console.error('Erro ao parsear theme do localStorage:', e);
      }
    }
  }
  const theme = useThemeStore.getState().getTheme();
  console.log('colors.ts - Tema da store:', theme);
  return theme;
};

const currentTheme = getCurrentTheme();
console.log('colors.ts carregado - Tema sendo aplicado:', currentTheme);
console.log('Cores sendo usadas:', themes[currentTheme]);

export default themes[currentTheme] || lightScheme;
