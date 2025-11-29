import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      marginTop: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlue,
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
      alignItems: 'flex-start',
    },
    cityRow: {
      zIndex: 2000,
      elevation: 2000,
      ...Platform.select({
        web: { position: 'relative', zIndex: 2000 },
      }),
    },
    footer: {
      zIndex: 1,
      elevation: 1,
      marginTop: 8,
      ...Platform.select({
        web: { position: 'relative', zIndex: 1 },
      }),
    },
    col: {},
    cepContainer: {
      zIndex: 1,
      marginBottom: 16,
      position: 'relative',
    },
    errorText: {
      color: colors.errorText,
      fontSize: 12,
      fontFamily: 'Afacad-Regular',
      marginTop: 4,
      marginBottom: 4,
    },
    loader: {
      position: 'absolute',
      right: 12,
      top: 42,
    },
  });
