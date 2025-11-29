import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    // ===== CARD PRINCIPAL =====
    card: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.borderColor,
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 3,
        },
      }),
    },

    content: {
      flexDirection: 'column',
    },

    // ===== LADO DIREITO (IMAGEM - Agora no Topo) =====
    rightSection: {
      position: 'relative',
      width: '100%',
      height: 150,
    },

    serviceImage: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.inputBackground,
    },

    imageOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },

    viewProfileBadge: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 90, 147, 0.9)',
      paddingVertical: 6,
      alignItems: 'center',
    },

    viewProfileText: {
      color: colors.primaryWhite,
      fontSize: 12,
      fontFamily: 'Afacad-Bold',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },

    // ===== LADO ESQUERDO (CONTEÚDO) =====
    leftSection: {
      padding: 16,
    },

    topInfo: {
      marginBottom: 12,
    },

    professionalName: {
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryOrange,
      marginBottom: 4,
    },

    serviceInfo: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Afacad-Regular',
      marginBottom: 2,
    },

    serviceName: {
      fontSize: 14,
      fontFamily: 'Afacad-SemiBold',
      color: colors.primaryBlack,
      marginBottom: 4,
    },

    dateTime: {
      fontSize: 12,
      color: colors.primaryBlue,
      fontFamily: 'Afacad-Bold',
    },

    // ===== STATUS BADGE =====
    statusBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 4,
      marginBottom: 12,
    },

    statusText: {
      fontSize: 11,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryWhite,
      textTransform: 'uppercase',
    },

    // ===== AVALIAÇÃO EXIBIDA =====
    reviewSection: {
      marginTop: 8,
      padding: 12,
      backgroundColor: colors.inputBackground,
      borderRadius: 8,
      borderLeftWidth: 3,
      borderLeftColor: '#FFC107',
      marginBottom: 12,
    },

    reviewHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },

    reviewLabel: {
      fontSize: 12,
      fontFamily: 'Afacad-Bold',
      color: colors.textSecondary,
      marginRight: 8,
    },

    reviewStarsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    reviewComment: {
      fontSize: 13,
      color: colors.primaryBlack,
      fontFamily: 'Afacad-Regular',
      fontStyle: 'italic',
    },

    // ===== BOTÕES =====
    buttonsContainer: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 4,
    },

    button: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },

    detailsButton: {
      backgroundColor: colors.primaryBlue,
    },

    cancelButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.errorText,
    },

    cancelButtonText: {
      color: colors.errorText,
      fontFamily: 'Afacad-Bold',
      fontSize: 13,
    },

    modifyButton: {
      backgroundColor: colors.primaryOrange,
    },

    rateButton: {
      backgroundColor: colors.successText,
    },

    buttonText: {
      color: colors.primaryWhite,
      fontFamily: 'Afacad-Bold',
      fontSize: 13,
    },

    // ===== MODAL =====
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
    },

    modalContent: {
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      width: '85%',
      padding: 24,
      ...Platform.select({
        default: { elevation: 5 },
      }),
    },

    modalTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      marginBottom: 20,
      textAlign: 'center',
      color: colors.primaryBlack,
    },

    ratingComponent: {
      alignSelf: 'center',
      marginBottom: 20,
      backgroundColor: 'transparent',
    },

    modalInput: {
      borderWidth: 1,
      borderColor: colors.borderColor,
      borderRadius: 8,
      padding: 12,
      textAlignVertical: 'top',
      marginBottom: 20,
      fontSize: 14,
      color: colors.primaryBlack,
      backgroundColor: colors.inputBackground,
      minHeight: 100,
      fontFamily: 'Afacad-Regular',
    },

    modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },

    modalCancelButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },

    modalCancelText: {
      color: colors.textSecondary,
      fontFamily: 'Afacad-SemiBold',
      fontSize: 14,
    },

    modalConfirmButton: {
      flex: 1,
      backgroundColor: colors.primaryBlue,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
  });
