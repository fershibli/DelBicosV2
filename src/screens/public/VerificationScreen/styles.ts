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
  card: {
    width: '100%',
    maxWidth: 450,
    backgroundColor: colors.primaryWhite,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  title: {
    fontSize: 28,
    fontFamily: 'Afacad-Bold',
    color: '#003366',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Afacad-Regular',
    color: '#6c757d',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  emailText: {
    fontFamily: 'Afacad-Bold',
    color: '#003366',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
  },
  codeInput: {
    width: 48,
    height: 52,
    borderWidth: 2,
    borderColor: '#CED4DA',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Afacad-Bold',
    color: '#003366',
  },
  button: {
    height: 50,
    backgroundColor: '#003366',
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.primaryWhite,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Afacad-Bold',
  },
  footer: {
    padding: 10,
    textAlign: 'center',
    fontSize: 12,
    color: colors.primaryWhite,
  },
});
