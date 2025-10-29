import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings'; // Usando a versão nativa
import { Appointment } from '@stores/Appointment/types';
import { useAppointmentStore } from '@stores/Appointment';
import { styles, getStatusStyle } from './styles';
import { HTTP_DOMAIN } from '@config/varEnvs';
import { useUserStore } from '@stores/User';

// Componente do Modal de Avaliação (agora nativo)
const ReviewAppointment = ({
  appointment,
  onClose,
}: {
  appointment: Appointment;
  onClose: () => void;
}) => {
  const [rating, setRating] = useState(appointment.rating ?? 0);
  const [review, setReview] = useState(appointment.review ?? '');
  const { reviewAppointment } = useAppointmentStore();

  const handleSubmit = async () => {
    const success = await reviewAppointment(appointment.id, rating, review);
    if (success) {
      Alert.alert('Sucesso', 'Sua avaliação foi enviada!');
      onClose();
    } else {
      Alert.alert('Erro', 'Não foi possível enviar sua avaliação.');
    }
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Avaliar Serviço</Text>
        <Rating
          startingValue={rating}
          onFinishRating={(value: number) => setRating(value)}
          style={styles.ratingComponent}
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Deixe um comentário..."
          multiline
          numberOfLines={4}
          value={review}
          onChangeText={(text: string) => setReview(text)}
        />
        <View style={styles.modalActions}>
          <TouchableOpacity onPress={onClose}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.modalButton]}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Componente Principal do Card de Agendamento
const AppointmentItem: React.FC<{ appointment: Appointment }> = ({
  appointment,
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const {
    Professional: professional,
    Service: service,
    status,
    rating,
  } = appointment;
  const statusInfo = getStatusStyle(status);
  const { user } = useUserStore();

  const renderStars = () => {
    const stars = [];
    const totalStars = 5;
    const filledStars = rating || 0;

    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= filledStars ? 'star' : 'star-o'}
          size={16}
          color={i <= filledStars ? '#FFC107' : '#D1D1D1'}
          style={styles.starIcon}
        />,
      );
    }
    return stars;
  };

  const handleViewReceipt = async () => {
    if (!user) {
      Alert.alert('Erro', 'Você precisa estar logado para ver um recibo.');
      return;
    }

    try {
      // 6. Chama o novo endpoint que testamos
      // GET /api/appointments/:id/receipt?userId=...
      const response = await fetch(
        `${HTTP_DOMAIN}/api/appointments/${appointment.id}/receipt?userId=${user.id}`,
        {
          method: 'GET',
          // (Se você REATIVAR o authMiddleware, adicione o header 'Authorization' aqui)
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Não foi possível buscar o recibo.');
      }

      // 7. Abre a URL do recibo em uma nova aba
      if (Platform.OS === 'web') {
        window.open(data.receiptUrl, '_blank');
      } else {
        // Tenta abrir no navegador padrão do celular
        Linking.openURL(data.receiptUrl);
      }
    } catch (error: any) {
      Alert.alert('Erro ao buscar recibo', error.message);
    }
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.professionalName}>{professional.User.name}</Text>
          <Text style={styles.serviceCategory}>
            {service.Subcategory?.name}
          </Text>
          <Text style={styles.serviceName}>{service.title}</Text>

          <View style={styles.ratingContainer}>{renderStars()}</View>

          <Text style={[styles.statusText, { color: statusInfo.color }]}>
            {statusInfo.text}
          </Text>

          {(appointment.status === 'completed' ||
            appointment.status === 'canceled') &&
            appointment.payment_intent_id && (
              <TouchableOpacity
                style={[styles.button, styles.receiptButton]} // Estilo azul
                onPress={handleViewReceipt}>
                <Text style={styles.buttonText}>Ver Recibo</Text>
              </TouchableOpacity>
            )}
          {appointment.status === 'completed' && !appointment.rating && (
            <TouchableOpacity
              style={styles.button} // Botão verde (ou azul escuro padrão)
              onPress={() => setIsReviewModalOpen(true)}>
              <Text style={styles.buttonText}>Avaliar</Text>
            </TouchableOpacity>
          )}
          {(appointment.status === 'pending' ||
            appointment.status === 'confirmed') && (
            <TouchableOpacity
              style={[styles.button, styles.detailsButton]} // Estilo cinza/desabilitado
              disabled={true} // Opcional
            >
              <Text style={styles.buttonText}>Ver Detalhes</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Modal
        visible={isReviewModalOpen}
        animationType="fade"
        onRequestClose={() => setIsReviewModalOpen(false)}
        transparent>
        <ReviewAppointment
          appointment={appointment}
          onClose={() => setIsReviewModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default AppointmentItem;
