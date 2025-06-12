import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    //background
    flex: 1,
    backgroundColor: '#ff7f00',
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
  },

  footer: {
    position: 'absolute',
    bottom: 10,
    fontSize: 12,
    alignSelf: 'center',
    color: '#ffffff',
  },
});
