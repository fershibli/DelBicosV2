import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useThemeStore, ThemeMode } from '@stores/Theme';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const currentTheme = theme || ThemeMode.LIGHT;

  console.log('ThemeToggle renderizado. Tema atual:', currentTheme);

  const handleThemeChange = (newTheme: ThemeMode) => {
    console.log('Mudando tema de', currentTheme, 'para', newTheme);
    setTheme(newTheme);
    console.log('Tema salvo, recarregando página...');
    // Força um reload das cores apenas na web
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 6,
    borderRadius: 8,
    ...Platform.select({
      web: {
        display: 'flex',
      },
    }),
  },
  button: {
    padding: 10,
    marginHorizontal: 3,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      },
    }),
  },
  buttonActive: {
    backgroundColor: '#DDE6F0',
    borderColor: '#005A93',
    borderWidth: 2,
  },
});
