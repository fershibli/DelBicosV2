import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: '#003366',
    fontFamily: 'Afacad-SemiBold',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50, // Altura fixa para consistência
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CED4DA',
    fontFamily: 'Afacad-Regular',
  },
  inputError: {
    borderColor: '#D32F2F',
    borderWidth: 1.5, // Destaque maior para o erro
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'Afacad-Regular',
  },
});
