import { StyleSheet } from 'react-native';
import { createInputBaseStyle } from '@components/ui/CustomTextInput/styles';

export const createStyles = (colors: any) => {
  const inputBaseStyle = createInputBaseStyle(colors);
  return StyleSheet.create({
    input: {
      ...inputBaseStyle.input,
      width: '100%',
    },
    inputError: {
      ...inputBaseStyle.inputError,
    },
  });
};
