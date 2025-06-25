import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from './styles';

type StatusType = 'pending' | 'confirmed' | 'completed' | 'canceled';

interface StatusConfig {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  message: string;
}

interface BannerStatusProps {
  status: StatusType;
}

const BannerStatus: React.FC<BannerStatusProps> = ({ status }) => {
  const statusConfig: Record<StatusType, StatusConfig> = {
    pending: {
      backgroundColor: '#FFF5E6',
      borderColor: '#FFA726',
      textColor: '#E65100',
      message: 'Aguardando aprovação',
    },
    confirmed: {
      backgroundColor: '#E3F2FD',
      borderColor: '#42A5F5',
      textColor: '#0D47A1',
      message: 'Serviço Agendado',
    },
    completed: {
      backgroundColor: '#E8F5E9',
      borderColor: '#66BB6A',
      textColor: '#1B5E20',
      message: 'Serviço Executado',
    },
    canceled: {
      backgroundColor: '#FFEBEE',
      borderColor: '#EF5350',
      textColor: '#C62828',
      message: 'Serviço Cancelado',
    },
  };

  const currentStatus = statusConfig[status] || {
    backgroundColor: '#F5F5F5',
    borderColor: '#9E9E9E',
    textColor: '#212121',
    message: 'Status Desconhecido',
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.statusBanner,
          {
            backgroundColor: currentStatus.backgroundColor,
            borderColor: currentStatus.borderColor,
            shadowColor: currentStatus.borderColor,
          },
        ]}>
        <Text style={[styles.statusText, { color: currentStatus.textColor }]}>
          {currentStatus.message}
        </Text>
      </View>
      {status === 'confirmed' && (
        <TouchableOpacity style={styles.reminderButton}>
          <Text style={styles.reminderText}>Criar lembrete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BannerStatus;
