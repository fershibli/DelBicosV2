import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { styles } from './styles';
import { FieldError } from 'react-hook-form';
import colors from '@theme/colors';

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
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View>
        {children ? (
          children
        ) : (
          <TextInput
            style={[styles.input, !!error && styles.inputError]}
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
