export enum ThemeMode {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  LIGHT_HI_CONTRAST = 'LIGHT_HI_CONTRAST',
}

export type ThemeStore = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  getTheme: () => ThemeMode;
};
