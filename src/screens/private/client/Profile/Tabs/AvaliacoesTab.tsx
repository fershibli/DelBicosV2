import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { ReviewCard } from '@components/ui/ReviewCard';
import { useAppointmentStore } from '@stores/Appointment';
import { useColors } from '@theme/ThemeProvider';

const AvaliacoesTab: React.FC = () => {
  const colors = useColors();
  const styles = createAvaliacoesStyles(colors);
  const { appointments, fetchAppointments, loading } = useAppointmentStore();

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Filtrar apenas appointments que foram avaliados pelo cliente (limitar a 2)
  const avaliacoesFeitas = appointments
    .filter(
      (apt) =>
        apt.rating !== null && apt.rating !== undefined && apt.rating > 0,
    )
    .slice(0, 2);

  const formatarData = (dataString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return new Date(dataString).toLocaleDateString('pt-BR', options);
  };

  const getTitleFromRating = (rating: number): string => {
    if (rating === 5) return 'Ótimo Serviço';
    if (rating >= 4) return 'Profissional Educado';
    if (rating >= 3) return 'Experiente';
    return 'Serviço';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryOrange} />
        <Text style={styles.loadingText}>Carregando avaliações...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Avaliações</Text>

      {avaliacoesFeitas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Você ainda não fez nenhuma avaliação
          </Text>
          <Text style={styles.emptySubtext}>
            Complete um serviço e avalie o profissional para que sua opinião
            apareça aqui
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.gridContainer}>
            {avaliacoesFeitas.map((appointment) => (
              <View key={appointment.id} style={styles.cardWrapper}>
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

const createAvaliacoesStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'transparent',
    },
    pageTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.primaryBlack,
      marginBottom: 24,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    loadingText: {
      marginTop: 12,
      fontSize: 16,
      color: colors.primaryBlack,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.primaryBlack,
      textAlign: 'center',
      marginBottom: 12,
    },
    emptySubtext: {
      fontSize: 14,
      color: colors.textGray,
      textAlign: 'center',
      lineHeight: 20,
    },
    scrollContent: {
      paddingBottom: 20,
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    },
    cardWrapper: {
      width: 300,
      maxWidth: '100%',
    },
  });

export default AvaliacoesTab;
