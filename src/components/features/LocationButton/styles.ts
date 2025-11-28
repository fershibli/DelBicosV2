import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    button: {
      backgroundColor: '#3b82f6',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 10,
    },
    buttonText: {
      color: colors.primaryWhite,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: colors.primaryWhite,
      borderRadius: 12,
      padding: 16,
      width: '90%',
      maxWidth: 400,
      height: 400,
    },
    mapContainer: {
      height: 300,
      width: '100%',
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 16,
    },
    confirmButton: {
      backgroundColor: '#3b82f6',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    confirmButtonText: {
      color: colors.primaryWhite,
      fontSize: 16,
      fontWeight: '600',
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
      textAlign: 'center',
    },
  });
