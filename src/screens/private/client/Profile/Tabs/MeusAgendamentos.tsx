import { useAppointmentStore } from '@stores/Appointment';
import React, { useEffect, useMemo } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useColors } from '@theme/ThemeProvider';
import { Rating } from 'react-native-ratings';

function MeusAgendamentos() {
  const { appointments, fetchAppointments } = useAppointmentStore();
  const colors = useColors();
  const styles = createStyles(colors);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Separar próximos e realizados
  const proximosAgendamentos = useMemo(() => {
    return appointments
      .filter((apt) => apt.status === 'pending' || apt.status === 'confirmed')
      .slice(0, 2); // Limitar a 2
  }, [appointments]);

  const agendamentosRealizados = useMemo(() => {
    return appointments
      .filter((apt) => apt.status === 'completed')
      .slice(0, 2); // Limitar a 2
  }, [appointments]);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const renderAppointmentCard = (appointment: any, status: 'upcoming' | 'completed') => {
    const imageUrl = appointment.Service.banner_uri || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400';
    const professionalAvatar = appointment.Professional.User.avatar_uri || 'https://via.placeholder.com/50';
    
    return (
      <View key={appointment.id} style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.cardImage} />
          {status === 'completed' && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeText}>REALIZADO</Text>
            </View>
          )}
          {status === 'upcoming' && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>Confirmado</Text>
            </View>
          )}
          <View style={styles.avatarContainer}>
            <Image source={{ uri: professionalAvatar }} style={styles.professionalAvatar} />
          </View>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.professionalName}>
              {appointment.Professional.User.name}
            </Text>
            <View style={styles.ratingRow}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={10}
                readonly
                startingValue={appointment.rating || 4.5}
                tintColor="#fff"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.subcategoryText}>
                {appointment.Service.Subcategory?.name || 'Serviços Gerais'}
              </Text>
            </View>
          </View>
          <Text style={styles.serviceTitle}>{appointment.Service.title}</Text>
          <Text style={styles.dateTime}>
            Qui, {formatDateTime(appointment.start_time)} - {formatTime(appointment.start_time)}
          </Text>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Detalhes</Text>
          </TouchableOpacity>
          {status === 'completed' && (
            <TouchableOpacity style={styles.reviewButton}>
              <Text style={styles.reviewButtonText}>Avaliar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Meus Agendamentos</Text>

      {/* Próximos Agendamentos */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Próximos Agendamentos</Text>
        </View>
        <View style={styles.grid}>
          {proximosAgendamentos.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum agendamento próximo</Text>
          ) : (
            proximosAgendamentos.map((apt) => renderAppointmentCard(apt, 'upcoming'))
          )}
        </View>
      </View>

      {/* Agendamentos Realizados */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Agendamentos Realizados</Text>
        </View>
        <View style={styles.grid}>
          {agendamentosRealizados.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum agendamento realizado</Text>
          ) : (
            agendamentosRealizados.map((apt) => renderAppointmentCard(apt, 'completed'))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primaryWhite,
      padding: 20,
    },
    pageTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.primaryBlack,
      marginBottom: 24,
    },
    section: {
      marginBottom: 32,
    },
    sectionHeader: {
      backgroundColor: colors.primaryOrange,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primaryWhite,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    },
    card: {
      width: '48%',
      backgroundColor: '#fff',
      borderRadius: 8,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: 1,
      borderColor: '#e5e7eb',
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: 140,
    },
    cardImage: {
      width: '100%',
      height: '100%',
      backgroundColor: '#f3f4f6',
    },
    completedBadge: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: '#10b981',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    completedBadgeText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: '700',
    },
    categoryBadge: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: '#3b82f6',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    categoryBadgeText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: '600',
    },
    avatarContainer: {
      position: 'absolute',
      bottom: -25,
      left: 12,
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 3,
      borderColor: '#fff',
      overflow: 'hidden',
      backgroundColor: '#fff',
    },
    professionalAvatar: {
      width: '100%',
      height: '100%',
    },
    cardContent: {
      padding: 12,
      paddingTop: 32,
    },
    cardHeader: {
      marginBottom: 6,
    },
    professionalName: {
      fontSize: 14,
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: 2,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    subcategoryText: {
      fontSize: 11,
      color: '#6b7280',
      fontWeight: '500',
    },
    serviceTitle: {
      fontSize: 13,
      color: '#374151',
      marginBottom: 6,
      fontWeight: '500',
    },
    dateTime: {
      fontSize: 12,
      color: '#6b7280',
      marginBottom: 12,
    },
    detailsButton: {
      backgroundColor: '#f97316',
      paddingVertical: 8,
      borderRadius: 6,
      alignItems: 'center',
      marginBottom: 6,
    },
    detailsButtonText: {
      color: '#fff',
      fontSize: 13,
      fontWeight: '600',
    },
    reviewButton: {
      backgroundColor: '#fff',
      paddingVertical: 8,
      borderRadius: 6,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#e5e7eb',
    },
    reviewButtonText: {
      color: '#374151',
      fontSize: 13,
      fontWeight: '600',
    },
    emptyText: {
      fontSize: 14,
      color: colors.textGray,
      textAlign: 'center',
      paddingVertical: 20,
    },
  });

export default MeusAgendamentos;
