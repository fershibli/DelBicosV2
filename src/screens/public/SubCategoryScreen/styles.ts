import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA', // Fundo cinza claro
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  // Layout principal
  mainContent: {
    flexDirection: 'row',
    width: '100%',
    gap: 24,
  },
  leftColumn: {
    flex: 3, // Ocupa 3/5 do espaço (60%)
    minWidth: 300, // Garante que não fique muito espremido
  },
  rightColumn: {
    flex: 2, // Ocupa 2/5 do espaço (40%)
    minWidth: 300,
  },

  // Coluna da Esquerda (Subcategorias)
  pageTitle: {
    fontSize: 28,
    fontFamily: 'Afacad-Bold',
    color: '#003366',
    marginBottom: 24,
  },
  subCategoryListContainer: {
    justifyContent: 'space-between',
  },
  subCategoryButton: {
    flex: 1, // Para o numColumns funcionar bem
    height: 80,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 8,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
      },
      default: {
        elevation: 2,
      },
    }),
  },
  subCategoryButtonActive: {
    backgroundColor: '#005A93', // Fundo azul
    borderColor: '#005A93',
  },
  subCategoryText: {
    fontSize: 16,
    fontFamily: 'Afacad-SemiBold',
    color: '#FC8200', // Texto laranja
    textAlign: 'center',
  },
  subCategoryTextActive: {
    color: '#FFFFFF', // Texto branco
  },

  // Coluna da Direita (Calendário)
  calendarContainer: {
    backgroundColor: '#FC8200',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  calendarPlaceholder: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarText: {
    fontFamily: 'Afacad-Bold',
    fontSize: 18,
    color: 'white',
  },
  continueButton: {
    backgroundColor: '#005A93',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  continueButtonDisabled: {
    backgroundColor: '#6c757d',
    opacity: 0.7,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Afacad-Bold',
    fontSize: 16,
  },

  // Rodapé
  footer: {
    padding: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#6c757d',
    fontFamily: 'Afacad-Regular',
  },
});
