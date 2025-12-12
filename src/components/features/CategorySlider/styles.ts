import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      marginVertical: 10,
    },
    sliderWrapper: {
      width: '100%',
    },
    listContent: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      flexGrow: 1,
    },
    card: {
      flexDirection: 'row',
      width: 260,
      height: 100,
      marginHorizontal: 8,
      borderRadius: 20,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.cardBackground,
      borderColor: colors.borderColor,
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
        android: {
          elevation: 5,
        },
        web: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        } as any,
      }),
    },
    title: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      textAlign: 'left',
      flexShrink: 1,
    },
    loadingContainer: {
      height: 130,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    emptyText: {
      color: colors.textSecondary,
      fontFamily: 'Afacad-Regular',
    },
  });
