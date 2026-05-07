import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';

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

const AdminAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { width } = useWindowDimensions();
  const colors = useColors();
  const styles = createStyles(colors);

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

  const usersData = useMemo(
    () => fillMonthlyArray(data?.usersByMonth, (v) => v?.count || 0),
    [data],
  );
  const prosData = useMemo(
    () => fillMonthlyArray(data?.professionalsByMonth, (v) => v?.count || 0),
    [data],
  );
  const appointments = useMemo(
    () =>
      fillMonthlyArray(
        data?.appointmentsByMonth,
        (v) => v?.totalRequested || 0,
      ),
    [data],
  );
  const summary = data?.servicesSummary || {};

  const chartConfig = useMemo(
    () => ({
      backgroundGradientFrom: colors.cardBackground,
      backgroundGradientTo: colors.cardBackground,
      decimalPlaces: 0,
      color: (opacity = 1) => colors.primaryBlue,
      labelColor: (opacity = 1) => colors.textSecondary,
      propsForDots: {
        r: '4',
        strokeWidth: '2',
        stroke: colors.primaryOrange,
      },
      style: {
        borderRadius: 16,
      },
    }),
    [colors],
  );

  const chartWidth = Math.min(width - 48, 800);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Painel Analytics</Text>

      {loading && <ActivityIndicator size="large" color={colors.primaryBlue} />}

      {!!error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Erro: {error}</Text>
        </View>
      )}

      {!loading && !data && !error && (
        <Text style={{ color: colors.textSecondary }}>
          Nenhum dado disponível.
        </Text>
      )}

      {!loading && data && (
        <>
          {/* KPI Cards */}
          <View style={styles.kpiRow}>
            <KpiCard
              label="Faturamento Total"
              value={`R$ ${summary.total || 0}`}
              styles={styles}
            />
            <KpiCard
              label="Serviços Realizados"
              value={summary.confirmed || 0}
              styles={styles}
            />
            <KpiCard
              label="Novos Usuários"
              value={summary.pending || 0}
              styles={styles}
            />
            <KpiCard label="Avaliação Média" value="4.8" styles={styles} />
          </View>

          {/* Main charts area */}
          <View style={styles.chartsRow}>
            <View style={styles.mainChart}>
              <View style={styles.chartCard}>
                <Text style={styles.sectionTitle}>
                  Usuários Cadastrados (Ano Atual)
                </Text>
                <BarChart
                  data={{
                    labels: MONTH_LABELS,
                    datasets: [{ data: usersData }],
                  }}
                  width={chartWidth}
                  height={220}
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={chartConfig}
                  verticalLabelRotation={0}
                  fromZero
                  showBarTops={false}
                  withInnerLines={true}
                />
              </View>

              <View style={styles.chartCard}>
                <Text style={styles.sectionTitle}>Novos Prestadores</Text>
                <LineChart
                  data={{
                    labels: MONTH_LABELS,
                    datasets: [{ data: prosData }],
                  }}
                  width={chartWidth}
                  height={220}
                  chartConfig={{
                    ...chartConfig,
                    color: (opacity = 1) => colors.primaryOrange,
                  }}
                  bezier
                  fromZero
                  withDots
                  withInnerLines={true}
                />
              </View>

              <View style={styles.chartCard}>
                <Text style={styles.sectionTitle}>Volume de Serviços</Text>
                <BarChart
                  data={{
                    labels: MONTH_LABELS,
                    datasets: [{ data: appointments }],
                  }}
                  width={chartWidth}
                  height={220}
                  yAxisLabel=""
                  yAxisSuffix=""
                  chartConfig={{
                    ...chartConfig,
                    color: (opacity = 1) => colors.successText,
                  }}
                  fromZero
                  showBarTops={false}
                />
              </View>
            </View>

            <View style={styles.sideColumn}>
              <View style={styles.chartCard}>
                <Text style={styles.sectionTitle}>Distribuição de Status</Text>
                <PieChart
                  data={Object.keys(summary).map((k, i) => ({
                    name: k,
                    population: Number(summary[k]) || 0,
                    color: getPieColor(i),
                    legendFontColor: colors.textSecondary,
                    legendFontSize: 12,
                  }))}
                  width={width > 600 ? 280 : width - 64}
                  height={200}
                  chartConfig={chartConfig}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                />
              </View>

              <View style={styles.chartCard}>
                <Text style={styles.sectionTitle}>Resumo Executivo</Text>
                {['pending', 'confirmed', 'completed', 'canceled', 'total'].map(
                  (k) => (
                    <View key={k} style={styles.summaryRow}>
                      <Text style={styles.summaryKey}>
                        {translateStatus(k)}
                      </Text>
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

const KpiCard = ({ label, value, styles }: any) => (
  <View style={styles.kpiCard}>
    <Text style={styles.kpiLabel}>{label}</Text>
    <Text style={styles.kpiValue}>{value}</Text>
  </View>
);

const getPieColor = (index: number) => {
  const colors = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f'];
  return colors[index % colors.length];
};

const translateStatus = (status: string) => {
  const map: Record<string, string> = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    completed: 'Concluído',
    canceled: 'Cancelado',
    total: 'Total Geral',
  };
  return map[status] || status;
};

export default AdminAnalytics;
