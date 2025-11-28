import React, { useEffect, useMemo, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useAppointmentStore } from '@stores/Appointment';
import { useFavoriteStore } from '@stores/Favorite';
import { useColors } from '@theme/ThemeProvider';
import { AppointmentDetailsModal } from '@components/features/AppointmentDetailsModal';
import { RateServiceModal } from '@components/features/RateServiceModal';
import { Appointment } from '@stores/Appointment/types';
import { AppointmentCard } from '@components/features/AppointmentCard';
import { FontAwesome } from '@expo/vector-icons';

function MeusAgendamentos() {
  const { appointments, fetchAppointments } = useAppointmentStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const colors = useColors();
  const styles = createStyles(colors);

  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRateModalVisible, setIsRateModalVisible] = useState(false);
  const [appointmentToRate, setAppointmentToRate] =
    useState<Appointment | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const proximosAgendamentos = useMemo(() => {
    return appointments
      .filter((apt) => apt.status === 'pending' || apt.status === 'confirmed')
      .sort(
        (a, b) =>
          new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
      );
  }, [appointments]);

  const agendamentosRealizados = useMemo(() => {
    return appointments
      .filter((apt) => apt.status === 'completed')
      .sort(
        (a, b) =>
          new Date(b.start_time).getTime() - new Date(a.start_time).getTime(),
      );
  }, [appointments]);

  const handleToggleFavorite = (appointment: Appointment) => {
    const professionalId = appointment.Professional.id;
    if (isFavorite(professionalId)) {
      removeFavorite(professionalId);
    } else {
      addFavorite({
        professionalId,
        professionalName: appointment.Professional.User.name,
        professionalAvatar:
          appointment.Professional.User.avatar_uri || undefined,
        category: appointment.Service.Subcategory?.name,
        serviceTitle: appointment.Service.title,
        addedAt: new Date().toISOString(),
      });
    }
  };

  const EmptyState = ({ text }: { text: string }) => (
    <View style={styles.emptyContainer}>
      <FontAwesome
        name="calendar-o"
        size={40}
        color={colors.secondaryBeige}
        style={{ marginBottom: 12 }}
      />
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.pageTitle}>Meus Agendamentos</Text>

      {/* Seção: Próximos */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <FontAwesome
            name="clock-o"
            size={18}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.sectionTitle}>Próximos Agendamentos</Text>
        </View>

        {proximosAgendamentos.length === 0 ? (
          <EmptyState text="Você não tem agendamentos futuros." />
        ) : (
          <View style={styles.grid}>
            {proximosAgendamentos.map((apt) => (
              <View
                key={apt.id}
                style={[styles.gridItem, isDesktop && { width: '48%' }]}>
                <AppointmentCard
                  appointment={apt}
                  statusVariant="upcoming"
                  isFavorite={isFavorite(apt.Professional.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onOpenDetails={() => {
                    setSelectedAppointment(apt);
                    setIsModalVisible(true);
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Seção: Histórico */}
      <View style={styles.section}>
        <View
          style={[
            styles.sectionHeader,
            { backgroundColor: colors.primaryGreen },
          ]}>
          <FontAwesome
            name="check-circle-o"
            size={18}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.sectionTitle}>Histórico</Text>
        </View>

        {agendamentosRealizados.length === 0 ? (
          <EmptyState text="Nenhum agendamento realizado ainda." />
        ) : (
          <View style={styles.grid}>
            {agendamentosRealizados.map((apt) => (
              <View
                key={apt.id}
                style={[styles.gridItem, isDesktop && { width: '48%' }]}>
                <AppointmentCard
                  appointment={apt}
                  statusVariant="completed"
                  isFavorite={isFavorite(apt.Professional.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onOpenDetails={() => {
                    setSelectedAppointment(apt);
                    setIsModalVisible(true);
                  }}
                  onOpenRate={() => {
                    setAppointmentToRate(apt);
                    setIsRateModalVisible(true);
                  }}
                />
              </View>
            ))}
          </View>
        )}
      </View>

      <AppointmentDetailsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        appointment={selectedAppointment}
        onCancel={() => fetchAppointments()}
      />

      {appointmentToRate && (
        <RateServiceModal
          visible={isRateModalVisible}
          appointmentId={appointmentToRate.id}
          professionalName={appointmentToRate.Professional.User.name}
          serviceTitle={appointmentToRate.Service.title}
          existingRating={appointmentToRate.rating}
          existingReview={appointmentToRate.review}
          onClose={() => setIsRateModalVisible(false)}
          onSuccess={() => fetchAppointments()}
        />
      )}
    </ScrollView>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    pageTitle: {
      fontSize: 28,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginBottom: 24,
    },
    section: {
      marginBottom: 32,
    },
    sectionHeader: {
      backgroundColor: colors.primaryBlue,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryWhite,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    },
    gridItem: {
      width: '100%',
    },
    emptyContainer: {
      padding: 32,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#F0F0F0',
      borderStyle: 'dashed',
    },
    emptyText: {
      fontSize: 16,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
    },
  });

export default MeusAgendamentos;
