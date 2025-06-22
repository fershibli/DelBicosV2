import colors from '@theme/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FC8200',
    flex: 1,
    paddingTop: 20,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FC8200',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 1.3,
    elevation: 6,
  },

  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#005A93',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 10,
    width: 302,
  },

  buttonLogin: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 4,
    paddingBottom: 7,
    marginTop: 20,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Afacad',
    textAlign: 'center',
  },

  footer: {
    position: 'absolute',
    bottom: 10,
    fontSize: 12,
    alignSelf: 'center',
    color: '#ffffff',
  },

  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 32,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryOrange,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Afacad-SemiBold',
    color: colors.primaryBlack,
    textAlign: 'center',
  },
  modalActions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});
