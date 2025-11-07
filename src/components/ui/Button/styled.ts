import { ButtonStyleProps, ButtonStyles } from "@components/Button/types";
import { TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from 'react-native';
import { 
  ButtonColorVariantsKeys, 
  ButtonSizeVariantsKeys, 
  ButtonFontVariantsKeys 
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
  contentContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
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

  const shouldHaveBorder = isOutlined || backgroundColor === 'transparent';

  const containerStyle: ViewStyle = {
    backgroundColor: backgroundColor,
    borderRadius: defaultSize.borderRadius,
    paddingVertical: defaultSize.paddingVertical,
    paddingHorizontal: defaultSize.paddingHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...(shouldHaveBorder && {
      borderWidth: 1.5,
      borderColor: color,
    }),
  };

  const textStyle: TextStyle = {
    fontSize: defaultFont.fontSize,
    fontFamily: defaultFont.fontFamily,
    color: color,
    textAlign: 'center',
    ...(noWrap && {
      flexShrink: 1,
    }),
  };

  const startIconStyle: ViewStyle = {
    marginRight: 8,
  };

  const endIconStyle: ViewStyle = {
    marginLeft: 8,
  };

  const stateStyles = {
    hover: {
      container: {
        backgroundColor: hoverColors?.backgroundColor || backgroundColor,
        ...(shouldHaveBorder && hoverColors?.color && {
          borderColor: hoverColors.color,
        }),
      } as ViewStyle,
      text: {
        color: hoverColors?.color || color,
      } as TextStyle,
    },
    disabled: {
      container: {
        backgroundColor: disabledColors?.backgroundColor || backgroundColor,
        ...(shouldHaveBorder && {
          borderColor: disabledColors?.color || color,
        }),
      } as ViewStyle,
      text: {
        color: disabledColors?.color || color,
      } as TextStyle,
    },
  };

  return {
    container: containerStyle,
    text: textStyle,
    startIcon: startIconStyle,
    endIcon: endIconStyle,
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
      startIcon: styles.startIcon,
      endIcon: styles.endIcon,
      state: styles.state,
    };
  }

  return styles;
};

export const Styled = {
  createButton: createStyledButton,
  fromVariants: getStyledButtonFromVariants,
};