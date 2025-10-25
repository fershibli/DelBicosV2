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
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  title: {
    fontSize: 28,
    fontFamily: 'Afacad-Bold',
    color: '#003366',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Afacad-Regular',
    color: '#6c757d',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.primaryWhite,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CED4DA',
    fontFamily: 'Afacad-Regular',
    color: '#212529',
    width: '100%',
    textAlign: 'center',
  },
  button: {
    height: 50,
    backgroundColor: '#003366',
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: colors.primaryWhite,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Afacad-Bold',
  },
  linkText: {
    marginTop: 24,
    color: '#003366',
    fontFamily: 'Afacad-Bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  footer: {
    padding: 10,
    textAlign: 'center',
    fontSize: 12,
    color: colors.primaryWhite,
  },
});
