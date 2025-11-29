import { Platform, StyleSheet } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      padding: 4,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    button: {
      width: 40,
      height: 40,
      marginHorizontal: 2,
      borderRadius: 8,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      ...Platform.select({
        web: {
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        } as any,
      }),
    },
    buttonActive: {
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.primaryOrange,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
        },
        web: {
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        },
      }),
    },
  });
