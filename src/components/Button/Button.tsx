import React, { useState } from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  View,
  TextStyle,
} from 'react-native';
import { ButtonProps } from './types';
import { Styled, baseStyles } from './styled';

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
  startIcon,
  endIcon,
  loading = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

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

  const handleHoverIn = () => {
    if (disabled || loading) return;
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };

  const containerStyle = isHovered
    ? [styles.container, styles.state.hover.container, style]
    : [styles.container, style];

  const textStyle = isHovered
    ? [styles.text, styles.state.hover.text]
    : styles.text;

  const indicatorColor = Array.isArray(textStyle) 
    ? (textStyle[0] as TextStyle)?.color || '#000000'
    : (textStyle as TextStyle)?.color || '#000000';

  return (
    <Pressable
      style={({ pressed }) => [
        containerStyle,
        pressed && { opacity: 0.8 }
      ]}
      onPress={handlePress}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      disabled={disabled || loading}
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
        <View style={baseStyles.contentContainer}>
          {startIcon && (
            <View style={styles.startIcon}>
              {startIcon}
            </View>
          )}
          <Text 
            style={textStyle} 
            numberOfLines={noWrap ? 1 : undefined}
          >
            {children}
          </Text>
          {endIcon && (
            <View style={styles.endIcon}>
              {endIcon}
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
};

export default ButtonComponent;
