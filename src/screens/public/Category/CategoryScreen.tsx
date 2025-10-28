import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import CategoryList from '@components/CategoryList';
import { styles } from './styles';

function CategoryScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.pageTitle}>Selecione por Categorias</Text>
        <CategoryList />
      </ScrollView>
    </View>
  );
}

export default CategoryScreen;
