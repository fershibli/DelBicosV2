import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  StyleProp, 
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  View
} from 'react-native';
import {
  buttonColorVariants,
  buttonSizeVariants,
  buttonFontVariants,
  ButtonColorVariantsKeys,
  ButtonSizeVariantsKeys,
  ButtonFontVariantsKeys,
} from './variants';

export interface ButtonProps {
  children?: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  colorVariant?: ButtonColorVariantsKeys;
  sizeVariant?: ButtonSizeVariantsKeys;
  fontVariant?: ButtonFontVariantsKeys;
  disabled?: boolean;
  selected?: boolean;
  noWrap?: boolean;
  style?: StyleProp<ViewStyle>;
  endIcon?: React.ReactNode;
}

export const ButtonNative: React.FC<ButtonProps> = ({
  children,
  onPress,
  colorVariant = 'primary',
  sizeVariant = 'medium',
  fontVariant = 'AfacadRegular20',
  disabled = false,
  noWrap = false,
  style = {},
  endIcon,
  ...props
}) => {
  const buttonColor = buttonColorVariants[colorVariant];
  const buttonSize = buttonSizeVariants[sizeVariant];
  const buttonFont = buttonFontVariants[fontVariant];

  const getBaseButtonStyle = (): ViewStyle => {
    return {
      backgroundColor: disabled ? buttonColor.disabled.backgroundColor : buttonColor.backgroundColor,
      borderRadius: buttonSize.borderRadius,
      paddingHorizontal: buttonSize.paddingHorizontal,
      paddingVertical: buttonSize.paddingVertical,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      opacity: disabled ? 0.6 : 1,
    };
  };

  const getTextStyle = (): TextStyle => {
    const textStyle: TextStyle = {
      color: disabled ? buttonColor.disabled.color : buttonColor.color,
      fontFamily: buttonFont.fontFamily,
      fontSize: buttonFont.fontSize,
      textAlign: 'center',
    };

    if (noWrap) {
      textStyle.flexShrink = 1;
    }

    return textStyle;
  };

  return (
    <TouchableOpacity
      style={[getBaseButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={getTextStyle()}>{children}</Text>
      {endIcon && <View style={{ marginLeft: 4 }}>{endIcon}</View>}
    </TouchableOpacity>
  );
};

export default ButtonNative;