import { StyleSheet, Platform } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
      zIndex: 10,
      position: 'relative',
    },
    inputContainer: {
      position: 'relative',
      zIndex: 1,
      width: '100%',
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: 4,
      backgroundColor: colors.primaryWhite,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#E0E0E0',
      maxHeight: 200,
      zIndex: 9999,

      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        },
        android: {
          elevation: 8,
        },
        web: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        },
      }),
    },
    item: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#F5F5F5',
      ...Platform.select({
        web: { cursor: 'pointer' } as any,
      }),
    },
    itemText: {
      fontSize: 16,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlack,
    },
    emptyText: {
      padding: 16,
      textAlign: 'center',
      color: '#999',
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
    },
  });
