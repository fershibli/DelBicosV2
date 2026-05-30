import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { ReviewCard } from '@components/ui/ReviewCard';
import { RateServiceModal } from '@components/features/RateServiceModal';
import { useAppointmentStore } from '@stores/Appointment';
import { Appointment } from '@stores/Appointment/types';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';

interface AvaliacoesTabProps {
  role?: 'client' | 'professional';
}

const AvaliacoesTab: React.FC<AvaliacoesTabProps> = ({ role = 'client' }) => {
  const colors = useColors();
  const styles = createStyles(colors);
  const { appointments, fetchAppointments, loading } = useAppointmentStore();
  const { width } = useWindowDimensions();

  const isDesktop = width >= 768;

  const [isRateModalVisible, setIsRateModalVisible] = useState(false);
  const [appointmentToRate, setAppointmentToRate] = useState<Appointment | null>(null);

  useEffect(() => {
    fetchAppointments(role);
  }, [fetchAppointments, role]);

  const avaliacoesFeitas = useMemo(() => {
    return appointments
      .filter(
        (apt) =>
          apt.rating !== null && apt.rating !== undefined && apt.rating > 0,
      )
      .slice(0, 10);
  }, [appointments]);

  const formatarData = (dataString: string) => {
    if (!dataString) return '';
    const date = new Date(dataString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getTitleFromRating = (rating: number): string => {
    if (rating === 5) return 'Excelente!';
    if (rating === 4) return 'Muito Bom';
    if (rating === 3) return 'Bom';
    if (rating === 2) return 'Regular';
    return 'Ruim';
  };

  if (loading && avaliacoesFeitas.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryOrange} />
        <Text style={styles.loadingText}>Carregando avaliações...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>
        {role === 'professional' ? 'Avaliações Recebidas' : 'Minhas Avaliações'}
      </Text>

      {avaliacoesFeitas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {role === 'professional'
              ? 'Você ainda não recebeu nenhuma avaliação.'
              : 'Você ainda não fez nenhuma avaliação.'}
          </Text>
          <Text style={styles.emptySubtext}>
            {role === 'professional'
              ? 'As avaliações que seus clientes enviarem aparecerão aqui.'
              : 'Após concluir um serviço, avalie o profissional para que sua opinião apareça aqui.'}
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.gridContainer}>
            {avaliacoesFeitas.map((appointment) => (
              <View
                key={appointment.id}
                style={[styles.cardWrapper, isDesktop && { width: '48%' }]}>
                <ReviewCard
                  rating={appointment.rating || 0}
                  title={getTitleFromRating(appointment.rating || 0)}
                  serviceTitle={appointment.Service.title}
                  clientName={
                    role === 'professional'
                      ? appointment.Client.User.name
                      : appointment.Professional.User.name
                  }
                  clientAvatar={
                    role === 'professional'
                      ? appointment.Client.User.avatar_uri || undefined
                      : appointment.Professional.User.avatar_uri || undefined
                  }
                  date={formatarData(appointment.start_time)}
                  review={appointment.review || undefined}
                  onEdit={
                    role === 'professional'
                      ? undefined
                      : () => {
                          setAppointmentToRate(appointment);
                          setIsRateModalVisible(true);
                        }
                  }
                />
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {appointmentToRate && (
        <RateServiceModal
          visible={isRateModalVisible}
          appointmentId={appointmentToRate.id}
          professionalName={appointmentToRate.Professional.User.name}
          serviceTitle={appointmentToRate.Service.title}
          existingRating={appointmentToRate.rating}
          existingReview={appointmentToRate.review}
          onClose={() => setIsRateModalVisible(false)}
          onSuccess={() => fetchAppointments(role)}
        />
      )}
    </View>
  );
};

export default AvaliacoesTab;
