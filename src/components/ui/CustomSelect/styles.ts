import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 0,
    },
    label: {
      fontSize: 16,
      fontFamily: 'Afacad-SemiBold',
      color: colors.primaryBlack,
      marginBottom: 8,
    },
    selectButton: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 14,
      backgroundColor: '#FAFAFA',
      justifyContent: 'center',
    },
    selectButtonText: {
      fontFamily: 'Afacad-Regular',
      fontSize: 16,
      color: colors.primaryBlack,
      lineHeight: 20,
    },
    placeholderText: {
      color: colors.textTertiary || '#9CA3AF',
    },
    errorBorder: {
      borderColor: '#D32F2F',
    },
    errorText: {
      color: '#D32F2F',
      fontSize: 12,
      marginTop: 4,
      fontFamily: 'Afacad-Regular',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: 'white',
      width: '100%',
      maxWidth: 400,
      borderRadius: 12,
      padding: 20,
      maxHeight: '80%',
    },
    modalTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      marginBottom: 16,
      color: colors.primaryBlack,
      textAlign: 'center',
    },
    optionItem: {
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
    optionText: {
      fontSize: 16,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlack,
    },
    closeButton: {
      marginTop: 16,
      alignItems: 'center',
      padding: 12,
      backgroundColor: colors.secondaryGray,
      borderRadius: 8,
    },
    closeButtonText: {
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
    },
    webSelect: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0,
      width: '100%',
      height: '100%',
      cursor: 'pointer',
    } as any,
  });
