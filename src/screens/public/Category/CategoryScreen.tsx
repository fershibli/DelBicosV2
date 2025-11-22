import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useThemeStore, ThemeMode } from '@stores/Theme';
import { useColors } from '@theme/ThemeProvider';
import CategoryList from '@components/features/CategoryList';
import { createStyles } from './styles';

function CategoryScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === ThemeMode.DARK;
  const colors = useColors();
  const styles = createStyles(colors);
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
