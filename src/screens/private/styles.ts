import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.inputBackground,
    },
    contentContainer: {
      paddingBottom: 40,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 24,
      paddingBottom: 16,
    },
    title: {
      fontSize: 24,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
    },
    refreshButton: {
      padding: 10,
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.borderColor,
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
        },
        android: { elevation: 2 },
      }),
    },
    errorContainer: {
      marginHorizontal: 20,
      marginBottom: 16,
      padding: 12,
      backgroundColor: colors.errorBackground,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.errorText,
    },
    errorText: {
      color: colors.errorText,
      fontFamily: 'Afacad-Regular',
      textAlign: 'center',
    },
  });
