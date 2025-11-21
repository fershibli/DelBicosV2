import { StyleSheet, Platform } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    loadingContainer: {
      width: '100%',
      minHeight: 146,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      paddingBottom: 20,
    },
    categoryCard: {
      flex: 1,
      margin: 8,
      padding: 16,
      borderRadius: 12,
      height: 140,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.borderColor,
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 4,
        },
        web: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease-in-out',
        },
      }),
    },
    categoryCardHovered: {
      ...Platform.select({
        web: {
          backgroundColor: colors.primaryBlue,
          borderColor: colors.primaryBlue,
          transform: [{ scale: 1.05 }],
        },
      }),
    },
    categoryTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryOrange,
      textAlign: 'center',
      marginTop: 10,
    },
    categoryTitleHovered: {
      color: '#E2E8F0',
    },
  });
