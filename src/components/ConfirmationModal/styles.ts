import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Afacad-Bold',
    color: '#003366',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Afacad-Regular',
    color: '#495057',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F1F1F1',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  confirmButton: {
    backgroundColor: '#D32F2F', // Cor vermelha para ação destrutiva
  },
  buttonText: {
    fontFamily: 'Afacad-Bold',
    fontSize: 16,
  },
  cancelButtonText: {
    color: '#333',
  },
});
