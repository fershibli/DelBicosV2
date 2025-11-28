import { StyleSheet } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    loadingContainer: {
      paddingVertical: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },

    listContent: {
      paddingVertical: 16,
      paddingHorizontal: 4,
    },

    columnWrapper: {
      justifyContent: 'flex-start',
    },

    cardWrapper: {
      padding: 6,
    },

    footerContainer: {
      paddingVertical: 24,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    footerText: {
      fontSize: 14,
      color: colors.textTertiary || '#6c757d',
      fontFamily: 'Afacad-Regular',
      textAlign: 'center',
    },

    emptyContainer: {
      padding: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: colors.textTertiary || '#6c757d',
      textAlign: 'center',
      fontFamily: 'Afacad-Regular',
    },
  });
