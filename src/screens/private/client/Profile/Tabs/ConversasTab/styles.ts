import { StyleSheet } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      backgroundColor: 'transparent',
      minHeight: 300,
    },
    iconContainer: {
      marginBottom: 24,
      opacity: 0.8,
      backgroundColor: colors.inputBackground,
      padding: 24,
      borderRadius: 50,
    },
    title: {
      fontSize: 24,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginBottom: 12,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      maxWidth: 300,
    },
  });
