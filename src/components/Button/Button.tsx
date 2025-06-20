import React from 'react';
import {
  buttonColorVariants,
  buttonSizeVariants,
  ButtonColorVariantsKeys,
  ButtonSizeVariantsKeys,
} from './variants';
import { ButtonProps as MUIButtonProps } from '@mui/material';

import { Styled } from './styled';

export interface ButtonProps extends MUIButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  colorVariant?: ButtonColorVariantsKeys;
  sizeVariant?: ButtonSizeVariantsKeys;
  disabled?: boolean;
  selected?: boolean;
  style?: React.CSSProperties;
}

export const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  onClick,
  colorVariant = 'primary',
  sizeVariant = 'medium',
  disabled = false,
  selected = false,
  style = {},
  ...muiProps
}) => {
  const buttonColor = buttonColorVariants[colorVariant];
  const buttonSize = buttonSizeVariants[sizeVariant];

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
      hoverColors={buttonColor.hover ? hoverColors : undefined}
      disabledColors={disabledColors}
      style={{
        ...style,
      }}
      {...muiProps}>
      {children}
    </Styled.Button>
  );
};

export default ButtonComponent;
