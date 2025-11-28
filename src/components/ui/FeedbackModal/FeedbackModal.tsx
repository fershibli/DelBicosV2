import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { useColors } from '@theme/ThemeProvider';

type FeedbackType = 'success' | 'error' | 'info';

interface FeedbackModalProps {
  visible: boolean;
  type?: FeedbackType;
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  visible,
  type = 'info',
  title,
  message,
  buttonText = 'OK',
  onClose,
}) => {
  const colors = useColors();

  const getConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: 'check-circle',
          color: colors.primaryGreen || '#2E7D32',
        };
      case 'error':
        return {
          icon: 'times-circle',
          color: colors.notification?.unreadBorder || '#D32F2F',
        };
      default:
        return { icon: 'info-circle', color: colors.primaryBlue };
    }
  };

  const config = getConfig();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Ícone no topo */}
          <View style={styles.iconContainer}>
            <FontAwesome
              name={config.icon as any}
              size={64}
              color={config.color}
            />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: config.color }]}
            onPress={onClose}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
