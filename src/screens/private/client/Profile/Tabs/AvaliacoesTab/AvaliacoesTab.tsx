import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { ReviewCard } from '@components/ui/ReviewCard';
import { useAppointmentStore } from '@stores/Appointment';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';

const AvaliacoesTab: React.FC = () => {
  const colors = useColors();
  const styles = createStyles(colors);
  const { appointments, fetchAppointments, loading } = useAppointmentStore();
  const { width } = useWindowDimensions();

  const isDesktop = width >= 768;

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

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
      <Text style={styles.pageTitle}>Minhas Avaliações</Text>

      {avaliacoesFeitas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Você ainda não fez nenhuma avaliação.
          </Text>
          <Text style={styles.emptySubtext}>
            Após concluir um serviço, avalie o profissional para que sua opinião
            apareça aqui.
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
                  clientName={appointment.Professional.User.name}
                  clientAvatar={
                    appointment.Professional.User.avatar_uri || undefined
                  }
                  date={formatarData(appointment.start_time)}
                  review={appointment.review || undefined}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default AvaliacoesTab;
