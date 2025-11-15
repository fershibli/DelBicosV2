import { StyleSheet, Platform } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryOrange,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.primaryWhite,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.primaryBlack,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.2)`,
      },
    }),
  },
  title: {
    fontSize: 28,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryBlue,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Afacad-Regular',
    color: '#6c757d',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    height: 50,
    backgroundColor: colors.primaryBlue,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.primaryWhite,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Afacad-Bold',
  },
  buttonSecondary: {
    backgroundColor: colors.primaryWhite,
    borderWidth: 1.5,
    borderColor: colors.primaryBlue,
  },
  buttonTextSecondary: {
    color: colors.primaryBlue,
  },
  linkText: {
    marginTop: 20,
    color: colors.primaryBlue,
    fontFamily: 'Afacad-Regular',
    fontSize: 14,
  },
  linkTextBold: {
    fontFamily: 'Afacad-Bold',
    textDecorationLine: 'underline',
  },
  footer: {
    padding: 10,
    textAlign: 'center',
    fontSize: 12,
    color: colors.primaryWhite,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryBlue,
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Afacad-Regular',
    color: '#495057',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButton: {
    width: '100%',
    marginTop: 0,
    backgroundColor: colors.primaryBlue,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleToggle: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
    justifyContent: 'center',
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
    backgroundColor: '#f0f0f0',
  },
  roleButtonActive: {
    backgroundColor: colors.primaryBlue,
  },
  roleText: {
    fontFamily: 'Afacad-Regular',
    color: '#333',
  },
  roleTextActive: {
    color: colors.primaryWhite,
    fontFamily: 'Afacad-Bold',
  },
});
