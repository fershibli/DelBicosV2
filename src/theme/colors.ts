import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types'; // ColorScheme pode ser outro nome
import lightScheme from './light'; // lightScheme pode ser outro nome
import { ColorsType } from '@theme/types';

const themes: Record<ThemeMode, ColorsType> = {
  [ThemeMode.LIGHT]: lightScheme,
  [ThemeMode.DARK]: lightScheme,
  [ThemeMode.LIGHT_HI_CONTRAST]: lightScheme,
};

export default themes[useThemeStore.getState().getTheme()];
