import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.borderColor,
      minHeight: 180,
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 3,
        },
      }),
    },

    // --- COLUNA ESQUERDA (Detalhes) ---
    detailsContainer: {
      flex: 1,
      padding: 12,
      justifyContent: 'space-between',
    },

    header: {
      marginBottom: 8,
    },

    professionalName: {
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryOrange,
      marginBottom: 2,
    },

    serviceName: {
      fontSize: 14,
      fontFamily: 'Afacad-SemiBold',
      color: colors.primaryBlack,
    },

    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },

    ratingText: {
      fontSize: 12,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginLeft: 4,
    },

    ratingCount: {
      fontSize: 12,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
      marginLeft: 4,
    },

    // Horários
    timesContainer: {
      marginVertical: 8,
    },

    timesTitle: {
      fontSize: 12,
      fontFamily: 'Afacad-SemiBold',
      color: colors.textSecondary,
      marginBottom: 4,
    },

    timesRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },

    timeSlot: {
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.borderColor,
      borderRadius: 4,
      paddingVertical: 4,
      paddingHorizontal: 8,
    },

    timeSlotActive: {
      backgroundColor: colors.primaryBlue,
      borderColor: colors.primaryBlue,
    },

    timeText: {
      fontSize: 11,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlack,
    },

    timeTextActive: {
      color: colors.primaryWhite,
      fontFamily: 'Afacad-Bold',
    },

    // Serviços (Resumo)
    servicesContainer: {
      marginBottom: 8,
    },

    servicesText: {
      fontSize: 11,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
    },

    // Rodapé (Local e Botão)
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: colors.divider,
    },

    locationText: {
      fontSize: 11,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
      flex: 1,
      marginRight: 8,
    },

    profileButton: {
      backgroundColor: 'transparent',
      paddingVertical: 4,
    },

    profileButtonText: {
      color: colors.primaryOrange,
      fontFamily: 'Afacad-Bold',
      fontSize: 12,
      textDecorationLine: 'underline',
    },

    // --- COLUNA DIREITA (Imagem e Preço) ---
    imageContainer: {
      width: 120,
      height: '100%',
      justifyContent: 'space-between',
      padding: 8,
    },

    imageOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.1)',
    },

    priceTag: {
      alignSelf: 'flex-end',
      backgroundColor: colors.primaryBlue,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 4,
      maxWidth: '100%',
    },

    priceText: {
      color: colors.primaryWhite,
      fontSize: 12,
      fontFamily: 'Afacad-Bold',
      textAlign: 'center',
    },

    distanceTag: {
      alignSelf: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.6)',
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 4,
      marginTop: 'auto',
    },

    distanceText: {
      color: colors.primaryWhite,
      fontSize: 10,
      fontFamily: 'Afacad-Regular',
    },
  });
