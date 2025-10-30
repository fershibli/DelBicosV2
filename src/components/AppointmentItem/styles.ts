import { StyleSheet } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  // ===== CARD PRINCIPAL =====
  card: {
    backgroundColor: colors.primaryWhite,
    borderRadius: 8,
    padding: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
    height: 400,
    maxHeight: 400,
  },

  content: {
    flexDirection: 'column',
    height: 400,
    maxHeight: 400,
  },

  // ===== LADO ESQUERDO (TEXTOS) =====
  leftSection: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 12,
    height: 240,
    maxHeight: 240,
  },

  topInfo: {
    marginBottom: 6,
  },

  // ===== TEXTOS =====
  professionalName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FC8200',
    marginBottom: 3,
    lineHeight: 17,
  },

  serviceInfo: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 2,
    lineHeight: 13,
  },

  serviceName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 3,
    lineHeight: 15,
  },

  dateTime: {
    fontSize: 10,
    color: '#FC8200',
    fontWeight: '700',
    marginBottom: 0,
    lineHeight: 13,
  },

  // ===== ESTRELAS =====
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },

  starIcon: {
    marginRight: 2,
  },

  // ===== STATUS BADGE =====
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },

  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryWhite,
    letterSpacing: 0.3,
  },

  // ===== BOTÕES =====
  buttonsContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },

  button: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 30,
  },

  detailsButton: {
    backgroundColor: '#005A93', // Azul do projeto
  },

  cancelButton: {
    backgroundColor: '#DC2626', // Vermelho
  },

  modifyButton: {
    backgroundColor: '#FC8200', // Laranja do projeto
  },

  receiptButton: {
    backgroundColor: '#005A93',
  },

  rateButton: {
    backgroundColor: '#22843B', // Verde do projeto
  },

  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.3,
  },

  // ===== LADO DIREITO (IMAGEM) =====
  rightSection: {
    position: 'relative',
    width: '100%',
    height: 160,
    maxHeight: 160,
    flexShrink: 0,
    borderRadius: 0,
    overflow: 'hidden',
  },

  serviceImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#E0E0E0',
  },

  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },

  viewProfileBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 90, 147, 0.95)',
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  viewProfileText: {
    color: colors.primaryWhite,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  imagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#DDE6F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imagePlaceholderText: {
    color: '#005A93',
    fontSize: 11,
    fontWeight: '600',
  },

  // ===== MODAL =====
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: colors.primaryWhite,
    borderRadius: 16,
    width: '85%',
    maxWidth: 400,
    padding: 24,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },

  ratingComponent: {
    alignSelf: 'center',
    marginBottom: 20,
  },

  modalInput: {
    borderWidth: 1,
    borderColor: '#DDE6F0',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    marginBottom: 20,
    fontSize: 14,
    color: '#000000',
    backgroundColor: '#FAFAFA',
    minHeight: 100,
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
  },

  modalCancelText: {
    color: '#666666',
    fontWeight: '600',
    fontSize: 14,
  },

  modalButton: {
    flex: 1,
    backgroundColor: '#005A93',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  // ===== AVALIAÇÃO EXIBIDA =====
  reviewSection: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#FFC107',
  },

  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  reviewLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#666666',
    marginRight: 8,
  },

  reviewStarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  reviewComment: {
    fontSize: 12,
    color: '#333333',
    lineHeight: 16,
    fontStyle: 'italic',
  },
});

export const getStatusStyle = (
  status: 'pending' | 'confirmed' | 'completed' | 'canceled',
) => {
  switch (status) {
    case 'pending':
      return {
        text: '⏱ Pendente',
        color: '#FC8200',
        backgroundColor: '#FC8200',
      };
    case 'confirmed':
      return {
        text: '✓ Confirmado',
        color: '#22843B',
        backgroundColor: '#22843B',
      };
    case 'completed':
      return {
        text: '✓ Concluído',
        color: '#005A93',
        backgroundColor: '#005A93',
      };
    case 'canceled':
      return {
        text: '✕ Cancelado',
        color: '#DC2626',
        backgroundColor: '#DC2626',
      };
    default:
      return {
        text: 'Desconhecido',
        color: '#666666',
        backgroundColor: '#666666',
      };
  }
};
