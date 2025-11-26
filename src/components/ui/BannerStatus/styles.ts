import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    statusContainer: {
      marginBottom: 20,
    },
    statusBanner: {
      backgroundColor: colors.primaryGreen,
      borderWidth: 1,
      borderColor: colors.primaryGreen,
      borderRadius: 3,
      width: '40%',
      paddingVertical: 10,
      alignItems: 'center',
      marginBottom: 10,
    },
    statusText: {
      fontWeight: '700',
      fontSize: 10,
      lineHeight: 18,
      color: colors.primaryWhite,
    },
    reminderButton: {
      alignSelf: 'flex-end',
      marginBottom: 10,
    },
    reminderText: {
      fontSize: 9,
      lineHeight: 11,
      color: colors.primaryBlack,
    },
  });
