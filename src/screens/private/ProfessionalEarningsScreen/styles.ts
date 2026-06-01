import { StyleSheet } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (
  colors: ColorsType,
  isDark: boolean = false,
  isHighContrast: boolean = false,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark
        ? colors.secondaryGray
        : isHighContrast
          ? colors.primaryWhite
          : '#DDE6F0',
    },
    contentContainer: {
      paddingBottom: 40,
    },
    header: {
      padding: 20,
      backgroundColor: colors.primaryBlack,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      alignItems: 'center',
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-SemiBold',
      color: colors.textTertiary,
      marginBottom: 8,
    },
    balanceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    currencyText: {
      fontSize: 24,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryWhite,
      marginRight: 4,
    },
    balanceText: {
      fontSize: 40,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryWhite,
    },
    balanceHidden: {
      fontSize: 40,
      color: colors.textTertiary,
      lineHeight: 40,
      paddingTop: 8,
    },
    eyeBtn: {
      marginLeft: 16,
      padding: 8,
    },
    actionRow: {
      flexDirection: 'row',
      marginTop: 20,
      gap: 12,
    },
    actionBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primaryOrange,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      gap: 8,
    },
    actionBtnDisabled: {
      backgroundColor: colors.borderColor,
    },
    actionBtnText: {
      color: colors.primaryWhite,
      fontFamily: 'Afacad-Bold',
      fontSize: 16,
    },
    cardsContainer: {
      paddingHorizontal: 16,
      flexDirection: 'row',
      gap: 12,
      marginBottom: 24,
    },
    summaryCard: {
      flex: 1,
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    cardIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.inputBackground,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
      marginBottom: 4,
    },
    cardValue: {
      fontSize: 20,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
    },
    historySection: {
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginBottom: 16,
    },
    emptyHistory: {
      alignItems: 'center',
      padding: 40,
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    emptyHistoryText: {
      marginTop: 12,
      fontSize: 16,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
      textAlign: 'center',
    },
    historyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardBackground,
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    historyItemIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.inputBackground,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    historyItemInfo: {
      flex: 1,
    },
    historyItemTitle: {
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginBottom: 2,
    },
    historyItemDate: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
    },
    historyItemAmount: {
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryGreen || '#16a34a',
    },
  });
