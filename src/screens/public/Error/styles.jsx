import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: '#FC8200',
      borderRadius: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 36,
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: 10,
    },
    descriptionText: {
      fontSize: 18,
      fontWeight: '400',
      color: '#FFFFFF',
      marginBottom: 30,
    },
    button: {
      backgroundColor: "#005A93",
      width: 260,
      height: 50,
      borderRadius: 35,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 20,
      fontWeight: '400',
      color: '#DDE6F0',
    }
  });

export default styles;