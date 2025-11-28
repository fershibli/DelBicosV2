import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { FontAwesome } from '@expo/vector-icons';
import { useColors } from '@theme/ThemeProvider';
import { Appointment } from '@stores/Appointment/types';

interface AppointmentCardProps {
  appointment: Appointment;
  statusVariant: 'upcoming' | 'completed';
  isFavorite: boolean;
  onToggleFavorite: (apt: Appointment) => void;
  onOpenDetails: (apt: Appointment) => void;
  onOpenRate?: (apt: Appointment) => void;
}

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

  const imageUrl =
    appointment.Service.banner_uri || 'https://via.placeholder.com/400x200';
  const professionalAvatar =
    appointment.Professional.User.avatar_uri ||
    'https://via.placeholder.com/50';

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.cardImage}
          resizeMode="cover"
        />

        {/* Badge de Status */}
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

        {/* Botão Favorito (Apenas Completados) */}
        {statusVariant === 'completed' && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => onToggleFavorite(appointment)}>
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
                style={{ marginRight: 4 }}
              />
            </View>
          )}
        </View>

        <Text style={styles.serviceTitle} numberOfLines={1}>
          {appointment.Service.title}
        </Text>

        <View style={styles.dateRow}>
          <FontAwesome
            name="calendar"
            size={12}
            color={colors.textTertiary}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.dateText}>
            {formatDateTime(appointment.start_time)}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => onOpenDetails(appointment)}>
            <Text style={styles.btnTextPrimary}>Detalhes</Text>
          </TouchableOpacity>

          {statusVariant === 'completed' && onOpenRate && (
            <TouchableOpacity
              style={styles.rateButton}
              onPress={() => onOpenRate(appointment)}>
              <Text style={styles.btnTextSecondary}>Avaliar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.primaryWhite,
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#F0F0F0',
      ...Platform.select({
        web: { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
        default: { elevation: 2 },
      }),
    },
    imageContainer: {
      height: 120,
      position: 'relative',
    },
    cardImage: {
      width: '100%',
      height: '100%',
    },
    statusBadge: {
      position: 'absolute',
      top: 8,
      left: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    badgeCompleted: { backgroundColor: colors.primaryGreen },
    badgeUpcoming: { backgroundColor: colors.primaryBlue },
    statusText: {
      color: 'white',
      fontSize: 10,
      fontFamily: 'Afacad-Bold',
      textTransform: 'uppercase',
    },
    favoriteButton: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 16,
      padding: 6,
    },
    avatarContainer: {
      position: 'absolute',
      bottom: -20,
      left: 16,
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 3,
      borderColor: colors.primaryWhite,
      backgroundColor: colors.secondaryGray,
      overflow: 'hidden',
    },
    avatarImage: {
      width: '100%',
      height: '100%',
    },
    content: {
      padding: 16,
      paddingTop: 24,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    profName: {
      fontSize: 14,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      flex: 1,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    serviceTitle: {
      fontSize: 16,
      fontFamily: 'Afacad-SemiBold',
      color: colors.textSecondary,
      marginBottom: 8,
    },
    dateRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    dateText: {
      fontSize: 13,
      color: colors.textTertiary,
      fontFamily: 'Afacad-Regular',
    },
    actions: {
      flexDirection: 'row',
      gap: 8,
    },
    detailsButton: {
      flex: 1,
      backgroundColor: colors.primaryOrange,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    rateButton: {
      flex: 1,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primaryOrange,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    btnTextPrimary: {
      color: 'white',
      fontSize: 14,
      fontFamily: 'Afacad-Bold',
    },
    btnTextSecondary: {
      color: colors.primaryOrange,
      fontSize: 14,
      fontFamily: 'Afacad-Bold',
    },
  });
