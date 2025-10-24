import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import CategoryList from '@components/CategoryList';
import ListProfessionals from '@components/ListProfessionals';

function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione por Categorias</Text>
      <CategoryList />
      <Text style={styles.title}>Profissionais próximos a você</Text>
      <ListProfessionals />
    </View>
  );
}

export default FeedScreen;
