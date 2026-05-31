import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    listContainer: {
      paddingVertical: 8,
    },
    loadingContainer: {
      padding: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyContainer: {
      padding: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      color: colors.textTertiary,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      marginHorizontal: 16,
      marginVertical: 6,
      backgroundColor: colors.backgroundCard || '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
    },
    info: {
      flex: 1,
      marginRight: 12,
    },
    title: {
      color: colors.textPrimary,
      fontWeight: '700',
      marginBottom: 4,
    },
    description: {
      color: colors.textTertiary,
      fontSize: 13,
    },
    availability: {
      marginTop: 6,
      color: colors.textSecondary,
      fontSize: 12,
    },
    noAvailability: {
      marginTop: 6,
      color: '#ef4444',
      fontSize: 12,
      fontWeight: '700',
    },
    availableNow: {
      marginTop: 6,
      backgroundColor: '#16a34a',
      color: '#fff',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      fontSize: 12,
      alignSelf: 'flex-start',
      overflow: 'hidden',
    },
    price: {
      marginTop: 6,
      color: colors.primaryOrange,
      fontWeight: '700',
    },
    actionButton: {
      backgroundColor: colors.primaryOrange,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
    },
    actionText: {
      color: '#fff',
      fontWeight: '700',
    },
  });

export default createStyles;
