import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F4F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: { elevation: 5 },
      web: { boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' },
    }),
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconSuccess: {
    backgroundColor: 'rgba(34, 139, 57, 0.1)', // Fundo verde claro
  },
  iconError: {
    backgroundColor: 'rgba(211, 47, 47, 0.1)', // Fundo vermelho claro
  },
  title: {
    fontSize: 24,
    fontFamily: 'Afacad-Bold',
    color: '#003366',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    fontFamily: 'Afacad-Regular',
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  receiptLink: {
    fontSize: 14,
    fontFamily: 'Afacad-Bold',
    color: '#005A93',
    textDecorationLine: 'underline',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#005A93',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Afacad-Bold',
    fontSize: 16,
  },
});
