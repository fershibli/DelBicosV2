import { StyleSheet } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primaryWhite,
    },
    listContent: {
      paddingVertical: 8,
    },
    emptyContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.divider,
    },
    avatarWrapper: {
      marginRight: 12,
    },
    avatar: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: colors.inputBackground,
    },
    avatarFallback: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: colors.primaryOrange,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rowContent: {
      flex: 1,
    },
    rowHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    name: {
      flex: 1,
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginRight: 8,
    },
    time: {
      fontSize: 12,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
    },
    preview: {
      flex: 1,
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
      marginTop: 2,
      marginRight: 8,
    },
    archivedBadge: {
      backgroundColor: colors.secondaryGray,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    archivedText: {
      fontSize: 11,
      fontFamily: 'Afacad-SemiBold',
      color: colors.textSecondary,
    },
    emptyText: {
      marginTop: 16,
      fontSize: 15,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      maxWidth: 280,
      lineHeight: 22,
    },
    errorText: {
      fontSize: 15,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryRed,
      textAlign: 'center',
    },
  });
