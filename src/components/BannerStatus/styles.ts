import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  statusBanner: {
    width: '80%',
    maxWidth: 400,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  reminderButton: {
    marginTop: 10,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#E3F2FD',
  },
  reminderText: {
    fontSize: 12,
    color: '#0D47A1',
    fontWeight: '500',
  },
});
