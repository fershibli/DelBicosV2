import React, { useState, useEffect } from 'react';
import {
  View,
  Platform,
  Alert,
  Text,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { EncodingType } from 'expo-file-system/legacy';
import { useAppointmentStore } from '@stores/Appointment';
import {
  generateCSV,
  generateFileURI,
  generateXLSX,
} from '@lib/helpers/fileGenerator';
import { downloadFile, shareContent } from '@lib/helpers/shareHelperSimple';
import { useColors } from '@theme/ThemeProvider';
import { FontAwesome } from '@expo/vector-icons';
import { createStyles } from './styles';
import { ExportCard } from '@screens/private/client/Profile/Tabs/ExportCard';

const HistoryRow = ({ date, service, price, status, colors, styles }: any) => {
  const isCompleted = status === 'completed';
  const bgColor = isCompleted
    ? colors.successBackground
    : colors.warningBackground;
  const iconColor = isCompleted ? colors.successText : colors.warningText;
  const iconName = isCompleted ? 'check' : 'clock-o';

  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
          <FontAwesome name={iconName} size={12} color={iconColor} />
        </View>
        <View>
          <Text style={styles.serviceText}>{service}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </View>
      <Text style={styles.priceText}>
        {price ? `R$ ${price.toFixed(2).replace('.', ',')}` : '-'}
      </Text>
    </View>
  );
};

export default function HistoricoCompras() {
  const { fetchAppointmentsAsSheet, appointments, fetchAppointments } =
    useAppointmentStore();
  const colors = useColors();
  const styles = createStyles(colors);

  const [isExporting, setIsExporting] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  useEffect(() => {
    if (appointments.length === 0) fetchAppointments();
  }, [appointments, fetchAppointments]);

  const recentHistory = appointments
    .filter((a) => a.status === 'completed' || a.status === 'confirmed')
    .sort(
      (a, b) =>
        new Date(b.start_time).getTime() - new Date(a.start_time).getTime(),
    )
    .slice(0, 5);

  const handleExport = async (type: 'csv' | 'xlsx') => {
    setIsExporting(true);
    try {
      const rows = await fetchAppointmentsAsSheet();
      if (rows.length === 0) {
        Alert.alert('Atenção', 'Nenhum dado para exportar');
        return;
      }

      let uri: string | null = null;
      const fileName = `historico_delbicos_${new Date().toISOString().split('T')[0]}`;

      if (type === 'csv') {
        const csvData = [Object.keys(rows[0]), ...rows.map(Object.values)];
        const content = await generateCSV(csvData);
        if (content)
          uri = await generateFileURI(content, `${fileName}.csv`, 'text/csv');
      } else {
        const sheetData = [Object.keys(rows[0]), ...rows.map(Object.values)];
        const content = await generateXLSX([{ title: 'Histórico', sheetData }]);
        if (content)
          uri = await generateFileURI(
            content,
            `${fileName}.xlsx`,
            'application/octet-stream',
            EncodingType.Base64,
          );
      }

      if (!uri) throw new Error('Falha ao gerar arquivo');

      const shareSuccess = await shareContent(uri);
      if (!shareSuccess && Platform.OS === 'web') {
        await downloadFile(uri, `${fileName}.${type}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível exportar o arquivo.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Histórico e Relatórios</Text>
      <Text style={styles.subtitle}>
        Visualize suas últimas transações e exporte o relatório completo.
      </Text>

      <View style={styles.contentWrapper}>
        {/* Seção de Prévia */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Últimas Atividades</Text>

          {recentHistory.length > 0 ? (
            recentHistory.map((item) => (
              <HistoryRow
                key={item.id}
                service={item.Service.title}
                date={new Date(item.start_time).toLocaleDateString()}
                price={parseFloat(item.Service.price)}
                status={item.status}
                colors={colors}
                styles={styles}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={{ color: colors.textTertiary }}>
                Nenhum histórico recente.
              </Text>
            </View>
          )}
        </View>

        {/* Seção de Exportação */}
        <View style={styles.exportSection}>
          <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>
            Exportar Relatório
          </Text>

          <View style={[styles.grid, isDesktop && { flexDirection: 'row' }]}>
            <View style={[styles.gridItem, isDesktop && { width: '48%' }]}>
              <ExportCard
                title="Arquivo Excel"
                description="Relatório completo formatado (.xlsx)"
                icon="file-excel-o"
                onPress={() => handleExport('xlsx')}
                isLoading={isExporting}
              />
            </View>
            <View style={[styles.gridItem, isDesktop && { width: '48%' }]}>
              <ExportCard
                title="Arquivo CSV"
                description="Dados brutos separados por vírgula (.csv)"
                icon="file-text-o"
                onPress={() => handleExport('csv')}
                isLoading={isExporting}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
