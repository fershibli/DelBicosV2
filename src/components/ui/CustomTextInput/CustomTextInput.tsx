import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { createStyles } from './styles';
import { FieldError } from 'react-hook-form';
import { useColors } from '@theme/ThemeProvider';
import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types';

interface CustomTextInputProps extends TextInputProps {
  label: string;
  error?: FieldError;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  children,
  containerStyle,
  ...rest
}) => {
  const { theme } = useThemeStore();
  const isHighContrast = theme === ThemeMode.LIGHT_HI_CONTRAST;
  const colors = useColors();
  const styles = createStyles(colors);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, isHighContrast && { fontWeight: 'bold' }]}>
        {label}
      </Text>
      <View>
        {children ? (
          children
        ) : (
          <TextInput
            style={[
              styles.input,
              !!error && styles.inputError,
              isHighContrast && {
                borderWidth: 2,
                borderColor: colors.primaryBlack,
              },
            ]}
            placeholderTextColor={colors.textTertiary}
            {...rest}
          />
        )}
      </View>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

export default CustomTextInput;
