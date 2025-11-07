import { StyleSheet } from 'react-native';
import { inputBaseStyle } from '@components/ui/CustomTextInput/styles';

export const styles = StyleSheet.create({
  input: {
    ...inputBaseStyle.input,
    width: '100%',
  },
  inputError: {
    ...inputBaseStyle.inputError,
  },
});
