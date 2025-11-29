import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useThemeStore, ThemeMode } from '@stores/Theme';
import { styles } from './styles';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const currentTheme = theme || ThemeMode.LIGHT;

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    if (Platform.OS === 'web') {
      window.location.href = window.location.href;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          currentTheme === ThemeMode.LIGHT && styles.buttonActive,
        ]}
        onPress={() => handleThemeChange(ThemeMode.LIGHT)}
        accessible={true}
        accessibilityLabel="Tema claro"
        testID="theme-light-button">
        <FontAwesome
          name="sun-o"
          size={20}
          color={currentTheme === ThemeMode.LIGHT ? '#FC8200' : '#666'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          currentTheme === ThemeMode.DARK && styles.buttonActive,
        ]}
        onPress={() => handleThemeChange(ThemeMode.DARK)}
        testID="theme-dark-button">
        <FontAwesome
          name="moon-o"
          size={20}
          color={currentTheme === ThemeMode.DARK ? '#FC8200' : '#666'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          currentTheme === ThemeMode.LIGHT_HI_CONTRAST && styles.buttonActive,
        ]}
        onPress={() => handleThemeChange(ThemeMode.LIGHT_HI_CONTRAST)}
        testID="theme-contrast-button">
        <FontAwesome
          name="adjust"
          size={20}
          color={
            currentTheme === ThemeMode.LIGHT_HI_CONTRAST ? '#FC8200' : '#666'
          }
        />
      </TouchableOpacity>
    </View>
  );
};
