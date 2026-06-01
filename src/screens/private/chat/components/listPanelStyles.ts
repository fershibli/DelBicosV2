import { StyleSheet } from 'react-native';
import { ColorsType } from '@theme/types';

export const createListPanelStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primaryWhite,
      minHeight: 0,
    },
    listHeader: {
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.divider,
    },
    listHeaderTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
    },
    listContent: {
      paddingVertical: 4,
    },
    emptyContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.divider,
    },
    rowSelected: {
      backgroundColor: colors.inputBackground,
      borderLeftWidth: 3,
      borderLeftColor: colors.primaryOrange,
    },
    avatarWrapper: {
      marginRight: 12,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.inputBackground,
    },
    avatarFallback: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primaryOrange,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rowContent: {
      flex: 1,
      minWidth: 0,
    },
    rowHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    name: {
      flex: 1,
      fontSize: 15,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginRight: 8,
    },
    nameSelected: {
      color: colors.primaryOrange,
    },
    serviceTitle: {
      fontSize: 12,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
      marginTop: 2,
    },
    time: {
      fontSize: 11,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
    },
    preview: {
      flex: 1,
      fontSize: 13,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
      marginTop: 2,
      marginRight: 8,
    },
    archivedBadge: {
      backgroundColor: colors.secondaryGray,
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    archivedText: {
      fontSize: 10,
      fontFamily: 'Afacad-SemiBold',
      color: colors.textSecondary,
    },
    emptyText: {
      marginTop: 12,
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      maxWidth: 240,
      lineHeight: 20,
    },
    errorText: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryRed,
      textAlign: 'center',
    },
  });
