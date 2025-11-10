import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Button,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { useNavigation } from '@react-navigation/native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

type StatsResponse = {
  year: number;
  usersByMonth?: { month: number; count: number }[];
  professionalsByMonth?: { month: number; count: number }[];
  appointmentsByMonth?: {
    month: number;
    totalRequested?: number;
    completed?: number;
    canceled?: number;
    pending?: number;
    confirmed?: number;
  }[];
  servicesSummary?: Record<string, number>;
};

const MONTH_LABELS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function fillMonthlyArray<T extends { month: number }>(arr: T[] | undefined, mapper: (v: T | undefined) => number) {
  const out: number[] = new Array(12).fill(0);
  if (!arr || arr.length === 0) return out;
  const byMonth = new Map<number, T>();
  for (const item of arr) {
    byMonth.set(Number(item.month), item);
  }
  for (let m = 1; m <= 12; m++) {
    const v = byMonth.get(m);
    out[m - 1] = mapper(v);
  }
  return out;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AdminAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const year = new Date().getFullYear();
        const res = await backendHttpClient.get('/api/admin/stats', {
          params: { year },
        });
        setData(res.data as StatsResponse);
      } catch (e: any) {
        console.error('[AdminAnalytics] erro ao buscar stats', e);
        setError(e?.response?.data?.message || e.message || 'Erro ao buscar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const usersData = fillMonthlyArray(data?.usersByMonth, (v) => (v ? (v as any).count || 0 : 0));
  const prosData = fillMonthlyArray(data?.professionalsByMonth, (v) => (v ? (v as any).count || 0 : 0));
  const appointments = fillMonthlyArray(data?.appointmentsByMonth, (v) => (v ? (v as any).totalRequested || 0 : 0));

  const pendingSeries = fillMonthlyArray(data?.appointmentsByMonth, (v) => (v ? (v as any).pending || 0 : 0));
  const confirmedSeries = fillMonthlyArray(data?.appointmentsByMonth, (v) => (v ? (v as any).confirmed || 0 : 0));
  const completedSeries = fillMonthlyArray(data?.appointmentsByMonth, (v) => (v ? (v as any).completed || 0 : 0));
  const canceledSeries = fillMonthlyArray(data?.appointmentsByMonth, (v) => (v ? (v as any).canceled || 0 : 0));

  const summary = data?.servicesSummary || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Voltar" onPress={() => navigation.goBack()} />

      <Text style={styles.title}>Painel do Admin</Text>

      {loading && <ActivityIndicator size="large" />}

      {!!error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Erro: {error}</Text>
        </View>
      )}

      {!loading && !data && !error && <Text>Nenhum dado disponível.</Text>}

      {!loading && data && (
        <>
          {/* KPI Cards */}
          <View style={styles.kpiRow}>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiLabel}>Earnings</Text>
              <Text style={styles.kpiValue}>${summary.total || 0}</Text>
            </View>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiLabel}>Share</Text>
              <Text style={styles.kpiValue}>{summary.confirmed || 0}</Text>
            </View>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiLabel}>Likes</Text>
              <Text style={styles.kpiValue}>{summary.pending || 0}</Text>
            </View>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiLabel}>Rating</Text>
              <Text style={styles.kpiValue}>8.5</Text>
            </View>
          </View>

          {/* Main charts area */}
          <View style={styles.chartsRow}>
            <View style={styles.mainChart}>
              <Text style={styles.sectionTitle}>Usuários por mês</Text>
              <BarChart
                data={{ labels: MONTH_LABELS, datasets: [{ data: usersData }] }}
                width={Math.min(SCREEN_WIDTH - 40, 900)}
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={chartConfig}
                verticalLabelRotation={-20}
                fromZero
              />

              <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Prestadores por mês</Text>
              <LineChart
                data={{ labels: MONTH_LABELS, datasets: [{ data: prosData }] }}
                width={Math.min(SCREEN_WIDTH - 40, 900)}
                height={180}
                chartConfig={chartConfig}
                bezier
                fromZero
              />

              <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Serviços solicitados</Text>
              <BarChart
                data={{ labels: MONTH_LABELS, datasets: [{ data: appointments }] }}
                width={Math.min(SCREEN_WIDTH - 40, 900)}
                height={180}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={chartConfig}
                fromZero
              />
            </View>

            <View style={styles.sideColumn}>
              <Text style={styles.sectionTitle}>Status dos serviços</Text>
              <PieChart
                data={Object.keys(summary).map((k, i) => ({
                  name: k,
                  population: Number(summary[k]) || 0,
                  color: pieColors[i % pieColors.length],
                  legendFontColor: '#333',
                  legendFontSize: 12,
                }))}
                width={Math.min(300, SCREEN_WIDTH * 0.35)}
                height={180}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
              />

              <View style={{ marginTop: 12 }}>
                <Text style={styles.sectionTitle}>Resumo</Text>
                {['pending', 'confirmed', 'completed', 'canceled', 'total'].map((k) => (
                  <View key={k} style={styles.summaryRow}>
                    <Text style={styles.summaryKey}>{k}</Text>
                    <Text style={styles.summaryVal}>{summary[k] ?? 0}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const pieColors = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f'];

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(6, 82, 221, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
  style: {
    borderRadius: 8,
  },
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginVertical: 12 },
  errorBox: { padding: 12, backgroundColor: '#fdecea', borderRadius: 6 },
  errorText: { color: '#611a15' },
  kpiRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap' },
  kpiCard: { flex: 1, minWidth: 140, backgroundColor: '#fff', padding: 12, margin: 6, borderRadius: 8, elevation: 2 },
  kpiLabel: { fontSize: 12, color: '#666' },
  kpiValue: { fontSize: 20, fontWeight: '700', marginTop: 6 },
  chartsRow: { flexDirection: 'row', gap: 12 },
  mainChart: { flex: 1 },
  sideColumn: { width: 320, marginLeft: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  summaryKey: { color: '#333' },
  summaryVal: { fontWeight: '700' },
});

export default AdminAnalytics;
