import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

type StatusType = 'Agendado' | 'Executado' | 'Cancelado';

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
    'Agendado': {
      backgroundColor: '#FFE092',
      borderColor: '#FC8200',
      textColor: '#000000',
      message: 'Serviço Agendado'
    },
    'Executado': {
      backgroundColor: '#22843B',
      borderColor: '#22843B',
      textColor: '#FFFFFF',
      message: 'Serviço Executado'
    },
    'Cancelado': {
      backgroundColor: '#F8D7DA',
      borderColor: '#DC3545',
      textColor: '#721C24',
      message: 'Serviço Cancelado'
    }
  };

  const currentStatus = statusConfig[status];

  return (
    <View style={styles.successContainer}>
      <View style={[
        styles.successBanner, 
        { 
          backgroundColor: currentStatus.backgroundColor,
          borderColor: currentStatus.borderColor
        }
      ]}>
        <Text style={[styles.successText, { color: currentStatus.textColor }]}>
          {currentStatus.message}
        </Text>
      </View>
      {status === 'Agendado' && (
        <TouchableOpacity style={styles.reminderButton}>
          <Text style={styles.reminderText}>Criar lembrete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BannerStatus;