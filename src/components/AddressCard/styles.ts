import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    flexWrap: 'wrap', // Permite que os itens quebrem a linha em telas menores
  },
  inputReadOnly: {
    backgroundColor: '#F4F7FA',
    color: '#6c757d',
    borderRadius: 8,
    borderColor: '#CED4DA',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CED4DA',
    fontFamily: 'Afacad-Regular',
  },
  actionsRow: {
    position: 'absolute',
    right: 16,
    top: 16,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    zIndex: 10,
  },
  saveRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 10,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#003366',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Afacad-Bold',
  },
  cancelButtonText: {
    color: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    justifyContent: 'center', // Centraliza o Picker verticalmente
    backgroundColor: '#FFFFFF',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CED4DA',
    fontFamily: 'Afacad-Regular',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
});
