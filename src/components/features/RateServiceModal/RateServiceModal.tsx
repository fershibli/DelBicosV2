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
  existingRating?: number | null;
  existingReview?: string | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function RateServiceModal({
  visible,
  appointmentId,
  professionalName,
  serviceTitle,
  existingRating,
  existingReview,
  onClose,
  onSuccess,
}: RateServiceModalProps) {
  const colors = useColors();
  const styles = createStyles(colors);
  const { reviewAppointment } = useAppointmentStore();

  const [rating, setRating] = useState(existingRating || 5);
  const [review, setReview] = useState(existingReview || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert(
        'Atenção',
        'Por favor, selecione uma nota de 1 a 5 estrelas.',
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await reviewAppointment(appointmentId, rating, review);

      if (success) {
        setShowSuccessModal(true);
      } else {
        Alert.alert(
          'Erro',
          'Não foi possível registrar sua avaliação. Tente novamente.',
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

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setRating(5);
    setReview('');
    onSuccess?.();
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
          <Text style={styles.title}>
            {existingRating
              ? 'Editar sua avaliação'
              : 'Como foi sua experiência?'}
          </Text>

          <View style={styles.infoContainer}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={50}
              startingValue={rating}
              onFinishRating={setRating}
              tintColor={colors.primaryWhite}
              style={styles.rating}
            />
            <Text style={styles.ratingSubtext}>Ótimo! 5 estrelas!</Text>
          </View>

          <View style={styles.commentSection}>
            <TextInput
              style={styles.textInput}
              placeholder="Fale sobre sua avaliação!"
              placeholderTextColor={colors.textTertiary}
              multiline
              numberOfLines={5}
              value={review}
              onChangeText={setReview}
              maxLength={500}
              textAlignVertical="top"
            />
            <Text style={styles.charCounter}>{review.length}/500</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator color={colors.primaryWhite} />
            ) : (
              <Text style={styles.submitButtonText}>Enviar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de Sucesso */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={handleSuccessClose}>
        <View style={styles.overlay}>
          <View style={styles.successModal}>
            <Text style={styles.successTitle}>
              {existingRating
                ? 'Avaliação atualizada!'
                : 'Obrigado pela sua avaliação!'}
            </Text>
            <Text style={styles.successMessage}>
              {existingRating
                ? 'Sua avaliação foi atualizada com sucesso!'
                : 'Ela vai ajudar as outras pessoas a encontrarem ótimos profissionais!'}
            </Text>
            <TouchableOpacity
              style={styles.successButton}
              onPress={handleSuccessClose}>
              <Text style={styles.successButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 32,
      width: '100%',
      maxWidth: 500,
      shadowColor: colors.primaryBlack,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.primaryBlack,
      marginBottom: 32,
      textAlign: 'center',
    },
    infoContainer: {
      marginBottom: 12,
    },
    ratingSection: {
      alignItems: 'center',
      marginBottom: 24,
    },
    rating: {
      marginBottom: 16,
    },
    ratingSubtext: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primaryBlack,
    },
    commentSection: {
      marginBottom: 24,
    },
    textInput: {
      borderWidth: 1,
      borderColor: colors.borderColor,
      borderRadius: 8,
      padding: 16,
      fontSize: 14,
      color: colors.primaryBlack,
      minHeight: 120,
      backgroundColor: colors.secondaryGray,
    },
    submitButton: {
      backgroundColor: colors.primaryBlue,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitButtonDisabled: {
      opacity: 0.6,
    },
    submitButtonText: {
      color: colors.primaryWhite,
      fontSize: 16,
      fontWeight: '600',
    },
    charCounter: {
      fontSize: 12,
      color: colors.textTertiary,
      textAlign: 'right',
      marginTop: 4,
    },
    successModal: {
      backgroundColor: colors.primaryBlue,
      borderRadius: 16,
      padding: 32,
      width: '100%',
      maxWidth: 450,
      alignItems: 'center',
    },
    successTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.primaryWhite,
      textAlign: 'center',
      marginBottom: 16,
    },
    successMessage: {
      fontSize: 16,
      color: colors.primaryWhite,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 24,
    },
    successButton: {
      backgroundColor: colors.primaryOrange,
      paddingHorizontal: 48,
      paddingVertical: 12,
      borderRadius: 24,
    },
    successButtonText: {
      color: colors.primaryWhite,
      fontSize: 16,
      fontWeight: '600',
    },
  });
