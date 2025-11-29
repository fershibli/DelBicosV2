import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 6,
    borderRadius: 8,
    ...Platform.select({
      web: {
        display: 'flex',
      },
    }),
  },
  button: {
    padding: 10,
    marginHorizontal: 3,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      },
    }),
  },
  buttonActive: {
    backgroundColor: '#DDE6F0',
    borderColor: '#005A93',
    borderWidth: 2,
  },
});
