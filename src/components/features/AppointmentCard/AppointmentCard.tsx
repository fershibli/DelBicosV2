import React, { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';
import { FontAwesome } from '@expo/vector-icons';
import { useColors } from '@theme/ThemeProvider';
import { Appointment } from '@stores/Appointment/types';
import { createStyles } from './styles';

interface AppointmentCardProps {
  appointment: Appointment;
  statusVariant: 'upcoming' | 'completed';
  isFavorite: boolean;
  onToggleFavorite: (apt: Appointment) => void;
  onOpenDetails: (apt: Appointment) => void;
  onOpenRate?: (apt: Appointment) => void;
}

// Helper fora do componente
const formatDateTime = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  statusVariant,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  onOpenRate,
}) => {
  const colors = useColors();
  const styles = createStyles(colors);

  const imageUrl = useMemo(
    () =>
      appointment.Service.banner_uri || 'https://via.placeholder.com/400x200',
    [appointment.Service.banner_uri],
  );

  const professionalAvatar = useMemo(
    () =>
      appointment.Professional.User.avatar_uri ||
      'https://via.placeholder.com/100',
    [appointment.Professional.User.avatar_uri],
  );

  return (
    <View style={styles.card}>
      {/* Imagem de Capa e Badges */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.cardImage}
          resizeMode="cover"
        />

        <View
          style={[
            styles.statusBadge,
            statusVariant === 'completed'
              ? styles.badgeCompleted
              : styles.badgeUpcoming,
          ]}>
          <Text style={styles.statusText}>
            {statusVariant === 'completed' ? 'REALIZADO' : 'CONFIRMADO'}
          </Text>
        </View>

        {statusVariant === 'completed' && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => onToggleFavorite(appointment)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart-o'}
              size={20}
              color={isFavorite ? '#FF3B30' : '#FFF'}
            />
          </TouchableOpacity>
        )}

        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: professionalAvatar }}
            style={styles.avatarImage}
          />
        </View>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.profName} numberOfLines={1}>
            {appointment.Professional.User.name}
          </Text>
          {appointment.rating && (
            <View style={styles.ratingRow}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={12}
                readonly
                startingValue={appointment.rating}
                tintColor={colors.cardBackground} // Ajuste para Dark Mode
                style={{ marginRight: 4, backgroundColor: 'transparent' }}
              />
            </View>
          )}
        </View>

        <Text style={styles.serviceTitle} numberOfLines={1}>
          {appointment.Service.title}
        </Text>

        <View style={styles.dateRow}>
          <FontAwesome name="calendar" size={12} color={colors.textTertiary} />
          <Text style={styles.dateText}>
            {formatDateTime(appointment.start_time)}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => onOpenDetails(appointment)}
            activeOpacity={0.8}>
            <Text style={styles.btnTextPrimary}>Detalhes</Text>
          </TouchableOpacity>

          {statusVariant === 'completed' && onOpenRate && (
            <TouchableOpacity
              style={styles.rateButton}
              onPress={() => onOpenRate(appointment)}
              activeOpacity={0.8}>
              <Text style={styles.btnTextSecondary}>Avaliar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
