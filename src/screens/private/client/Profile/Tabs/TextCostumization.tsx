import React from 'react';
import { Text, TextStyle, StyleProp, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>; 
};

const TextCostumization: React.FC<Props> = ({ style, children, ...props }) => (
  <Text
    style={[styles.defaultText, style]}
    {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    color: '#000000',
  },
});

export default TextCostumization;