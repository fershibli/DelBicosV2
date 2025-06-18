import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  input: {
    backgroundColor: '#ffffff',
    borderRadius: 60,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
    marginVertical: 10,
  },

  button: {
    gap: 10,
    flexDirection: 'row',
    backgroundColor: '#005A93',
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 7,
    borderRadius: 60,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 32,
    fontFamily: 'Afacad',
    textAlign: 'center',
  },

  logoLocal: {
    width: 24,
    height: 24,
    marginRight: 8, // Espaçamento entre o ícone e o texto
  },
});
