import { Platform, StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContainer: {
      backgroundColor: colors.primaryWhite,
      borderRadius: 24,
      padding: 24,
      width: '100%',
      maxWidth: 450,
      ...Platform.select({
        web: { boxShadow: '0px 10px 30px rgba(0,0,0,0.2)' },
        default: { elevation: 10 },
      }),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    closeButton: {
      padding: 4,
    },
    title: {
      fontSize: 20,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 24,
    },
    highlightText: {
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlue,
    },
    ratingContainer: {
      alignItems: 'center',
      marginBottom: 24,
    },
    ratingComponent: {
      paddingVertical: 10,
      backgroundColor: 'transparent',
    },
    ratingLabel: {
      fontSize: 16,
      fontFamily: 'Afacad-SemiBold',
      marginTop: 8,
    },
    inputWrapper: {
      marginBottom: 24,
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlack,
      minHeight: 120,
      backgroundColor: '#FAFAFA',
    },
    charCounter: {
      fontSize: 12,
      color: colors.textTertiary,
      textAlign: 'right',
      marginTop: 6,
      fontFamily: 'Afacad-Regular',
    },
    submitButton: {
      backgroundColor: colors.primaryOrange,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitButtonDisabled: {
      backgroundColor: '#E0E0E0',
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
    },
    successOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
    },
    successCard: {
      backgroundColor: 'white',
      padding: 32,
      borderRadius: 24,
      alignItems: 'center',
      width: '85%',
      maxWidth: 350,
    },
    successIconContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: colors.primaryGreen,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    successTitle: {
      fontSize: 22,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginBottom: 8,
    },
    successMessage: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 24,
      fontFamily: 'Afacad-Regular',
    },
    successButton: {
      backgroundColor: colors.primaryGreen,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 30,
    },
    successButtonText: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
    },
  });
