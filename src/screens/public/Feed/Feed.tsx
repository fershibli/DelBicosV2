import React from 'react';
import { Text, ScrollView } from 'react-native';
import { styles } from './styles';
import CategorySlider from '@components/CategorySlider';
import ListProfessionals from '@components/ListProfessionals';

const FeedScreen: React.FC = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Selecione por Categorias</Text>
      <CategorySlider />
      <Text style={styles.title}>Profissionais próximos a você</Text>
      <ListProfessionals />
    </ScrollView>
  );
};

export default FeedScreen;
