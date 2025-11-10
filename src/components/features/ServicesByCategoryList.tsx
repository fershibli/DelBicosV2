import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ServiceCategory } from '@lib/types/dashboard';

type Props = {
  categories: ServiceCategory[];
};

export const ServicesByCategoryList: React.FC<Props> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Nenhuma categoria encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Serviços por Categoria</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.count}>{item.count}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  category: { fontSize: 14 },
  count: { fontSize: 14, fontWeight: '700' },
});

export default ServicesByCategoryList;
