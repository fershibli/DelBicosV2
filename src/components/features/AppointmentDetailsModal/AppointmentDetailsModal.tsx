import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useColors } from '@theme/ThemeProvider';
import { Appointment } from '@stores/Appointment/types';
import { createStyles } from './styles';

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
  const styles = createStyles(colors);

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
        return colors.warningText;
      case 'confirmed':
        return colors.successText;
      case 'completed':
        return colors.primaryBlue;
      case 'canceled':
        return colors.errorText;
      default:
        return colors.textSecondary;
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
