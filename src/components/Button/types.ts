import { ViewStyle, TextStyle } from 'react-native';

export interface ButtonStyleProps {
  defaultColors: {
    backgroundColor: string;
    color: string;
  };
  defaultFont: {
    fontSize: number;
    fontFamily: string;
  };
  defaultSize: {
    borderRadius: number;
    paddingVertical: number;
    paddingHorizontal: number;
  };
  hoverColors?: {
    backgroundColor: string;
    color: string;
  };
  disabledColors?: {
    backgroundColor: string;
    color: string;
  };
  noWrap?: boolean;
  variant?: 'contained' | 'outlined';
}

export interface ButtonProps {
  onPress: () => void;
  colorVariant?: 'primary' | 'secondary' | 'primaryWhite' | 'primaryGreen';
  sizeVariant?: 'medium' | 'large' | 'xLarge' | 'smallPill' | 'largePill';
  fontVariant?: 'AfacadRegular32' | 'AfacadRegular20' | 'AfacadRegular15';
  disabled?: boolean;
  variant?: 'contained' | 'outlined';
  noWrap?: boolean;
  children?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  style?: any;
}

export interface ButtonStyles {
  container: ViewStyle;
  text: TextStyle;
  icon: ViewStyle;
  state: {
    hover: {
      container: ViewStyle;
      text: TextStyle;
    };
    disabled: {
      container: ViewStyle;
      text: TextStyle;
    };
  };
}

export type ButtonColorVariantsKeys = 'primary' | 'secondary' | 'primaryWhite' | 'primaryGreen';
export type ButtonSizeVariantsKeys = 'medium' | 'large' | 'xLarge' | 'smallPill' | 'largePill';
export type ButtonFontVariantsKeys = 'AfacadRegular32' | 'AfacadRegular20' | 'AfacadRegular15';