import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    //background
    flex: 1,
    backgroundColor: '#FC8200',
  },

  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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

  footer: {
    position: 'absolute',
    bottom: 10,
    fontSize: 12,
    alignSelf: 'center',
    color: '#ffffff',
  },
});
