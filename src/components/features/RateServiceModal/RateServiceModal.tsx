import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  Alert,
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

  const ratingConfig = useMemo(
    () => ({
      1: { label: 'Péssimo', color: colors.errorText },
      2: { label: 'Ruim', color: colors.primaryOrange },
      3: { label: 'Regular', color: '#FBC02D' },
      4: { label: 'Muito Bom', color: colors.primaryBlue },
      5: { label: 'Excelente!', color: colors.successText },
    }),
    [colors],
  );

  const currentRatingInfo =
    rating > 0 ? ratingConfig[rating as keyof typeof ratingConfig] : null;

  useEffect(() => {
    if (visible) {
      setRating(existingRating || 0);
      setReview(existingReview || '');
      setShowSuccessModal(false);
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
        Alert.alert(
          'Erro',
          'Não foi possível enviar sua avaliação. Tente novamente.',
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado.');
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Avaliar Serviço</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome name="close" size={24} color={colors.textTertiary} />
            </TouchableOpacity>
          </View>

          {/* Subtítulo dinâmico */}
          <Text style={styles.subtitle}>
            Como foi o serviço de{' '}
            <Text style={styles.highlightText}>{serviceTitle}</Text> com{' '}
            <Text style={styles.highlightText}>{professionalName}</Text>?
          </Text>

          {/* Componente de Estrelas */}
          <View style={styles.ratingContainer}>
            <Rating
              type="custom"
              ratingCount={5}
              imageSize={40}
              startingValue={rating}
              onFinishRating={setRating}
              ratingColor="#FFC107"
              ratingBackgroundColor={colors.textTertiary}
              tintColor={colors.cardBackground}
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

          {/* Área de Comentário */}
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
            />
            <Text style={styles.charCounter}>{review.length}/500</Text>
          </View>

          {/* Botão de Envio */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              (isSubmitting || rating === 0) && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting || rating === 0}>
            {isSubmitting ? (
              <ActivityIndicator color={colors.primaryWhite} />
            ) : (
              <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
            )}
          </TouchableOpacity>

          {/* Overlay de Sucesso (Interno ao Modal para manter contexto) */}
          {showSuccessModal && (
            <View style={styles.successOverlay}>
              <View style={styles.successCard}>
                <View style={styles.successIconContainer}>
                  <FontAwesome
                    name="check"
                    size={32}
                    color={colors.primaryWhite}
                  />
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
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
