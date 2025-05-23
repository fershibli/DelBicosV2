import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: import('react-native').StyleProp<import('react-native').ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F5A623',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('6%'),
    width: wp('90%'),
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: wp('4%'),
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Button;