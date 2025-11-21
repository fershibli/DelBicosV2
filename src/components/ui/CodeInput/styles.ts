import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    codeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '60%',
      marginBottom: 20,
    },
    codeInput: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: colors.primaryBlue,
      borderRadius: 8,
      textAlign: 'center',
      fontSize: 20,
    },
  });
