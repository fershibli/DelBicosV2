import React from 'react';
import { Text, StyleSheet, View, ScrollView, Platform } from 'react-native';
import { useColors } from '@theme/ThemeProvider';
import { Address } from '@stores/Professional/types';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export type SobreContentProps = {
  nome?: string;
  descricao?: string;
  endereco?: Address;
};

export function SobreContent({ nome, descricao, endereco }: SobreContentProps) {
  const colors = useColors();
  const styles = createStyles(colors);

  const hasContent = nome || descricao || endereco;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {!hasContent && (
        <View style={styles.emptyContainer}>
          <FontAwesome
            name="info-circle"
            size={40}
            color={colors.secondaryBeige}
          />
          <Text style={styles.emptyText}>Nenhuma informação disponível</Text>
        </View>
      )}

      {/* Seção: Descrição / Bio */}
      {descricao && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons
              name="description"
              size={20}
              color={colors.primaryOrange}
            />
            <Text style={styles.sectionTitle}>Sobre o Profissional</Text>
          </View>
          <Text style={styles.descriptionText}>{descricao}</Text>
        </View>
      )}

      {/* Seção: Localização */}
      {endereco && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome
              name="map-marker"
              size={20}
              color={colors.primaryOrange}
            />
            <Text style={styles.sectionTitle}>Localização de Atendimento</Text>
          </View>

          <View style={styles.addressCard}>
            <Text style={styles.addressStreet}>
              {endereco.street}, {endereco.number}
              {endereco.complement ? ` - ${endereco.complement}` : ''}
            </Text>

            <Text style={styles.addressDetail}>{endereco.neighborhood}</Text>

            <View style={styles.addressRow}>
              <Text style={styles.addressCity}>
                {endereco.city} - {endereco.state}
              </Text>
              <Text style={styles.addressZip}>CEP: {endereco.zipcode}</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondaryGray,
    },
    contentContainer: {
      padding: 20,
      paddingBottom: 40,
    },

    section: {
      marginBottom: 24,
      backgroundColor: colors.primaryWhite,
      borderRadius: 12,
      padding: 16,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
        web: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
      }),
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      gap: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
      paddingBottom: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlue,
    },

    descriptionText: {
      fontSize: 15,
      fontFamily: 'Afacad-Regular',
      color: '#555',
      lineHeight: 24,
      textAlign: 'justify',
    },

    addressCard: {
      marginTop: 4,
    },
    addressStreet: {
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
      color: '#333',
      marginBottom: 4,
    },
    addressDetail: {
      fontSize: 15,
      fontFamily: 'Afacad-Regular',
      color: '#666',
      marginBottom: 8,
    },
    addressRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 4,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: '#F5F5F5',
    },
    addressCity: {
      fontSize: 14,
      fontFamily: 'Afacad-SemiBold',
      color: colors.primaryBlue,
    },
    addressZip: {
      fontSize: 12,
      fontFamily: 'Afacad-Regular',
      color: '#999',
    },

    emptyContainer: {
      padding: 40,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.7,
    },
    emptyText: {
      marginTop: 12,
      fontSize: 16,
      color: '#888',
      fontFamily: 'Afacad-Regular',
      textAlign: 'center',
    },
  });
