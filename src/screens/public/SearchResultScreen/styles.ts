import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.inputBackground,
      alignItems: 'center',
    },
    contentContainer: {
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    list: {
      width: '100%',
      maxWidth: 1200,
    },
    title: {
      fontSize: 28,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlue,
      marginBottom: 16,
    },

    // Filtros
    filterBar: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 20,
      gap: 12,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardBackground,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.borderColor,
      ...Platform.select({
        web: { cursor: 'pointer' } as any,
      }),
    },
    filterButtonText: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
      marginRight: 8,
    },

    // Grid Wrapper
    columnWrapper: {
      justifyContent: 'space-between',
    },
    cardWrapper: {
      padding: 8,
    },

    // Footer / Empty
    footer: {
      padding: 20,
      textAlign: 'center',
      fontSize: 12,
      color: colors.textTertiary,
      fontFamily: 'Afacad-Regular',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
      minHeight: 300,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      fontFamily: 'Afacad-Regular',
      lineHeight: 24,
    },
  });
