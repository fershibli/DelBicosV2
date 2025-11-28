import { StyleSheet, Platform } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: colors.primaryWhite,
      borderRadius: 12,
      margin: 8,
      height: 100,
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
        },
        android: {
          elevation: 3,
        },
        web: {
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
        },
      }),
    },
    image: {
      width: 90,
      height: '100%',
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
    },
    content: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
      justifyContent: 'center',
    },
    name: {
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryOrange,
      marginBottom: 2,
    },
    services: {
      fontSize: 13,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlack,
      marginBottom: 4,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    rating: {
      fontSize: 12,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginLeft: 4,
    },
    ratingCount: {
      fontSize: 12,
      fontFamily: 'Afacad-Regular',
      color: '#6c757d',
      fontWeight: 'normal',
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 2,
    },
    location: {
      fontSize: 12,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlue,
      flex: 1,
      marginRight: 8,
    },
    distanceBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primaryBlue,
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 4,
    },
    distanceText: {
      color: colors.primaryWhite,
      fontSize: 10,
      fontFamily: 'Afacad-Bold',
      marginLeft: 2,
    },
  });
