import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  statusContainer: {
    marginBottom: 20,
  },
  statusBanner: {
    backgroundColor: '#22843B',
    borderWidth: 1,
    borderColor: '#22843B',
    borderRadius: 3,
    width: '40%',
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  reminderButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  reminderText: {
    fontSize: 9,
    lineHeight: 11,
    color: '#000000',
  },
});
