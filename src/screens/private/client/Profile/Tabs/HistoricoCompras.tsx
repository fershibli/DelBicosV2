import React, { useState, useEffect } from 'react';
import {
  View,
  Platform,
  Alert,
  StyleSheet,
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
import { ExportCard } from './ExportCard';

const HistoryRow = ({ date, service, price, status, colors }: any) => (
  <View style={[styles.row, { borderBottomColor: '#F0F0F0' }]}>
    <View style={styles.rowLeft}>
      <View
        style={[
          styles.iconBox,
          { backgroundColor: status === 'completed' ? '#E8F5E9' : '#FFF3E0' },
        ]}>
        <FontAwesome
          name={status === 'completed' ? 'check' : 'clock-o'}
          size={12}
          color={status === 'completed' ? '#2E7D32' : '#E65100'}
        />
      </View>
      <View>
        <Text style={[styles.serviceText, { color: colors.primaryBlack }]}>
          {service}
        </Text>
        <Text style={[styles.dateText, { color: colors.textTertiary }]}>
          {date}
        </Text>
      </View>
    </View>
    <Text style={[styles.priceText, { color: colors.primaryBlack }]}>
      {price ? `R$ ${price.toFixed(2)}` : '-'}
    </Text>
  </View>
);

export default function HistoricoCompras() {
  const { fetchAppointmentsAsSheet, appointments, fetchAppointments } =
    useAppointmentStore();
  const colors = useColors();

  const [isExporting, setIsExporting] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  useEffect(() => {
    if (appointments.length === 0) fetchAppointments();
  }, [appointments, fetchAppointments]);

  const recentHistory = appointments
    .filter((a) => a.status === 'completed')
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
    <ScrollView style={[styles.container, { backgroundColor: 'transparent' }]}>
      <Text style={[styles.pageTitle, { color: colors.primaryBlack }]}>
        Histórico e Relatórios
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Visualize suas últimas transações e exporte o relatório completo.
      </Text>

      <View style={styles.contentWrapper}>
        {/* Seção de Prévia */}
        <View
          style={[
            styles.section,
            {
              backgroundColor: colors.primaryWhite,
              borderWidth: 1,
              borderColor: '#F0F0F0',
              shadowOpacity: 0,
            },
          ]}>
          <Text style={[styles.sectionTitle, { color: colors.primaryBlack }]}>
            Últimas Atividades
          </Text>
          {recentHistory.length > 0 ? (
            recentHistory.map((item) => (
              <HistoryRow
                key={item.id}
                service={item.Service.title}
                date={new Date(item.start_time).toLocaleDateString()}
                price={parseFloat(item.Service.price)}
                status={item.status}
                colors={colors}
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
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.primaryBlack, marginBottom: 16 },
            ]}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: 'Afacad-Bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Afacad-Regular',
    marginBottom: 24,
  },
  contentWrapper: {
    gap: 24,
    paddingBottom: 40,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      web: { boxShadow: '0px 4px 12px rgba(0,0,0,0.03)' },
      default: { elevation: 2 },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Afacad-Bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceText: {
    fontSize: 15,
    fontFamily: 'Afacad-SemiBold',
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Afacad-Regular',
  },
  priceText: {
    fontSize: 15,
    fontFamily: 'Afacad-Bold',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  exportSection: {
    marginTop: 8,
  },
  grid: {
    gap: 16,
  },
  gridItem: {
    width: '100%',
  },
});
