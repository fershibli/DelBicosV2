import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    loadingContainer: {
      width: '100%',
      minHeight: 150,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyContainer: {
      width: '100%',
      minHeight: 150,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyText: {
      fontFamily: 'Afacad-Regular',
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    listContainer: {
      paddingBottom: 20,
      paddingHorizontal: 8,
    },
    categoryCard: {
      flex: 1,
      margin: 8,
      padding: 16,
      borderRadius: 16,
      minHeight: 140,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
        },
        android: {
          elevation: 3,
        },
        web: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          cursor: 'pointer',
          transitionDuration: '0.2s',
        },
      }),
    },
    categoryTitle: {
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
      textAlign: 'center',
      marginTop: 12,
      lineHeight: 20,
    },
  });
