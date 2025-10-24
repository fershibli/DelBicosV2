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
  },
  button: {
    height: 50,
    backgroundColor: '#003366',
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginTop: 24,
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
    borderColor: '#003366',
  },
  buttonTextSecondary: {
    color: '#003366',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#CED4DA',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#6c757d',
    fontFamily: 'Afacad-Regular',
  },
  footer: {
    padding: 10,
    textAlign: 'center',
    fontSize: 12,
    color: colors.primaryWhite,
  },
});
