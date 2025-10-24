import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelText?: string;
  confirmText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
  cancelText = 'Cancelar',
  confirmText = 'Confirmar',
}) => {
  return (
    <Modal animationType="fade" visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}>
              <Text style={[styles.buttonText, styles.cancelButtonText]}>
                {cancelText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}>
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
