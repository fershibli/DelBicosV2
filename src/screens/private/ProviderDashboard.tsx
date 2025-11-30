import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { DashboardKpiCards } from '@components/features/DashboardKpiCards';
import { EarningsChart } from '@components/features/EarningsChart';
import { ServicesByCategoryList } from '@components/features/ServicesByCategoryList';
import { useDashboardStore } from '@stores/Dashboard';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';

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

  const colors = useColors();
  const styles = createStyles(colors);

  const loadAllData = useCallback(async () => {
    const to = new Date().toISOString().slice(0, 10);
    const from = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
      .toISOString()
      .slice(0, 10);

    try {
      await Promise.all([
        fetchKpis(),
        fetchEarnings(from, to),
        fetchCategories(from, to),
      ]);
    } catch (err) {
      console.error('Erro ao carregar dados do Dashboard:', err);
    }
  }, [fetchKpis, fetchEarnings, fetchCategories]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Painel do Prestador</Text>

        <TouchableOpacity
          style={styles.refreshButton}
          disabled={loading}
          onPress={loadAllData}
          activeOpacity={0.7}>
          {loading ? (
            <ActivityIndicator size="small" color={colors.primaryBlue} />
          ) : (
            <FontAwesome name="refresh" size={20} color={colors.primaryBlue} />
          )}
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {typeof error === 'string'
              ? error
              : 'Ocorreu um erro ao carregar os dados.'}
          </Text>
        </View>
      ) : null}

      <DashboardKpiCards kpis={kpis} loading={loading} />

      <EarningsChart earnings={earnings} />

      <ServicesByCategoryList categories={categories} />
    </ScrollView>
  );
};

export default ProviderDashboard;
