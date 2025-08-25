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
  header: {
    backgroundColor: '#e6f0fa',
    padding: 15,
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    resizeMode: 'contain',
  },
  logoText: {
    color: '#ff7f00',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#003366',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '50%',
    textAlign: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#ff7f00',
    padding: 12,
    borderRadius: 8,
    width: '20%',
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
});
