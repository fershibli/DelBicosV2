import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { FieldError } from 'react-hook-form';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';
import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: FieldError | string | undefined;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  children,
  containerStyle,
  style,
  ...rest
}) => {
  const { theme } = useThemeStore();
  const isHighContrast = theme === ThemeMode.LIGHT_HI_CONTRAST;
  const colors = useColors();
  const styles = createStyles(colors);

  const errorMessage = typeof error === 'string' ? error : error?.message;
  const hasError = !!errorMessage;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, isHighContrast && { fontWeight: 'bold' }]}>
          {label}
        </Text>
      )}

      <View>
        {children ? (
          children
        ) : (
          <TextInput
            style={[
              styles.input,
              hasError && styles.inputError,
              isHighContrast && {
                borderWidth: 2,
                borderColor: colors.primaryBlack,
                backgroundColor: colors.primaryWhite,
              },
              style,
            ]}
            placeholderTextColor={colors.textTertiary}
            accessibilityLabel={label}
            {...rest}
          />
        )}
      </View>

      {hasError && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default CustomTextInput;
