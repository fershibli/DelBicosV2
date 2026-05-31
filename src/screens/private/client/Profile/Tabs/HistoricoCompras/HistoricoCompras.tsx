import React, { useState, useEffect } from 'react';
import {
  View,
  Platform,
  Alert,
  Text,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Modal,
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
import { RateServiceModal } from '@components/features/RateServiceModal';
import { Appointment } from '@stores/Appointment/types';
import { Picker } from '@react-native-picker/picker';

const getMonthName = (month: number) => {
  return new Date(2000, month - 1).toLocaleString('pt-BR', { month: 'long' });
};

const HistoryRow = ({ id, date, service, price, status, rating, colors, styles, onRate, onDetails }: any) => {
  const isCompleted = status === 'completed';
  const isCanceled = status === 'canceled';

  const bgColor = isCompleted
    ? colors.successBackground
    : colors.errorBackground;
  const iconColor = isCompleted ? colors.successText : colors.error;
  const iconName = isCompleted ? 'check' : 'times';

  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
          <FontAwesome name={iconName} size={12} color={iconColor} />
        </View>
        <View>
          <Text style={styles.serviceText}>{service}</Text>
          <Text style={styles.dateText}>{date}</Text>
          <View style={[styles.badgeContainer, { backgroundColor: isCompleted ? colors.successBackground : colors.errorBackground }]}>
             <Text style={[styles.badgeText, { color: isCompleted ? colors.successText : colors.error }]}>
               {isCompleted ? 'Concluído' : 'Cancelado'}
             </Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.priceText}>
          {price ? `R$ ${price.toFixed(2).replace('.', ',')}` : '-'}
        </Text>
        {isCompleted && (
          <TouchableOpacity style={styles.detailsButton} onPress={onDetails}>
            <Text style={styles.detailsButtonText}>Detalhes</Text>
          </TouchableOpacity>
        )}
        {isCompleted && rating == null && onRate && (
          <TouchableOpacity style={styles.rateButton} onPress={onRate}>
            <Text style={styles.rateButtonText}>Avaliar Serviço</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function HistoricoCompras({ role = 'client' }: { role?: 'client' | 'professional' } = {}) {
  const { fetchAppointmentsAsSheet, appointments, fetchAppointments } =
    useAppointmentStore();
  const colors = useColors();
  const styles = createStyles(colors);

  const [isExporting, setIsExporting] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [tempMonth, setTempMonth] = useState<number>(selectedMonth);
  const [tempYear, setTempYear] = useState<number>(selectedYear);
  
  const [isRateModalVisible, setIsRateModalVisible] = useState(false);
  const [appointmentToRate, setAppointmentToRate] = useState<Appointment | null>(null);

  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  useEffect(() => {
    fetchAppointments(role);
  }, [fetchAppointments, role]);

  const recentHistory = appointments
    .filter((a) => a.status === 'completed' || a.status === 'canceled')
    .filter((a) => {
      const date = new Date(a.start_time);
      return date.getMonth() + 1 === selectedMonth && date.getFullYear() === selectedYear;
    })
    .sort(
      (a, b) =>
        new Date(b.start_time).getTime() - new Date(a.start_time).getTime(),
    );

  const handleExport = async (type: 'csv' | 'xlsx') => {
    setIsExporting(true);
    try {
      const rows = await fetchAppointmentsAsSheet(role);
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
      <Text style={styles.pageTitle}>
        {role === 'professional' ? 'Histórico de Trabalhos' : 'Histórico e Relatórios'}
      </Text>
      <Text style={styles.subtitle}>
        {role === 'professional'
          ? 'Visualize os ganhos obtidos nos serviços realizados e exporte o relatório.'
          : 'Visualize suas últimas transações e exporte o relatório completo.'}
      </Text>

      <View style={styles.contentWrapper}>
        {/* Seção de Prévia */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Últimas Atividades</Text>

          <TouchableOpacity 
            style={styles.datePickerButton} 
            onPress={() => {
              setTempMonth(selectedMonth);
              setTempYear(selectedYear);
              setIsDatePickerVisible(true);
            }}>
            <FontAwesome name="calendar" size={16} color={colors.primaryBlue} />
            <Text style={styles.datePickerButtonText}>
              {getMonthName(selectedMonth).toUpperCase()} {selectedYear}
            </Text>
          </TouchableOpacity>

          {recentHistory.length > 0 ? (
            recentHistory.map((item) => (
              <HistoryRow
                key={item.id}
                id={item.id}
                service={item.Service.title}
                date={new Date(item.start_time).toLocaleDateString('pt-BR')}
                price={item.Service.price ? parseFloat(item.Service.price) : 0}
                status={item.status}
                rating={item.rating}
                colors={colors}
                styles={styles}
                onDetails={() => {
                   const dateObj = new Date(item.start_time);
                   const dataFormatada = dateObj.toLocaleDateString('pt-BR');
                   const horario = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                   const preco = item.Service.price ? `R$ ${parseFloat(item.Service.price).toFixed(2).replace('.', ',')}` : 'R$ 0,00';
                   const labelUsuario = role === 'professional' ? 'Cliente' : 'Profissional';
                   const nomeUsuario = role === 'professional'
                     ? item.Client?.User?.name
                     : item.Professional?.User?.name || 'Não informado';
                   
                   Alert.alert(
                     "Detalhes do Serviço", 
                     `Serviço: ${item.Service.title}\nData: ${dataFormatada}\nHorário: ${horario}\nPreço: ${preco}\n${labelUsuario}: ${nomeUsuario}`
                   );
                }}
                onRate={
                  role === 'client'
                    ? () => {
                        setAppointmentToRate(item);
                        setIsRateModalVisible(true);
                      }
                    : undefined
                }
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

      {appointmentToRate && (
        <RateServiceModal
          visible={isRateModalVisible}
          appointmentId={appointmentToRate.id}
          professionalName={appointmentToRate.Professional.User.name}
          serviceTitle={appointmentToRate.Service.title}
          existingRating={appointmentToRate.rating}
          existingReview={appointmentToRate.review}
          onClose={() => setIsRateModalVisible(false)}
          onSuccess={() => fetchAppointments()}
        />
      )}

      {/* Date Picker Modal */}
      <Modal visible={isDatePickerVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar Período</Text>
            
            <View style={styles.pickerContainer}>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={tempMonth}
                  onValueChange={(itemValue) => setTempMonth(itemValue as number)}>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                     <Picker.Item key={m} label={getMonthName(m)} value={m} color={colors.primaryBlack} />
                  ))}
                </Picker>
              </View>
              
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={tempYear}
                  onValueChange={(itemValue) => setTempYear(itemValue as number)}>
                  {[2024, 2025, 2026, 2027].map(y => (
                     <Picker.Item key={y} label={y.toString()} value={y} color={colors.primaryBlack} />
                  ))}
                </Picker>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={() => {
                setSelectedMonth(tempMonth);
                setSelectedYear(tempYear);
                setIsDatePickerVisible(false);
              }}>
              <Text style={styles.modalButtonText}>Aplicar Filtro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
