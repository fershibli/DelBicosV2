import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F7FA',
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
    filterBar: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 20,
      gap: 16,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primaryWhite,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.secondaryBeige,
    },
    filterButtonText: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      marginRight: 8,
    },
    cardWrapper: {
      width: '50%',
      padding: 8,
    },
    footer: {
      padding: 20,
      textAlign: 'center',
      fontSize: 12,
      color: '#6c757d',
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
      color: '#666',
      textAlign: 'center',
      fontFamily: 'Afacad-Regular',
      lineHeight: 24,
    },
  });
