import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  TextStyle,
} from 'react-native';
import { ButtonProps } from './types';
import { Styled } from './styled';
import { baseStyles } from './styled';

export const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  onPress,
  colorVariant = 'primary',
  sizeVariant = 'medium',
  fontVariant = 'AfacadRegular20',
  disabled = false,
  variant = 'contained',
  noWrap = false,
  style = {},
  endIcon,
  loading = false,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const styles = Styled.fromVariants(
    colorVariant,
    sizeVariant,
    fontVariant,
    variant,
    disabled || loading,
    noWrap
  );

  const handlePress = () => {
    if (disabled || loading) return;
    onPress();
  };

  const handlePressIn = () => {
    if (disabled || loading) return;
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const containerStyle = isPressed
    ? [styles.container, styles.state.hover.container, style]
    : [styles.container, style];

  const textStyle = isPressed
    ? [styles.text, styles.state.hover.text]
    : styles.text;

  const indicatorColor = Array.isArray(textStyle) 
    ? (textStyle[0] as TextStyle)?.color || '#000000'
    : (textStyle as TextStyle)?.color || '#000000';

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <View style={baseStyles.loadingContainer}>
          <ActivityIndicator 
            size="small" 
            color={indicatorColor} 
          />
          <Text style={[textStyle, baseStyles.loadingText]}>
            Carregando...
          </Text>
        </View>
      ) : (
        <>
          <Text 
            style={textStyle} 
            numberOfLines={noWrap ? 1 : undefined}
          >
            {children}
          </Text>
          {endIcon && (
            <View style={styles.icon}>
              {endIcon}
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;