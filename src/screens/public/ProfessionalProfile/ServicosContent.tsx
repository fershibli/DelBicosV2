import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Professional } from '@stores/Professional/types';
import colors from '@theme/colors';
import { useNavigation } from '@react-navigation/native';

interface ServicosContentProps {
  professional: Professional;
}

export function ServicosContent({ professional }: ServicosContentProps) {
  const navigation = useNavigation();
  const service = professional.Services?.[0];

  const handleSchedule = () => {
    // Navega para tela de agendamento
    // @ts-ignore
    navigation.navigate('SearchResult', {
      subcategoryId: service?.subcategory_id,
      professionalId: professional.id,
    });
  };

  if (!service) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Nenhum serviço disponível no momento.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.serviceCard}>
        <Text style={styles.serviceTitle}>{service.title}</Text>

        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.description}>
          {service.description || 'Serviço de qualidade.'}
        </Text>

        {service.duration && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Duração:</Text>
            <Text style={styles.value}>{service.duration} minutos</Text>
          </View>
        )}

        {service.price && (
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Preço</Text>
            <Text style={styles.priceValue}>
              R$ {parseFloat(String(service.price)).toFixed(2)}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={handleSchedule}>
          <Text style={styles.scheduleButtonText}>Agendar Serviço</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  serviceCard: {
    backgroundColor: colors.primaryWhite,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primaryOrange,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaryBlack,
    marginBottom: 4,
    marginTop: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.primaryBlack,
    marginBottom: 12,
  },
  infoRow: {
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    color: colors.primaryBlack,
    marginTop: 4,
  },
  priceContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.secondaryBeige,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.primaryBlack,
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primaryOrange,
  },
  scheduleButton: {
    backgroundColor: colors.primaryOrange,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  scheduleButtonText: {
    color: colors.primaryWhite,
    fontSize: 16,
    fontWeight: '600',
  },
});
