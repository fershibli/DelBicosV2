import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { DashboardKpiCards } from '@components/features/DashboardKpiCards';
import { EarningsChart } from '@components/features/EarningsChart';
import { ServicesByCategoryList } from '@components/features/ServicesByCategoryList';
import { useDashboardStore } from '@stores/Dashboard';

const ProviderDashboard: React.FC = () => {
  const {
    kpis,
    earnings,
    categories,
    loading,
    error,
    fetchKpis,
    fetchEarnings,
    fetchCategories,
  } = useDashboardStore();

  useEffect(() => {
    const to = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const from = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
      .toISOString()
      .slice(0, 10);

    // run async loads and catch any unexpected rejections
    (async () => {
      try {
        await fetchKpis();
        await fetchEarnings(from, to);
        await fetchCategories(from, to);
      } catch (err) {
        // ensure we log the real error for debugging (and avoid unhandled rejection)
        // eslint-disable-next-line no-console
        console.error('Erro ao carregar dados do Dashboard:', err);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Painel do Prestador</Text>
        <Button
          title="Atualizar"
          disabled={loading}
          onPress={() => {
            fetchKpis();
          }}
        />
      </View>

      {error ? (
        <View style={styles.error}>
          <Text>{error}</Text>
        </View>
      ) : null}

      <DashboardKpiCards kpis={kpis} loading={loading} />

      <EarningsChart earnings={earnings} />

      <ServicesByCategoryList categories={categories} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fb' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: { fontSize: 20, fontWeight: '700' },
  error: { padding: 16, backgroundColor: '#fff0f0' },
});

export default ProviderDashboard;
