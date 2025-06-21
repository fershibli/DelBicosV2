import { StyleSheet, Dimensions } from 'react-native';

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
    position: 'absolute', // Adicionado para consistência com web
    right: 10, // Adicionado para consistência com web
    cursor: 'pointer', // Adicionado para consistência com web
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

  // styles for web
  containerweb: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#e6f0fa',
  },
  header: {
    backgroundColor: '#003366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    height: 40,
    width: 100, // Adicionado para controle de proporção
    objectFit: 'contain', // Adicionado para web e mobile (quando suportado)
  },
  logoText: {
    color: '#ff7f00',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    color: '#ffffff',
    textDecorationLine: 'none',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    cursor: 'pointer',
  },
  navButton: {
    backgroundColor: '#ff7f00',
    color: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: '5px',
    textDecorationLine: 'none',
    fontSize: 16,
    cursor: 'pointer',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  titleweb: {
    color: '#003366',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#d9e6f2',
    padding: 20,
    borderRadius: '10px',
    width: '100%',
    maxWidth: 600,
  },
  formRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: 15,
  },
  inputweb: {
    flex: 1,
    minWidth: 150,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  select: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    minWidth: 80,
  },
  locationButtonweb: {
    backgroundColor: '#003366',
    color: '#ffffff',
    padding: 8,
    borderWidth: 0,
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 16,
  },
  passwordWrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  eyeIconweb: {
    position: 'absolute',
    right: 10,
    cursor: 'pointer',
  },
  passwordFeedback: {
    fontSize: 12,
    color: '#ff4444',
    marginTop: 5,
  },
  checkbox: {
    marginRight: 10,
  },
  termsLabel: {
    color: '#003366',
    fontSize: 14,
  },
  termsLink: {
    color: '#ff7f00',
    textDecorationLine: 'underline',
    cursor: 'pointer',
  },
  footerweb: {
    backgroundColor: '#003366',
    color: '#ffffff',
    textAlign: 'center',
    padding: 10,
    fontSize: 12,
  },
});
