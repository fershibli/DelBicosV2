import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { EarningsMonth } from '@lib/types/dashboard';
import { LineChart } from 'react-native-chart-kit';

type Props = {
  earnings: EarningsMonth[];
};

const screenWidth = Dimensions.get('window').width - 32;

export const EarningsChart: React.FC<Props> = ({ earnings }) => {
  if (!earnings || earnings.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Nenhum dado de ganhos disponível</Text>
      </View>
    );
  }

  // Sort by month (assumes format MM-YYYY)
  const sorted = [...earnings].sort((a, b) => {
    const [am, ay] = a.month.split('-').map((v) => Number(v));
    const [bm, by] = b.month.split('-').map((v) => Number(v));
    return new Date(ay, am - 1).getTime() - new Date(by, bm - 1).getTime();
  });

  const labels = sorted.map((s) => s.month);
  const data = sorted.map((s) => s.total);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ganhos ao longo do tempo</Text>
      <LineChart
        data={{ labels, datasets: [{ data }] }}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
          labelColor: () => '#666',
          decimalPlaces: 2,
        }}
        style={{ borderRadius: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
});

export default EarningsChart;
