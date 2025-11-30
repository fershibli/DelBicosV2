import React, { useEffect, useState, useMemo } from 'react';
import {
  Text,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
  View,
} from 'react-native';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';
import { BarChart, LineChart } from 'react-native-chart-kit';

type MonthData = {
  month: number;
  count?: number;
  totalRequested?: number;
  completed?: number;
  canceled?: number;
};

const monthNames = [
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

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<MonthData[]>([]);
  const [professionals, setProfessionals] = useState<MonthData[]>([]);
  const [appointments, setAppointments] = useState<MonthData[]>([]);

  const { width } = useWindowDimensions();
  const colors = useColors();
  const styles = createStyles(colors);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await backendHttpClient.get('/api/admin/stats');
        const data = res.data;

        setUsers(data.usersByMonth || []);
        setProfessionals(data.professionalsByMonth || []);
        setAppointments(data.appointmentsByMonth || []);
      } catch (err) {
        console.error('Erro ao buscar estatísticas admin', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const chartConfig = useMemo(
    () => ({
      backgroundGradientFrom: colors.cardBackground,
      backgroundGradientTo: colors.cardBackground,
      color: (opacity = 1) => colors.primaryBlue,
      labelColor: (opacity = 1) => colors.textSecondary,
      strokeWidth: 2,
      decimalPlaces: 0,
      propsForBackgroundLines: {
        strokeDasharray: '',
        stroke: colors.borderColor,
      },
    }),
    [colors],
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}>
        <ActivityIndicator size="large" color={colors.primaryBlue} />
      </View>
    );
  }

  const fillData = (data: MonthData[], key: keyof MonthData) => {
    const result = new Array(12).fill(0);
    data.forEach((item) => {
      if (item.month >= 1 && item.month <= 12) {
        result[item.month - 1] = item[key] || 0;
      }
    });
    return result;
  };

  const usersData = fillData(users, 'count');
  const profData = fillData(professionals, 'count');
  const appointmentTotal = fillData(appointments, 'totalRequested');
  const appointmentCompleted = fillData(appointments, 'completed');
  const appointmentCanceled = fillData(appointments, 'canceled');

  const chartWidth = width - 32 - 32;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Painel Administrativo</Text>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Novos Usuários</Text>
        <BarChart
          data={{ labels: monthNames, datasets: [{ data: usersData }] }}
          width={chartWidth}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars
          flatColor={true}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Novos Prestadores</Text>
        <BarChart
          data={{ labels: monthNames, datasets: [{ data: profData }] }}
          width={chartWidth}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => colors.primaryOrange,
          }}
          fromZero
          showValuesOnTopOfBars
          flatColor={true}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Performance de Agendamentos</Text>
        <LineChart
          data={{
            labels: monthNames,
            datasets: [
              {
                data: appointmentTotal,
                color: () => colors.primaryBlue,
                strokeWidth: 2,
              },
              {
                data: appointmentCompleted,
                color: () => colors.successText,
                strokeWidth: 2,
              },
              {
                data: appointmentCanceled,
                color: () => colors.errorText,
                strokeWidth: 2,
              },
            ],
          }}
          width={chartWidth}
          height={260}
          chartConfig={chartConfig}
          bezier
          fromZero
          withDots
          withInnerLines
        />

        {/* Legenda Customizada */}
        <View style={styles.legendContainer}>
          <LegendItem color={colors.primaryBlue} label="Solicitados" />
          <LegendItem color={colors.successText} label="Realizados" />
          <LegendItem color={colors.errorText} label="Cancelados" />
        </View>
      </View>
    </ScrollView>
  );
}

const LegendItem = ({ color, label, style }: any) => {
  const styles = createStyles(useColors());
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
};
