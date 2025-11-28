import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { styles } from './styles';

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

const MONTH_LABELS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

function fillMonthlyArray<T extends { month: number }>(
  arr: T[] | undefined,
  mapper: (v: T | undefined) => number,
) {
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
        setError(
          e?.response?.data?.message || e.message || 'Erro ao buscar dados',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const usersData = fillMonthlyArray(data?.usersByMonth, (v) => v?.count || 0);

  const prosData = fillMonthlyArray(
    data?.professionalsByMonth,
    (v) => v?.count || 0,
  );

  const appointments = fillMonthlyArray(
    data?.appointmentsByMonth,
    (v) => v?.totalRequested || 0,
  );

  const summary = data?.servicesSummary || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

              <Text style={[styles.sectionTitle, { marginTop: 12 }]}>
                Prestadores por mês
              </Text>
              <LineChart
                data={{ labels: MONTH_LABELS, datasets: [{ data: prosData }] }}
                width={Math.min(SCREEN_WIDTH - 40, 900)}
                height={180}
                chartConfig={chartConfig}
                bezier
                fromZero
              />

              <Text style={[styles.sectionTitle, { marginTop: 12 }]}>
                Serviços solicitados
              </Text>
              <BarChart
                data={{
                  labels: MONTH_LABELS,
                  datasets: [{ data: appointments }],
                }}
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
                {['pending', 'confirmed', 'completed', 'canceled', 'total'].map(
                  (k) => (
                    <View key={k} style={styles.summaryRow}>
                      <Text style={styles.summaryKey}>{k}</Text>
                      <Text style={styles.summaryVal}>{summary[k] ?? 0}</Text>
                    </View>
                  ),
                )}
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

export default AdminAnalytics;
