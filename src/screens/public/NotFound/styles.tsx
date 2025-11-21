import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: colors.primaryOrange,
      borderRadius: 45,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 36,
      fontWeight: '700',
      color: colors.primaryWhite,
      marginBottom: 10,
    },
    descriptionText: {
      fontSize: 18,
      fontWeight: '400',
      color: colors.primaryWhite,
      marginBottom: 30,
    },
    button: {
      backgroundColor: colors.primaryBlue,
      width: 260,
      height: 50,
      borderRadius: 35,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 20,
      fontWeight: '400',
      color: colors.secondaryGray,
    },
  });

export default createStyles;
