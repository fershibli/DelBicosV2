import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.overlay,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 999,
    },
    modalContent: {
      backgroundColor: colors.cardBackground,
      width: '90%',
      borderRadius: 12,
      padding: 20,
      maxHeight: '80%',
      borderWidth: 1,
      borderColor: colors.borderColor,
      ...Platform.select({
        web: {
          boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
        },
        default: {
          elevation: 10,
        },
      }),
    },
    modalTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      marginBottom: 20,
      textAlign: 'center',
      color: colors.primaryBlack,
    },
    loadingContainer: {
      padding: 40,
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      color: colors.textSecondary,
      fontFamily: 'Afacad-Regular',
    },
    emptyContainer: {
      padding: 40,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 8,
      fontFamily: 'Afacad-Regular',
    },
    emptySubtext: {
      fontSize: 14,
      color: colors.textTertiary,
      textAlign: 'center',
      fontFamily: 'Afacad-Regular',
    },
    addressesList: {
      maxHeight: 400,
    },
    addressesListContent: {
      paddingBottom: 10,
    },
    addressItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderWidth: 1,
      borderColor: colors.borderColor,
      borderRadius: 8,
      marginBottom: 8,
      backgroundColor: colors.inputBackground,
    },
    selectedAddressItem: {
      borderColor: colors.primaryOrange,
      backgroundColor: colors.backgroundElevated,
      borderWidth: 2,
    },
    addressRadio: {
      marginRight: 12,
    },
    radioCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.textTertiary,
    },
    radioCircleSelected: {
      borderColor: colors.primaryOrange,
      backgroundColor: colors.primaryOrange,
    },
    addressInfo: {
      flex: 1,
    },
    addressText: {
      fontSize: 14,
      color: colors.primaryBlack,
      fontWeight: '500',
      marginBottom: 2,
      fontFamily: 'Afacad-SemiBold',
    },
    addressNeighborhood: {
      fontSize: 12,
      color: colors.textSecondary,
      fontFamily: 'Afacad-Regular',
    },
    modalButtons: {
      marginTop: 10,
      borderTopWidth: 1,
      borderTopColor: colors.borderColor,
      paddingTop: 16,
      gap: 10,
    },
    confirmButton: {
      backgroundColor: colors.primaryOrange,
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    disabledButton: {
      backgroundColor: colors.textTertiary,
      opacity: 0.5,
    },
    confirmButtonText: {
      color: colors.primaryWhite,
      fontFamily: 'Afacad-Bold',
      fontSize: 16,
    },
    cancelButton: {
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    cancelButtonText: {
      color: colors.textSecondary,
      fontFamily: 'Afacad-SemiBold',
    },
    newAddressButton: {
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.primaryOrange,
      backgroundColor: 'transparent',
      marginBottom: 10,
    },
    newAddressButtonText: {
      color: colors.primaryOrange,
      fontFamily: 'Afacad-SemiBold',
      fontSize: 16,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    backButton: {
      padding: 4,
    },
    headerSpacer: {
      width: 24,
    },
    formScrollView: {
      maxHeight: '85%',
    },
  });
