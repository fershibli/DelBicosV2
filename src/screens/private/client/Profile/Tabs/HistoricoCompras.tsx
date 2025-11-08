import { View, Platform, Alert, StyleSheet, Text } from 'react-native';
import { Button } from '@components/ui/Button';
import { useAppointmentStore } from '@stores/Appointment';
import {
  generateCSV,
  generateFileURI,
  generateXLSX,
} from '@lib/helpers/fileGenerator';
import { downloadFile, shareContent } from '@lib/helpers/shareHelperSimple';
import colors from '@theme/colors';

export default function HistoricoCompras() {
  const { fetchAppointmentsAsSheet } = useAppointmentStore();

  const handleDownloadCSV = async () => {
    const rows = await fetchAppointmentsAsSheet();
    if (rows.length === 0) {
      Alert.alert('Atenção', 'Nenhum dado para exportar');
      return;
    }

    const csvData = [Object.keys(rows[0]), ...rows.map(Object.values)];

    const content = await generateCSV(csvData);

    if (!content) {
      Alert.alert('Erro', 'Não foi possível gerar o arquivo CSV.');
      return;
    }

    const uri = await generateFileURI(
      content,
      'relatorio_completo.csv',
      'text/csv',
    );

    if (!uri) {
      Alert.alert('Erro', 'Não foi possível gerar o arquivo CSV.');
      return;
    }

    const shareSuccess = await shareContent(uri);
    if (!shareSuccess) {
      if (Platform.OS === 'web') {
        await downloadFile(uri, 'relatorio_completo.csv');
      } else {
        Alert.alert('Erro', 'Não foi possível compartilhar o arquivo CSV.');
      }
    }
  };

  const handleDownloadExcel = async () => {
    const rows = await fetchAppointmentsAsSheet();
    if (rows.length === 0) {
      Alert.alert('Atenção', 'Nenhum dado para exportar');
      return;
    }

    const sheetData = [Object.keys(rows[0]), ...rows.map(Object.values)];

    if (!sheetData) {
      Alert.alert('Erro', 'Não foi possível gerar o arquivo Excel.');
      return;
    }

    const content = await generateXLSX([
      { title: 'Relatório Completo', sheetData },
    ]);

    if (!content) {
      Alert.alert('Erro', 'Não foi possível gerar o arquivo Excel.');
      return;
    }

    const uri = await generateFileURI(
      content,
      'relatorio_completo.xlsx',
      'application/octet-stream',
    );

    if (!uri) {
      Alert.alert('Erro', 'Não foi possível gerar o arquivo Excel.');
      return;
    }

    const shareSuccess = await shareContent(uri);
    if (!shareSuccess) {
      if (Platform.OS === 'web') {
        await downloadFile(uri, 'relatorio_completo.xlsx');
      } else {
        Alert.alert('Erro', 'Não foi possível compartilhar o arquivo Excel.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Historico de Pagamentos</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={handleDownloadCSV}>Exportar CSV</Button>
        <Button onPress={handleDownloadExcel}>Exportar Excel</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primaryBlack,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  container: { display: 'flex', gap: 16, margin: 20 },
  buttonContainer: { flexDirection: 'row', gap: 10 },
});
