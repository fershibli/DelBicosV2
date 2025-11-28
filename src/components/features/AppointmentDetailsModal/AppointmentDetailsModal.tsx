import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useColors } from '@theme/ThemeProvider';
import { Appointment } from '@stores/Appointment/types';

interface AppointmentDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onCancel?: () => void;
}

export function AppointmentDetailsModal({
  visible,
  onClose,
  appointment,
  onCancel,
}: AppointmentDetailsModalProps) {
  const colors = useColors();

  if (!appointment) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCancelAppointment = () => {
    Alert.alert(
      'Cancelar Agendamento',
      'Tem certeza que deseja cancelar este agendamento?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim, Cancelar',
          style: 'destructive',
          onPress: () => {
            if (onCancel) {
              onCancel();
            }
            onClose();
          },
        },
      ],
    );
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'confirmed':
        return 'Confirmado pelo prestador';
      case 'completed':
        return 'Concluído';
      case 'canceled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'confirmed':
        return '#10b981';
      case 'completed':
        return '#3b82f6';
      case 'canceled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: colors.primaryWhite },
          ]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header com foto do profissional */}
            <View style={styles.header}>
              <Image
                source={{
                  uri:
                    appointment.Professional?.User?.avatar_uri ||
                    'https://via.placeholder.com/80',
                }}
                style={styles.professionalImage}
              />
              <View style={styles.headerInfo}>
                <Text style={styles.professionalName}>
                  {appointment.Professional?.User?.name || 'Profissional'}
                  <Text style={styles.superscript}> *</Text>
                </Text>
                <Text style={styles.dateText}>
                  {appointment.Service?.Subcategory?.name || 'Serviço'}
                </Text>
              </View>
            </View>

            {/* Título da seção */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Detalhes do Agendamento</Text>
            </View>

            {/* Informações do agendamento */}
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Profissional:</Text>
                <Text style={styles.infoValue}>
                  {appointment.Professional?.User?.name || 'N/A'}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Data:</Text>
                <Text style={styles.infoValue}>
                  {formatDate(appointment.start_time)}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Horário:</Text>
                <Text style={styles.infoValue}>
                  {formatTime(appointment.start_time)}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Serviço:</Text>
                <Text style={styles.infoValue}>
                  {appointment.Service?.title || 'N/A'}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Categoria:</Text>
                <Text style={styles.infoValue}>
                  {appointment.Service?.Subcategory?.name || 'N/A'}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Status:</Text>
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(appointment.status) },
                  ]}>
                  {getStatusText(appointment.status)}
                </Text>
              </View>
            </View>

            {/* Botões de ação */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.okButton}
                onPress={onClose}
                activeOpacity={0.8}>
                <Text style={styles.okButtonText}>Ok</Text>
              </TouchableOpacity>

              {appointment.status !== 'completed' &&
                appointment.status !== 'canceled' && (
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancelAppointment}
                    activeOpacity={0.8}>
                    <Text style={styles.cancelButtonText}>
                      Cancelar Agendamento
                    </Text>
                  </TouchableOpacity>
                )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 500,
    borderRadius: 12,
    padding: 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  professionalImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    backgroundColor: '#f3f4f6',
  },
  headerInfo: {
    flex: 1,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  superscript: {
    fontSize: 14,
    color: '#f97316',
  },
  dateText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f97316',
    marginBottom: 12,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoRow: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    gap: 12,
  },
  okButton: {
    backgroundColor: '#f97316',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  okButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  cancelButtonText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
  },
});
