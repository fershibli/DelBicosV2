import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KpisResponse } from '@lib/types/dashboard';

type Props = {
  kpis?: KpisResponse | null;
  loading?: boolean;
};

export const DashboardKpiCards: React.FC<Props> = ({ kpis, loading }) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando KPIs...</Text>
      </View>
    );
  }

  if (!kpis) {
    return (
      <View style={styles.container}>
        <Text>Nenhum dado de KPI disponível</Text>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <Text style={styles.title}>Serviços</Text>
        <Text style={styles.value}>{kpis.totalServices}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Ganhos</Text>
        <Text style={styles.value}>R$ {kpis.totalEarnings.toFixed(2)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Avaliação</Text>
        <Text style={styles.value}>{kpis.avgRating ?? '—'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  card: {
    flex: 1,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  title: { fontSize: 12, color: '#666' },
  value: { fontSize: 18, fontWeight: '700', marginTop: 8 },
});

export default DashboardKpiCards;
