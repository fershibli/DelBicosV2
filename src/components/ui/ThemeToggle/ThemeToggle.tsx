import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const colors = useColors();
  const styles = createStyles(colors);

  const currentTheme = theme || ThemeMode.LIGHT;

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
  };

  const themeOptions = useMemo(
    () => [
      {
        mode: ThemeMode.LIGHT,
        icon: 'sun-o',
        label: 'Tema Claro',
      },
      {
        mode: ThemeMode.DARK,
        icon: 'moon-o',
        label: 'Tema Escuro',
      },
      {
        mode: ThemeMode.LIGHT_HI_CONTRAST,
        icon: 'adjust',
        label: 'Alto Contraste',
      },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      {themeOptions.map((option) => {
        const isActive = currentTheme === option.mode;

        return (
          <TouchableOpacity
            key={option.mode}
            style={[styles.button, isActive && styles.buttonActive]}
            onPress={() => handleThemeChange(option.mode)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={option.label}
            accessibilityState={{ selected: isActive }}
            testID={`theme-${option.mode}-button`}>
            <FontAwesome
              name={option.icon as any}
              size={18}
              color={isActive ? colors.primaryOrange : colors.textTertiary}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
