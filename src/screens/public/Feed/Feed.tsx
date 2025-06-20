import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useLocation } from '@lib/hooks/LocationContext';
import { styles } from './styles';
import CategoryList from '@components/CategoryList';

function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione por Categorias</Text>
      <CategoryList />
      <Text style={styles.title}>Profissionais próximos a você</Text>
    </View>
  );
}

export default FeedScreen;
