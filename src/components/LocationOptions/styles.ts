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
    paddingHorizontal: 12,
    paddingVertical: 10,
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
    fontFamily: 'Afacad-Regular',
    textAlign: 'center',
  },

  buttonLogin: {
    gap: 10,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 7,
    borderRadius: 60,
    marginVertical: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonLoginText: {
    color: '#000000',
    fontSize: 32,
    fontFamily: 'Afacad-Regular',
    textAlign: 'center',
  },
});
