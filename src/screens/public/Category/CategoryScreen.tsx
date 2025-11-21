import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useThemeStore, ThemeMode } from '@stores/Theme';
import colors from '@theme/colors';
import CategoryList from '@components/features/CategoryList';
import { styles } from './styles';

function CategoryScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === ThemeMode.DARK;
  return (
    <View
      style={[
        styles.container,
        isDark ? { backgroundColor: colors.primaryWhite } : null,
      ]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.pageTitle}>Selecione por Categorias</Text>
        <CategoryList />
      </ScrollView>
    </View>
  );
}

export default CategoryScreen;
