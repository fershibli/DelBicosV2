import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    pageTitle: {
      fontSize: 24,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginBottom: 24,
    },
    card: {
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 24,
      borderWidth: 1,
      borderColor: colors.borderColor,
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    contentWrapper: {},
    avatarContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarTouchable: {
      position: 'relative',
      width: 120,
      height: 120,
      borderRadius: 60,
      overflow: 'hidden',
    },
    avatarAnimatedWrapper: {
      width: '100%',
      height: '100%',
    },
    avatarImage: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.inputBackground,
    },
    avatarOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarOverlayText: {
      color: 'white',
      fontFamily: 'Afacad-Bold',
      fontSize: 12,
      marginTop: 4,
    },
    saveButtonContainer: {
      marginTop: 24,
      alignItems: 'flex-end',
    },
    saveButton: {
      backgroundColor: colors.primaryOrange,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    saveButtonText: {
      color: colors.primaryWhite,
      fontFamily: 'Afacad-Bold',
      fontSize: 16,
    },

    // --- MODAL OPTIONS ---
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: 'flex-end',
    },
    optionsContainer: {
      backgroundColor: colors.cardBackground,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 24,
      paddingBottom: 40,
    },
    optionButton: {
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
    },
    optionText: {
      fontSize: 16,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlack,
      textAlign: 'center',
    },
    removeOption: {
      borderBottomWidth: 0,
      marginTop: 8,
    },
    removeText: {
      color: colors.errorText,
      fontFamily: 'Afacad-Bold',
    },
    cancelOption: {
      marginTop: 16,
      backgroundColor: colors.inputBackground,
      borderRadius: 8,
      borderBottomWidth: 0,
    },
    cancelText: {
      fontFamily: 'Afacad-Bold',
    },

    // --- STATUS MODAL ---
    statusModalContainer: {
      backgroundColor: colors.cardBackground,
      width: '80%',
      maxWidth: 300,
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    statusModalIcon: {
      fontSize: 40,
      marginBottom: 16,
    },
    statusModalTitle: {
      fontSize: 20,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginBottom: 8,
    },
    statusModalMessage: {
      fontSize: 16,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 24,
    },
    statusModalButton: {
      backgroundColor: colors.primaryBlue,
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    statusModalButtonText: {
      color: colors.primaryWhite,
      fontFamily: 'Afacad-Bold',
    },
  });
