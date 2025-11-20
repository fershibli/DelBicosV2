import { StyleSheet } from 'react-native';
import colors from '@theme/colors';

export const inputBaseStyle = StyleSheet.create({
  input: {
    backgroundColor: colors.primaryWhite,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
    fontFamily: 'Afacad-Regular',
    color: colors.primaryBlack,
  },
  inputError: {
    borderColor: '#D32F2F',
    borderWidth: 1.5,
  },
});

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: colors.primaryBlue,
    fontFamily: 'Afacad-SemiBold',
  },
  input: {
    ...inputBaseStyle.input,
  },
  inputError: {
    ...inputBaseStyle.inputError,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'Afacad-Regular',
  },
});
