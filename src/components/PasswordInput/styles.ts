import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CED4DA',
    height: 50,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Afacad-Regular',
    color: '#212529',
  },
  inputError: {
    borderColor: '#D32F2F',
    borderWidth: 1.5,
  },
  eyeButton: {
    padding: 12,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#6c757d',
  },
});
