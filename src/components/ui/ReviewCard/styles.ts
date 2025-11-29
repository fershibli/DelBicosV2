import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      minWidth: 280,
      maxWidth: 320,
    },
    ratingContainer: {
      marginBottom: 8,
    },
    stars: {
      alignSelf: 'flex-start',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primaryBlack || '#000',
      marginBottom: 4,
    },
    service: {
      fontSize: 14,
      color: colors.textGray || '#666',
      marginBottom: 8,
    },
    reviewText: {
      fontSize: 13,
      color: colors.primaryBlack || '#000',
      lineHeight: 20,
      marginBottom: 12,
      fontStyle: 'italic',
    },
    clientContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: colors.secondaryBeige || '#f0f0f0',
      paddingTop: 12,
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginRight: 8,
    },
    clientInfo: {
      flex: 1,
    },
    clientName: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.primaryBlack || '#000',
      marginBottom: 2,
    },
    date: {
      fontSize: 11,
      color: colors.textGray || '#999',
    },
  });
