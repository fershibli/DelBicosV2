import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { styles } from './styles';
import colors from '@theme/colors';
import { BarChart, LineChart } from 'react-native-chart-kit';

type MonthData = { month: number; count?: number; totalRequested?: number; completed?: number; canceled?: number };

const monthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

const screenWidth = Dimensions.get('window').width - 32;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 0,
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<MonthData[]>([]);
  const [professionals, setProfessionals] = useState<MonthData[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

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

  if (loading) return <ActivityIndicator style={{ flex: 1 }} color={colors.primaryBlue} />;

  const labels = monthNames;

  const usersData = users.map((m) => m.count || 0);
  const profData = professionals.map((m) => m.count || 0);

  const appointmentTotal = appointments.map((m: any) => m.totalRequested || 0);
  const appointmentCompleted = appointments.map((m: any) => m.completed || 0);
  const appointmentCanceled = appointments.map((m: any) => m.canceled || 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Painel Administrativo</Text>

      <Text style={styles.sectionTitle}>Novos Usuários (por mês)</Text>
      <BarChart
        data={{ labels, datasets: [{ data: usersData }] }}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
      />

      <Text style={styles.sectionTitle}>Novos Prestadores (por mês)</Text>
      <BarChart
        data={{ labels, datasets: [{ data: profData }] }}
        width={screenWidth}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{ ...chartConfig, color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})` }}
        fromZero
        showValuesOnTopOfBars
      />

      <Text style={styles.sectionTitle}>Agendamentos (Solicitados / Realizados / Cancelados)</Text>
      <LineChart
        data={{
          labels,
          datasets: [
            { data: appointmentTotal, color: (opacity = 1) => `rgba(33,150,243, ${opacity})`, strokeWidth: 2 },
            { data: appointmentCompleted, color: (opacity = 1) => `rgba(76,175,80, ${opacity})`, strokeWidth: 2 },
            { data: appointmentCanceled, color: (opacity = 1) => `rgba(244,67,54, ${opacity})`, strokeWidth: 2 },
          ],
          legend: ['Solicitados', 'Realizados', 'Cancelados'],
        }}
        width={screenWidth}
        height={260}
        chartConfig={chartConfig}
        bezier
        fromZero
      />
    </ScrollView>
  );
}
