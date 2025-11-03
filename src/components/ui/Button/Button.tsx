import React from 'react';
import {
  buttonColorVariants,
  buttonSizeVariants,
  ButtonColorVariantsKeys,
  ButtonSizeVariantsKeys,
  ButtonFontVariantsKeys,
  buttonFontVariants,
} from './variants';
import { ButtonProps as MUIButtonProps } from '@mui/material';

import { Styled } from './styled';

export interface ButtonProps extends MUIButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  colorVariant?: ButtonColorVariantsKeys;
  sizeVariant?: ButtonSizeVariantsKeys;
  fontVariant?: ButtonFontVariantsKeys;
  disabled?: boolean;
  selected?: boolean;
  noWrap?: boolean;
  style?: React.CSSProperties;
}

export const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  onClick,
  colorVariant = 'primary',
  sizeVariant = 'medium',
  fontVariant = 'AfacadRegular20',
  disabled = false,
  selected = false,
  noWrap = false,
  style = {},
  ...muiProps
}) => {
  const buttonColor = buttonColorVariants[colorVariant];
  const buttonSize = buttonSizeVariants[sizeVariant];
  const buttonFont = buttonFontVariants[fontVariant];

  const hoverColors = buttonColor.hover;
  const disabledColors = buttonColor.disabled;
  const defaultColors = {
    backgroundColor: buttonColor.backgroundColor,
    color: buttonColor.color,
  };

  return (
    <Styled.Button
      onClick={onClick}
      disabled={disabled}
      defaultColors={defaultColors}
      defaultSize={buttonSize}
      defaultFont={buttonFont}
      hoverColors={buttonColor.hover ? hoverColors : undefined}
      disabledColors={disabledColors}
      noWrap={noWrap}
      sx={{
        ...style,
      }}
      {...muiProps}>
      {children}
    </Styled.Button>
  );
};

export default ButtonComponent;
