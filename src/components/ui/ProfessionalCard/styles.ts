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
          transition: 'transform 0.2s ease-in-out',
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
    Name: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryOrange,
    },
    Category: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlack,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    Rating: {
      fontSize: 12,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlack,
      marginLeft: 4,
      marginRight: 2,
    },
    RatingCount: {
      fontSize: 12,
      fontFamily: 'Afacad-Regular',
      color: '#6c757d',
    },
    Location: {
      fontSize: 12,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlue,
      marginTop: 4,
    },
  });
