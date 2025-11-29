import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { useColors } from '@theme/ThemeProvider';
import { useAppointmentStore } from '@stores/Appointment';
import { FontAwesome } from '@expo/vector-icons';
import { createStyles } from './styles';

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

  const [rating, setRating] = useState(existingRating || 0);
  const [review, setReview] = useState(existingReview || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const ratingData: Record<number, { label: string; color: string }> = {
    1: { label: 'Péssimo', color: '#D32F2F' },
    2: { label: 'Ruim', color: colors.primaryOrange },
    3: { label: 'Regular', color: '#FBC02D' },
    4: { label: 'Muito Bom', color: colors.primaryBlue },
    5: { label: 'Excelente!', color: colors.primaryGreen },
  };

  const currentRatingInfo = rating > 0 ? ratingData[rating] : null;

  useEffect(() => {
    if (visible) {
      setRating(existingRating || 0);
      setReview(existingReview || '');
    }
  }, [visible, existingRating, existingReview]);

  const handleSubmit = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      const success = await reviewAppointment(appointmentId, rating, review);
      if (success) {
        setShowSuccessModal(true);
      } else {
        alert('Erro ao enviar avaliação.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onSuccess?.();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Avaliar Serviço</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome name="close" size={20} color={colors.textTertiary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Como foi o serviço de{' '}
            <Text style={styles.highlightText}>{serviceTitle}</Text> com{' '}
            <Text style={styles.highlightText}>{professionalName}</Text>?
          </Text>

          <View style={styles.ratingContainer}>
            <Rating
              type="custom"
              ratingCount={5}
              imageSize={40}
              startingValue={rating}
              onFinishRating={setRating}
              ratingColor="#FFC107"
              ratingBackgroundColor="#d4d4d4"
              tintColor={colors.primaryWhite}
              style={styles.ratingComponent}
            />
            <Text
              style={[
                styles.ratingLabel,
                { color: currentRatingInfo?.color || colors.textTertiary },
              ]}>
              {currentRatingInfo?.label || 'Toque nas estrelas para avaliar'}
            </Text>
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Escreva um comentário (opcional)..."
              placeholderTextColor={colors.textTertiary}
              multiline
              numberOfLines={4}
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
              (isSubmitting || rating === 0) && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting || rating === 0}>
            {isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
            )}
          </TouchableOpacity>
        </View>

        {showSuccessModal && (
          <View style={[styles.overlay, styles.successOverlay]}>
            <View style={styles.successCard}>
              <View style={styles.successIconContainer}>
                <FontAwesome name="check" size={32} color="white" />
              </View>
              <Text style={styles.successTitle}>Avaliação Enviada!</Text>
              <Text style={styles.successMessage}>
                Obrigado por compartilhar sua experiência.
              </Text>
              <TouchableOpacity
                style={styles.successButton}
                onPress={handleSuccessClose}>
                <Text style={styles.successButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
}
