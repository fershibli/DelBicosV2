import { StyleSheet } from 'react-native';
import colors from '@theme/colors';

// Função para retornar o texto e a cor com base no status
export const getStatusStyle = (
  status: 'pending' | 'confirmed' | 'completed' | 'canceled',
) => {
  switch (status) {
    case 'pending':
      return { text: 'Pendente', color: '#FFA000' };
    case 'confirmed':
      return { text: 'Confirmado', color: '#388E3C' };
    case 'completed':
      return { text: 'Concluído', color: '#1976D2' };
    case 'canceled':
      return { text: 'Cancelado', color: '#D32F2F' };
    default:
      return { text: 'Desconhecido', color: '#757575' };
  }
};

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden', // Garante que a imagem não vaze das bordas
  },
  content: {
    padding: 16,
  },
  professionalName: {
    fontSize: 20,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryOrange,
  },
  serviceCategory: {
    fontSize: 14,
    fontFamily: 'Afacad-Regular',
    color: '#6c757d',
    marginTop: 2,
  },
  serviceName: {
    fontSize: 18,
    fontFamily: 'Afacad-SemiBold',
    color: '#212529',
    marginVertical: 8,
    minHeight: 40, // Garante altura mínima para alinhamento
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starIcon: {
    marginRight: 3,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Afacad-Bold',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: '#003366',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Afacad-Bold',
    fontSize: 14,
  },
  // Estilos para o Modal de Avaliação
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
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Afacad-Bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 20,
  },
  ratingComponent: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
