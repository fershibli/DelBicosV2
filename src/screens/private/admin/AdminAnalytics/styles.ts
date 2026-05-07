import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: colors.inputBackground,
      flexGrow: 1,
    },
    title: {
      fontSize: 24,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginVertical: 16,
    },
    errorBox: {
      padding: 16,
      backgroundColor: colors.errorBackground,
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.errorText,
    },
    errorText: {
      color: colors.errorText,
      fontFamily: 'Afacad-SemiBold',
    },
    kpiRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 24,
    },
    kpiCard: {
      flex: 1,
      minWidth: 150,
      backgroundColor: colors.cardBackground,
      padding: 16,
      borderRadius: 12,
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
    kpiLabel: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
    },
    kpiValue: {
      fontSize: 24,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlue,
      marginTop: 8,
    },
    chartsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 24,
    },
    mainChart: {
      flex: 2,
      minWidth: 300,
    },
    sideColumn: {
      flex: 1,
      minWidth: 280,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-SemiBold',
      color: colors.primaryBlack,
      marginBottom: 12,
      marginTop: 24,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
    },
    summaryKey: {
      color: colors.textSecondary,
      fontFamily: 'Afacad-Regular',
      textTransform: 'capitalize',
    },
    summaryVal: {
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
    },
    chartCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
  });
