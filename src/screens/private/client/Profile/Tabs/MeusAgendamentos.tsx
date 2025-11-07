import { useAppointmentStore } from '@stores/Appointment';
import { Appointment } from '@stores/Appointment/types';
import React, { useEffect, useState, useMemo } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AppointmentItem from '@components/features/AppointmentItem';
import colors from '@theme/colors';

type SortOption = 'recentes' | 'avaliacao' | 'distancia';
type FilterOption =
  | 'todos'
  | 'pendentes'
  | 'confirmados'
  | 'concluidos'
  | 'cancelados';

function MeusAgendamentos() {
  const [sortBy, setSortBy] = useState<SortOption>('recentes');
  const [filterBy, setFilterBy] = useState<FilterOption>('todos');
  const [showInfo, setShowInfo] = useState<'avaliacao' | 'distancia'>(
    'avaliacao',
  );

  const { appointments, fetchAppointments } = useAppointmentStore();

  useEffect(() => {
    const loadAppointments = async () => {
      await fetchAppointments();
    };

    loadAppointments();
  }, [fetchAppointments]);

  // Função para calcular distância aleatória (substituir por cálculo real no futuro)
  const getDistance = (appointment: Appointment): number => {
    // Simulação de distância baseada no ID (substituir por cálculo real)
    return Math.floor((appointment.id * 3.7) % 50) + 1;
  };

  // Função para obter avaliação do profissional
  const getProfessionalRating = (appointment: Appointment): number => {
    // Usar a avaliação do agendamento ou uma avaliação média simulada
    return appointment.rating || 4.5;
  };

  // Filtrar e ordenar agendamentos
  const filteredAndSortedAppointments = useMemo(() => {
    let filtered = [...appointments];

    // Aplicar filtro de status
    if (filterBy !== 'todos') {
      filtered = filtered.filter((apt) => {
        switch (filterBy) {
          case 'pendentes':
            return apt.status === 'pending';
          case 'confirmados':
            return apt.status === 'confirmed';
          case 'concluidos':
            return apt.status === 'completed';
          case 'cancelados':
            return apt.status === 'canceled';
          default:
            return true;
        }
      });
    }

    // Aplicar ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'avaliacao':
          return getProfessionalRating(b) - getProfessionalRating(a);
        case 'distancia':
          return getDistance(a) - getDistance(b);
        case 'recentes':
        default:
          return (
            new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
          );
      }
    });

    return filtered;
  }, [appointments, sortBy, filterBy]);

  return (
    <View style={styles.container}>
      {/* Título Grande */}
      <Text style={styles.pageTitle}>Meus Agendamentos</Text>

      {/* Barra de Filtros */}
      <View style={styles.filtersContainer}>
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              sortBy === 'recentes' && styles.filterButtonActive,
            ]}
            onPress={() => setSortBy('recentes')}>
            <Text
              style={[
                styles.filterButtonText,
                sortBy === 'recentes' && styles.filterButtonTextActive,
              ]}>
              Recentes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              sortBy === 'avaliacao' && styles.filterButtonActive,
            ]}
            onPress={() => {
              setSortBy('avaliacao');
              setShowInfo('avaliacao');
            }}>
            <Text
              style={[
                styles.filterButtonText,
                sortBy === 'avaliacao' && styles.filterButtonTextActive,
              ]}>
              ⭐ Avaliação
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              sortBy === 'distancia' && styles.filterButtonActive,
            ]}
            onPress={() => {
              setSortBy('distancia');
              setShowInfo('distancia');
            }}>
            <Text
              style={[
                styles.filterButtonText,
                sortBy === 'distancia' && styles.filterButtonTextActive,
              ]}>
              📍 Distância
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              filterBy !== 'todos' && styles.filterButtonActive,
            ]}
            onPress={() => {
              // Rotacionar entre os status
              const statuses: FilterOption[] = [
                'todos',
                'pendentes',
                'confirmados',
                'concluidos',
                'cancelados',
              ];
              const currentIndex = statuses.indexOf(filterBy);
              const nextIndex = (currentIndex + 1) % statuses.length;
              setFilterBy(statuses[nextIndex]);
            }}>
            <Text
              style={[
                styles.filterButtonText,
                filterBy !== 'todos' && styles.filterButtonTextActive,
              ]}>
              {filterBy === 'todos' && 'Todos'}
              {filterBy === 'pendentes' && 'Pendentes'}
              {filterBy === 'confirmados' && 'Confirmados'}
              {filterBy === 'concluidos' && 'Concluídos'}
              {filterBy === 'cancelados' && 'Cancelados'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Indicador de exibição ativa */}
        {(sortBy === 'avaliacao' || sortBy === 'distancia') && (
          <View style={styles.infoIndicator}>
            <Text style={styles.infoIndicatorText}>
              {showInfo === 'avaliacao'
                ? '⭐ Ordenado por avaliação (melhor → pior)'
                : '📍 Ordenado por distância (mais perto → mais longe)'}
            </Text>
          </View>
        )}
      </View>

      {/* Lista de Agendamentos em Grade 2x2 */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {filteredAndSortedAppointments.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Nenhum agendamento encontrado
            </Text>
          </View>
        ) : (
          <View style={styles.gridContainer}>
            {filteredAndSortedAppointments.map((appointment, index) => (
              <View
                key={appointment.id}
                style={[
                  styles.gridItem,
                  (index + 1) % 2 === 0 && { marginRight: 0 },
                ]}>
                <AppointmentItem appointment={appointment} />

                {/* Quadro de informação (avaliação ou distância) */}
                {showInfo === 'avaliacao' && (
                  <View style={styles.infoBox}>
                    <Text style={styles.infoBoxLabel}>Avaliação:</Text>
                    <View style={styles.ratingDisplay}>
                      <Text style={styles.ratingText}>
                        ⭐ {getProfessionalRating(appointment).toFixed(1)}
                      </Text>
                    </View>
                  </View>
                )}

                {showInfo === 'distancia' && (
                  <View style={styles.infoBox}>
                    <Text style={styles.infoBoxLabel}>Distância:</Text>
                    <View style={styles.distanceDisplay}>
                      <Text style={styles.distanceText}>
                        📍 {getDistance(appointment)} km
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primaryBlack,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  filtersContainer: {
    backgroundColor: colors.primaryWhite,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  filterButton: {
    backgroundColor: colors.primaryWhite,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  filterButtonActive: {
    backgroundColor: colors.primaryBlue,
    borderColor: colors.primaryBlue,
  },
  filterButtonText: {
    fontSize: 13,
    color: colors.primaryBlack,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: colors.primaryWhite,
    fontWeight: '700',
  },
  infoIndicator: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#E8F4FF',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: colors.primaryBlue,
  },
  infoIndicatorText: {
    fontSize: 12,
    color: colors.primaryBlue,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
    marginRight: '4%',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  appointmentWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  infoBox: {
    position: 'absolute',
    top: 10,
    right: 16,
    backgroundColor: colors.primaryWhite,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  infoBoxLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
  },
  ratingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    color: colors.primaryOrange,
    fontWeight: '700',
  },
  distanceDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 13,
    color: colors.primaryBlue,
    fontWeight: '700',
  },
});

export default MeusAgendamentos;
