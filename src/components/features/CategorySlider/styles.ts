import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    externalContainer: {
      backgroundColor: 'transparent',
      width: '100%',
      minHeight: 110,
      paddingVertical: 10,
      justifyContent: 'center',
    },
    loadingContainer: {
      minHeight: 110,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flatList: {
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    categoryCard: {
      flexDirection: 'row',
      width: 200,
      height: 80,
      marginRight: 12,
      paddingHorizontal: 12,
      borderRadius: 16,
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.borderColor,
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 3,
        },
        android: {
          elevation: 3,
        },
        web: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
          cursor: 'pointer',
          transitionDuration: '0.2s',
        },
      }),
    },
    categoryTitle: {
      fontSize: 16,
      fontFamily: 'Afacad-SemiBold',
      color: colors.primaryOrange,
      textAlign: 'left',
      flexShrink: 1,
      marginLeft: 12,
    },
  });
