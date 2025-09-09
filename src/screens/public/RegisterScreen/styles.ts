import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0fa',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 50, // Espaço para o rodapé
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  locationInput: {
    flex: 1,
  },
  locationButton: {
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
  },
  eyeButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    fontSize: 20,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#003366',
  },
  button: {
    backgroundColor: '#ff7f00',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    fontSize: 12,
    color: '#003366',
  },
  // Linhas adicionadas para estilizar os erros
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
});
