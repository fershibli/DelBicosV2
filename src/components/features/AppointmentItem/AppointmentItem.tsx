import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { Appointment } from '@stores/Appointment/types';
import { useAppointmentStore } from '@stores/Appointment';
import { styles, getStatusStyle } from './styles';

const ReviewAppointment = ({
  appointment,
  onClose,
  onSuccess,
}: {
  appointment: Appointment;
  onClose: () => void;
  onSuccess?: () => void;
}) => {
  const [rating, setRating] = useState(appointment.rating ?? 0);
  const [review, setReview] = useState(appointment.review ?? '');
  const { reviewAppointment } = useAppointmentStore();

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert(
        'Atenção',
        'Por favor, selecione uma avaliação com estrelas.',
      );
      return;
    }

    const success = await reviewAppointment(appointment.id, rating, review);
    if (success) {
      const message = appointment.rating
        ? 'Sua avaliação foi modificada com sucesso!'
        : 'Sua avaliação foi enviada!';
      Alert.alert('Sucesso', message);
      onClose();
      if (onSuccess) onSuccess();
    } else {
      Alert.alert('Erro', 'Não foi possível enviar sua avaliação.');
    }
  };

  const isModifying =
    appointment.rating !== undefined &&
    appointment.rating !== null &&
    appointment.rating > 0;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>
          {isModifying ? 'Modificar Avaliação' : 'Avaliar Serviço'}
        </Text>
        <Rating
          startingValue={rating}
          onFinishRating={(value: number) => setRating(value)}
          style={styles.ratingComponent}
          imageSize={30}
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
          <TouchableOpacity style={styles.modalCancelButton} onPress={onClose}>
            <Text style={styles.modalCancelText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isModifying ? 'Modificar' : 'Enviar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const AppointmentItem: React.FC<{ appointment: Appointment }> = ({
  appointment,
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const {
    Professional: professional,
    Service: service,
    status,
    start_time,
  } = appointment;
  const statusInfo = getStatusStyle(status);

  const formatDateTime = () => {
    if (!start_time) return '';
    const dateObj = new Date(start_time);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString().slice(-2);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const weekDay = weekDays[dateObj.getDay()];

    return `${weekDay}, ${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancelar Agendamento',
      'Tem certeza que deseja cancelar este agendamento?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Info',
              'Funcionalidade de cancelamento em desenvolvimento',
            );
          },
        },
      ],
    );
  };

  // Apenas 4 imagens que se revezam
  const getPlaceholderImage = () => {
    const images = [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=600&fit=crop', // Eletricista
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop', // Manicure
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&h=600&fit=crop', // Limpeza/Diarista
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=600&fit=crop', // Evento/Grupo
    ];

    const index = appointment.id % images.length;
    return images[index];
  };

  const imageUrl = service.banner_uri || getPlaceholderImage();

  return (
    <>
      <View style={styles.card}>
        <View style={styles.content}>
          {/* Topo - Imagem do Banner */}
          <View style={styles.rightSection}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.serviceImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay} />
            <TouchableOpacity style={styles.viewProfileBadge}>
              <Text style={styles.viewProfileText}>Ver Perfil</Text>
            </TouchableOpacity>
          </View>

          {/* Parte Inferior - Informações */}
          <View style={styles.leftSection}>
            <View style={styles.topInfo}>
              <Text style={styles.professionalName}>
                {professional.User.name}
              </Text>
              <Text style={styles.serviceInfo}>
                {service.Subcategory?.name} ★★★★★ (4.8)
              </Text>
              <Text style={styles.serviceName}>{service.title}</Text>
              <Text style={styles.dateTime}>{formatDateTime()}</Text>
            </View>

            {/* Status Badge */}
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: statusInfo.backgroundColor },
              ]}>
              <Text style={styles.statusText}>{statusInfo.text}</Text>
            </View>

            {/* Mostrar avaliação se já foi avaliado */}
            {status === 'completed' && appointment.rating && (
              <View style={styles.reviewSection}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewLabel}>Sua Avaliação:</Text>
                  <View style={styles.reviewStarsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesome
                        key={star}
                        name={
                          star <= (appointment.rating || 0) ? 'star' : 'star-o'
                        }
                        size={14}
                        color={
                          star <= (appointment.rating || 0)
                            ? '#FFC107'
                            : '#D1D1D1'
                        }
                        style={{ marginRight: 2 }}
                      />
                    ))}
                  </View>
                </View>
                {appointment.review && (
                  <Text style={styles.reviewComment}>{appointment.review}</Text>
                )}
              </View>
            )}

            {/* Botões de Ação */}
            <View style={styles.buttonsContainer}>
              {status === 'pending' && (
                <>
                  <TouchableOpacity
                    style={[styles.button, styles.detailsButton]}>
                    <Text style={styles.buttonText}>Detalhes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </>
              )}

              {status === 'confirmed' && (
                <>
                  <TouchableOpacity
                    style={[styles.button, styles.detailsButton]}>
                    <Text style={styles.buttonText}>Detalhes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.modifyButton]}
                    onPress={handleCancel}>
                    <Text style={styles.buttonText}>Modificar</Text>
                  </TouchableOpacity>
                </>
              )}

              {status === 'completed' && (
                <>
                  <TouchableOpacity
                    style={[styles.button, styles.detailsButton]}>
                    <Text style={styles.buttonText}>Detalhes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.rateButton]}
                    onPress={() => setIsReviewModalOpen(true)}>
                    <Text style={styles.buttonText}>Avaliar</Text>
                  </TouchableOpacity>
                </>
              )}

              {status === 'canceled' && (
                <>
                  <TouchableOpacity
                    style={[styles.button, styles.detailsButton]}>
                    <Text style={styles.buttonText}>Detalhes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    disabled={true}>
                    <Text style={styles.buttonText}>Cancelado</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
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
          onSuccess={() => {
            setIsReviewModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default AppointmentItem;
