import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Professional } from '@stores/Professional/types';
import colors from '@theme/colors';

interface SobreContentProps {
  professional: Professional;
}

export function SobreContent({ professional }: SobreContentProps) {
  const mainService =
    professional.Services && professional.Services.length > 0
      ? professional.Services[0]
      : undefined;
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre o Profissional</Text>
        <Text style={styles.description}>
          {professional.description || 'Descrição não disponível.'}
        </Text>
        {mainService && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Serviço Principal</Text>
            <Text style={styles.serviceTitle}>{mainService.title}</Text>
            <Text style={styles.serviceDescription}>
              {mainService.description || 'Serviço de qualidade.'}
            </Text>
            {mainService.duration && (
              <Text style={styles.serviceInfo}>
                Duração: {mainService.duration} minutos
              </Text>
            )}
            {mainService.price && (
              <Text style={styles.servicePrice}>
                Preço: R$ {parseFloat(mainService.price).toFixed(2)}
              </Text>
            )}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações de Contato</Text>
        {professional.User.phone && (
          <Text style={styles.contactInfo}>
            Telefone: {professional.User.phone}
          </Text>
        )}
        {professional.User.email && (
          <Text style={styles.contactInfo}>
            Email: {professional.User.email}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: colors.primaryWhite,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryBlack,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.primaryBlack,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryOrange,
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.primaryBlack,
    marginBottom: 12,
  },
  serviceInfo: {
    fontSize: 14,
    color: colors.primaryBlack,
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryOrange,
    marginTop: 8,
  },
  contactInfo: {
    fontSize: 14,
    color: colors.primaryBlack,
    marginBottom: 8,
  },
});
