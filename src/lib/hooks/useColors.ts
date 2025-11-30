import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types';
import lightScheme from '@theme/light';
import darkScheme from '@theme/dark';
import lightContrastScheme from '@theme/light-contrast';
import { ColorsType } from '@theme/types';

const themes: Record<ThemeMode, ColorsType> = {
  [ThemeMode.LIGHT]: lightScheme,
  [ThemeMode.DARK]: darkScheme,
  [ThemeMode.LIGHT_HI_CONTRAST]: lightContrastScheme,
};

export const useColors = (): ColorsType => {
  const { theme } = useThemeStore();
  return themes[theme] || lightScheme;
};
