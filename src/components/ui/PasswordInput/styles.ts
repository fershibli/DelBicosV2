import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      backgroundColor: colors.cardBackground,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.borderColor,
      height: 50,
    },
    input: {
      flex: 1,
      paddingHorizontal: 16,
      height: '100%',
      fontSize: 16,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlack,
    },
    inputError: {
      borderColor: colors.primaryOrange,
      borderWidth: 1.5,
    },
    eyeButton: {
      padding: 12,
    },
    eyeIcon: {
      width: 24,
      height: 24,
      tintColor: colors.textSecondary,
    },
  });
