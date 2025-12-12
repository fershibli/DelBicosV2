import React from 'react';
import { View, Text } from 'react-native';
import { useColors } from '@theme/ThemeProvider';
import CategoryList from '@components/features/CategoryList';
import { createStyles } from './styles';

function CategoryScreen() {
  const colors = useColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Categorias</Text>
      <View style={styles.listContainer}>
        <CategoryList />
      </View>
    </View>
  );
}

export default CategoryScreen;
