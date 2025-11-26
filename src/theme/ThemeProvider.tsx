import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { ThemeMode } from '@stores/Theme/types';
import { useThemeStore } from '@stores/Theme';
import lightScheme from './light';
import darkScheme from './dark';
import lightContrastScheme from './light-contrast';
import { ColorsType } from './types';

const themes: Record<ThemeMode, ColorsType> = {
  [ThemeMode.LIGHT]: lightScheme,
  [ThemeMode.DARK]: darkScheme,
  [ThemeMode.LIGHT_HI_CONTRAST]: lightContrastScheme,
};

const ThemeContext = createContext<ColorsType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useThemeStore();

  const colors = useMemo(() => {
    return themes[theme] || lightScheme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>
  );
};

export const useColors = (): ColorsType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Fallback to lightScheme to avoid runtime errors outside provider
    return lightScheme;
  }
  return ctx;
};

export default ThemeProvider;
