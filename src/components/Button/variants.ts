import colors from '@theme/colors';
import { TextStyle, ViewStyle } from 'react-native';

export const buttonFontVariants = {
  AfacadRegular32: {
    fontFamily: 'Afacad-Regular',
    fontSize: 32,
  },
  AfacadRegular20: {
    fontFamily: 'Afacad-Regular',
    fontSize: 20,
  },
  AfacadRegular15: {
    fontFamily: 'Afacad-Regular',
    fontSize: 15,
  },
  AfacadSemiBold14: {
    fontFamily: 'Afacad-SemiBold',
    fontSize: 14,
  },
    AfacadBold16: {
    fontFamily: 'Afacad-Bold',
    fontSize: 16,
  }
};

export const buttonSizeVariants = {
  medium: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  large: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  xLarge: {
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  smallPill: {
    borderRadius: 50,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  largePill: {
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modalButton: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
};

export const buttonColorVariants = {
  primary: {
    backgroundColor: colors.primaryBlue,
    color: colors.primaryWhite,
    hover: {
      backgroundColor: colors.primaryOrange,
      color: colors.primaryWhite,
    },
    disabled: {
      backgroundColor: '#D3D3D3',
      color: '#A9A9A9',
    },
  },
  secondary: {
    backgroundColor: colors.primaryOrange,
    color: colors.primaryWhite,
    hover: {
      backgroundColor: colors.primaryBlue,
      color: colors.primaryWhite,
    },
    disabled: {
      backgroundColor: '#D3D3D3',
      color: '#A9A9A9',
    },
  },
  primaryWhite: {
    backgroundColor: colors.primaryWhite,
    color: colors.primaryBlack,
    hover: {
      backgroundColor: colors.primaryWhiteHover,
      color: colors.primaryBlue,
    },
    disabled: {
      backgroundColor: '#D3D3D3',
      color: '#A9A9A9',
    },
  },
  primaryGreen: {
    backgroundColor: colors.primaryGreen,
    color: colors.primaryWhite,
    hover: {
      backgroundColor: colors.primaryWhite,
      color: colors.primaryGreen,
    },
    disabled: {
      backgroundColor: '#D3D3D3',
      color: '#A9A9A9',
    },
    modalPrimary: {
    backgroundColor: colors.primaryOrange,
    color: colors.primaryWhite,
    hover: {
      backgroundColor: colors.primaryOrange,
      color: colors.primaryWhite,
    },
    disabled: {
      backgroundColor: '#CCCCCC',
      color: '#A9A9A9',
    },
  },
  },
};

export const getButtonStyles = (
  colorVariant: ButtonColorVariantsKeys = 'primary',
  sizeVariant: ButtonSizeVariantsKeys = 'medium',
  fontVariant: ButtonFontVariantsKeys = 'AfacadRegular20',
  variant: 'contained' | 'outlined' = 'contained',
  disabled: boolean = false
): { container: ViewStyle; text: TextStyle; icon: ViewStyle } => {
  const buttonColor = buttonColorVariants[colorVariant];
  const buttonSize = buttonSizeVariants[sizeVariant];
  const buttonFont = buttonFontVariants[fontVariant];

  const isOutlined = variant === 'outlined';
  
  const backgroundColor = disabled 
    ? (buttonColor.disabled?.backgroundColor || buttonColor.backgroundColor)
    : (isOutlined ? 'transparent' : buttonColor.backgroundColor);

  const textColor = disabled 
    ? (buttonColor.disabled?.color || buttonColor.color)
    : (isOutlined ? buttonColor.backgroundColor : buttonColor.color);

  const containerStyle: ViewStyle = {
    backgroundColor,
    borderRadius: buttonSize.borderRadius,
    paddingVertical: buttonSize.paddingVertical,
    paddingHorizontal: buttonSize.paddingHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    opacity: disabled ? 0.6 : 1,
    ...(isOutlined && {
      borderWidth: 2,
      borderColor: buttonColor.backgroundColor,
    }),
  };

  const textStyle: TextStyle = {
    fontSize: buttonFont.fontSize,
    fontFamily: buttonFont.fontFamily,
    color: textColor,
    textAlign: 'center',
  };

  const iconStyle: ViewStyle = {
    marginLeft: 8,
  };

  return {
    container: containerStyle,
    text: textStyle,
    icon: iconStyle,
  };
};


export type ButtonFontVariantsType = typeof buttonFontVariants;
export type ButtonColorVariantsType = typeof buttonColorVariants;
export type ButtonSizeVariantsType = typeof buttonSizeVariants;
export type ButtonFontVariantsKeys = keyof typeof buttonFontVariants;
export type ButtonColorVariantsKeys = keyof typeof buttonColorVariants;
export type ButtonSizeVariantsKeys = keyof typeof buttonSizeVariants;
