import { ViewStyle, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { 
  ButtonStyleProps, 
  ButtonColorVariantsKeys, 
  ButtonSizeVariantsKeys, 
  ButtonFontVariantsKeys,
  ButtonStyles 
} from './types';
import { buttonColorVariants, buttonSizeVariants, buttonFontVariants } from './variants';

export const baseStyles = StyleSheet.create({
  loadingContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  loadingText: {
    marginLeft: 8,
  },
});

export const createStyledButton = (props: ButtonStyleProps): ButtonStyles => {
  const {
    defaultColors,
    defaultSize,
    defaultFont,
    hoverColors,
    disabledColors,
    noWrap,
    variant = 'contained',
  } = props;

  const isOutlined = variant === 'outlined';
  
  const backgroundColor = defaultColors.backgroundColor;
  const color = defaultColors.color;

  const containerStyle: ViewStyle = {
    backgroundColor: isOutlined ? 'transparent' : backgroundColor,
    borderRadius: defaultSize.borderRadius,
    paddingVertical: defaultSize.paddingVertical,
    paddingHorizontal: defaultSize.paddingHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...(isOutlined && {
      borderWidth: 2,
      borderColor: backgroundColor,
    }),
  };

  const textStyle: TextStyle = {
    fontSize: defaultFont.fontSize,
    fontFamily: defaultFont.fontFamily,
    color: isOutlined ? backgroundColor : color,
    textAlign: 'center',
    ...(noWrap && {
      flexShrink: 1,
    }),
  };

  const iconStyle: ViewStyle = {
    marginLeft: 8,
  };

  const stateStyles = {
    hover: {
      container: {
        backgroundColor: isOutlined 
          ? 'transparent' 
          : (hoverColors?.backgroundColor || backgroundColor),
        opacity: 0.8,
      } as ViewStyle,
      text: {
        color: isOutlined 
          ? (hoverColors?.backgroundColor || backgroundColor)
          : (hoverColors?.color || color),
      } as TextStyle,
    },
    disabled: {
      container: {
        backgroundColor: isOutlined 
          ? 'transparent' 
          : (disabledColors?.backgroundColor || backgroundColor),
        opacity: 0.6,
      } as ViewStyle,
      text: {
        color: isOutlined 
          ? (disabledColors?.backgroundColor || backgroundColor)
          : (disabledColors?.color || color),
      } as TextStyle,
    },
  };

  return {
    container: containerStyle,
    text: textStyle,
    icon: iconStyle,
    state: stateStyles,
  };
};

export const getStyledButtonFromVariants = (
  colorVariant: ButtonColorVariantsKeys = 'primary',
  sizeVariant: ButtonSizeVariantsKeys = 'medium',
  fontVariant: ButtonFontVariantsKeys = 'AfacadRegular20',
  variant: 'contained' | 'outlined' = 'contained',
  disabled: boolean = false,
  noWrap: boolean = false
): ButtonStyles => {
  const buttonColor = buttonColorVariants[colorVariant];
  const buttonSize = buttonSizeVariants[sizeVariant];
  const buttonFont = buttonFontVariants[fontVariant];

  const styleProps: ButtonStyleProps = {
    defaultColors: {
      backgroundColor: buttonColor.backgroundColor,
      color: buttonColor.color,
    },
    defaultSize: buttonSize,
    defaultFont: buttonFont,
    hoverColors: buttonColor.hover,
    disabledColors: buttonColor.disabled,
    noWrap,
    variant,
  };

  const styles = createStyledButton(styleProps);

  if (disabled) {
    return {
      container: { ...styles.container, ...styles.state.disabled.container },
      text: { ...styles.text, ...styles.state.disabled.text },
      icon: styles.icon,
      state: styles.state,
    };
  }

  return styles;
};

export const Styled = {
  createButton: createStyledButton,
  fromVariants: getStyledButtonFromVariants,
};