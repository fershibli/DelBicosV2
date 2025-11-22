import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { useColors } from '@theme/ThemeProvider';
import { useAppointmentStore } from '@stores/Appointment';

interface RateServiceModalProps {
  visible: boolean;
  appointmentId: number;
  professionalName: string;
  serviceTitle: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export function RateServiceModal({
  visible,
  appointmentId,
  professionalName,
  serviceTitle,
  onClose,
  onSuccess,
}: RateServiceModalProps) {
  const colors = useColors();
  const styles = createStyles(colors);
  const { reviewAppointment } = useAppointmentStore();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Atenção', 'Por favor, selecione uma nota de 1 a 5 estrelas.');
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await reviewAppointment(appointmentId, rating, review);

      if (success) {
        Alert.alert(
          'Sucesso!',
          'Sua avaliação foi registrada com sucesso.',
          [
            {
              text: 'OK',
              onPress: () => {
                onSuccess?.();
                handleClose();
              },
            },
          ]
        );
      } else {
        Alert.alert(
          'Erro',
          'Não foi possível registrar sua avaliação. Tente novamente.'
        );
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao enviar sua avaliação.');
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(5);
    setReview('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Avaliar Serviço</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Profissional:</Text>
            <Text style={styles.value}>{professionalName}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Serviço:</Text>
            <Text style={styles.value}>{serviceTitle}</Text>
          </View>

          <View style={styles.ratingSection}>
            <Text style={styles.ratingLabel}>Sua avaliação:</Text>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={40}
              startingValue={rating}
              onFinishRating={setRating}
              tintColor={colors.primaryWhite}
              style={styles.rating}
            />
            <Text style={styles.ratingText}>
              {rating === 5 && 'Excelente!'}
              {rating === 4 && 'Muito Bom!'}
              {rating === 3 && 'Bom'}
              {rating === 2 && 'Regular'}
              {rating === 1 && 'Ruim'}
            </Text>
          </View>

          <View style={styles.commentSection}>
            <Text style={styles.commentLabel}>
              Comentário (opcional):
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Conte-nos sobre sua experiência..."
              placeholderTextColor={colors.textGray}
              multiline
              numberOfLines={4}
              value={review}
              onChangeText={setReview}
              maxLength={500}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{review.length}/500</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
              disabled={isSubmitting}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.submitButton,
                isSubmitting && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator color={colors.primaryWhite} />
              ) : (
                <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContainer: {
      backgroundColor: colors.primaryWhite || '#fff',
      borderRadius: 16,
      padding: 24,
      width: '100%',
      maxWidth: 500,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.primaryBlack || '#000',
      marginBottom: 20,
      textAlign: 'center',
    },
    infoContainer: {
      marginBottom: 12,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textGray || '#666',
      marginBottom: 4,
    },
    value: {
      fontSize: 16,
      color: colors.primaryBlack || '#000',
    },
    ratingSection: {
      alignItems: 'center',
      marginVertical: 24,
      paddingVertical: 16,
      backgroundColor: colors.secondaryBeige || '#f9f9f9',
      borderRadius: 12,
    },
    ratingLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primaryBlack || '#000',
      marginBottom: 12,
    },
    rating: {
      marginVertical: 8,
    },
    ratingText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.primaryOrange || '#FF6B35',
      marginTop: 8,
    },
    commentSection: {
      marginBottom: 24,
    },
    commentLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primaryBlack || '#000',
      marginBottom: 8,
    },
    textInput: {
      borderWidth: 1,
      borderColor: colors.secondaryBeige || '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 14,
      color: colors.primaryBlack || '#000',
      minHeight: 100,
      backgroundColor: colors.primaryWhite || '#fff',
    },
    charCount: {
      fontSize: 12,
      color: colors.textGray || '#999',
      textAlign: 'right',
      marginTop: 4,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButton: {
      backgroundColor: colors.secondaryGray || '#f0f0f0',
    },
    cancelButtonText: {
      color: colors.primaryBlack || '#000',
      fontSize: 16,
      fontWeight: '600',
    },
    submitButton: {
      backgroundColor: colors.primaryOrange || '#FF6B35',
    },
    submitButtonDisabled: {
      opacity: 0.6,
    },
    submitButtonText: {
      color: colors.primaryWhite || '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
