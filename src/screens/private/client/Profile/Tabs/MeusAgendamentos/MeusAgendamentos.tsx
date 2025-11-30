import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, ScrollView, useWindowDimensions } from 'react-native';
import { useAppointmentStore } from '@stores/Appointment';
import { useFavoriteStore } from '@stores/Favorite';
import { useColors } from '@theme/ThemeProvider';
import { AppointmentDetailsModal } from '@components/features/AppointmentDetailsModal';
import { RateServiceModal } from '@components/features/RateServiceModal';
import { Appointment, AppointmentStatus } from '@stores/Appointment/types';
import { AppointmentCard } from '@components/features/AppointmentCard';
import { FontAwesome } from '@expo/vector-icons';

function MeusAgendamentos() {
  const { appointments, appointmentsByStatus, fetchAppointments } =
    useAppointmentStore();
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
        color={colors.textTertiary}
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

      {appointmentStatusRenderOrder.map((status) => {
        const renderInfo = appointmentStatusRenderInfo(colors)[status];
        const appointmentInfo = appointmentsByStatus[status] || [];

        return (
          <View key={status} style={styles.section}>
            <View
              style={[
                styles.sectionHeader,
                { backgroundColor: renderInfo.color },
              ]}>
              <FontAwesome
                name={renderInfo.icon}
                size={18}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.sectionTitle}>{renderInfo.label}</Text>
            </View>

            {appointmentInfo.length === 0 ? (
              <EmptyState text={renderInfo.emptyText} />
            ) : (
              <View style={styles.grid}>
                {appointmentInfo.map((apt) => (
                  <View
                    key={apt.id}
                    style={[styles.gridItem, isDesktop && { width: '48%' }]}>
                    <AppointmentCard
                      statusLabel={renderInfo.label}
                      statusColor={renderInfo.color}
                      appointment={apt}
                      statusVariant={status}
                      isFavorite={isFavorite(apt.Professional.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onOpenDetails={() => {
                        setSelectedAppointment(apt);
                        setIsModalVisible(true);
                      }}
                      onOpenRate={
                        status === AppointmentStatus.COMPLETED
                          ? () => {
                              setAppointmentToRate(apt);
                              setIsRateModalVisible(true);
                            }
                          : undefined
                      }
                    />
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}

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

export default MeusAgendamentos;
