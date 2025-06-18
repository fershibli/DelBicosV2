import React from 'react';
import {
  buttonColorVariants,
  buttonSizeVariants,
  ButtonColorVariantsKeys,
  ButtonSizeVariantsKeys,
} from './variants';
import { Styled } from './styled';

export interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  variant?: ButtonColorVariantsKeys;
  size?: ButtonSizeVariantsKeys;
  disabled?: boolean;
  selected?: boolean;
  style?: React.CSSProperties;
}

export const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  selected = false,
  style = {},
}) => {
  const buttonColor = buttonColorVariants[variant];
  const buttonSize = buttonSizeVariants[size];

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
      }}>
      {children}
    </Styled.Button>
  );
};

export default ButtonComponent;
