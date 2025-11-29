import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.inputBackground,
    },
    content: {
      padding: 16,
      paddingBottom: 40,
    },
    title: {
      fontSize: 24,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlue,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-SemiBold',
      color: colors.primaryBlack,
      marginTop: 24,
      marginBottom: 12,
    },
    chartContainer: {
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
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
        web: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        },
      }),
    },
    legendContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 12,
      gap: 16,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    legendDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    legendText: {
      fontSize: 12,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
    },
  });
