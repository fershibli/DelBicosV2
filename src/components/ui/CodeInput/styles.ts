import { StyleSheet } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    codeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      maxWidth: 300,
      alignSelf: 'center',
      marginBottom: 24,
    },
    codeInput: {
      width: 56,
      height: 56,
      borderWidth: 1,
      borderColor: colors.borderColor,
      borderRadius: 12,
      textAlign: 'center',
      fontSize: 24,
      fontFamily: 'Afacad-Bold',
      backgroundColor: colors.inputBackground,
      color: colors.primaryBlack,
    },
    codeInputFocused: {
      borderColor: colors.primaryOrange,
      borderWidth: 2,
      backgroundColor: colors.cardBackground,
    },
    codeInputFilled: {
      borderColor: colors.primaryBlue,
    },
  });
