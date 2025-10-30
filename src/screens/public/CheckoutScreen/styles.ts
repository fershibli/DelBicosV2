import { StyleSheet, Platform } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F7FA', // Fundo padrão cinza claro
  },
  backButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primaryBlue,
    borderRadius: 8,
  },
  backButtonText: {
    color: colors.primaryWhite,
    fontFamily: 'Afacad-Bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7FA',
    minHeight: 300, // Garante altura mínima
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Afacad-Regular',
    color: '#6c757d',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F4F7FA',
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Afacad-Regular',
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButtonError: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primaryBlue,
    borderRadius: 8,
  },
  backButtonTextError: {
    color: colors.primaryWhite,
    fontFamily: 'Afacad-Bold',
  },
  errorMessageText: {
    // Estilo para a mensagem de erro DENTRO do CheckoutForm
    color: '#D32F2F',
    fontFamily: 'Afacad-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: -12, // Puxa o botão para cima
  },
  contentContainer: {
    padding: 24,
    alignItems: 'center', // Centraliza o conteúdo (mainContent) na web
  },
  // Header com botão "Voltar"
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1100, // Largura máxima do conteúdo central
    marginBottom: 24,
  },
  // Layout principal (duas colunas)
  mainContent: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column', // Colunas na web, empilhado no mobile
    width: '100%',
    maxWidth: 1100,
    gap: 24,
  },
  // Coluna da Esquerda
  leftColumn: {
    flex: Platform.OS === 'web' ? 1.5 : 1, // Coluna esquerda um pouco maior na web
    marginBottom: Platform.OS !== 'web' ? 24 : 0, // Espaço abaixo no mobile
  },
  // Título principal (usado na coluna esquerda)
  pageTitle: {
    fontSize: 28,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryBlue,
    marginBottom: 16, // Espaço antes do card/conteúdo
  },
  // Card de Resumo (Coluna Esquerda)
  summaryCard: {
    backgroundColor: colors.primaryWhite,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.secondaryBeige,
    overflow: 'hidden',
    ...Platform.select({
      // Sombra
      ios: {
        shadowColor: colors.primaryBlack,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: { elevation: 2 },
      web: { boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)' },
    }),
  },
  // Botão Finalizar Compra (Agora dentro do CheckoutForm)
  checkoutButton: {
    backgroundColor: colors.primaryBlue,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  checkoutButtonDisabled: {
    opacity: 0.6,
  },
  checkoutButtonText: {
    color: colors.primaryWhite,
    fontSize: 16,
    fontFamily: 'Afacad-Bold',
  },
  summaryImage: {
    width: '100%',
    height: 180, // Altura da imagem de topo
    backgroundColor: '#EEE', // Placeholder enquanto a imagem carrega
  },
  summaryContent: {
    padding: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  summaryTitle: {
    // Nome do Profissional
    fontSize: 22,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryOrange,
  },
  summarySubtitle: {
    // Serviço Principal
    fontSize: 14,
    fontFamily: 'Afacad-Regular',
    color: '#333',
  },
  summaryRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  summaryRatingText: {
    fontSize: 12,
    fontFamily: 'Afacad-Regular',
    color: '#6c757d',
    marginLeft: 4,
  },
  summaryPrice: {
    // Preço
    fontSize: 20,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryBlue,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  summaryServiceTitle: {
    // Ex: Conserto de Disjuntor
    fontSize: 18,
    fontFamily: 'Afacad-SemiBold',
    color: '#212529',
  },
  summaryServiceDate: {
    // Ex: Qui, 17/10 - 10:00
    fontSize: 16,
    fontFamily: 'Afacad-Regular',
    color: colors.primaryBlue,
    marginTop: 4,
  },
  summaryLink: {
    // Link "Alterar seleção"
    fontSize: 12,
    fontFamily: 'Afacad-Bold',
    color: '#D32F2F', // Vermelho para indicar ação
    textDecorationLine: 'underline',
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  rightColumn: {
    flex: 1, // Ocupa a outra metade do espaço no layout web
  },
  paymentContainer: {
    backgroundColor: colors.primaryWhite,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.secondaryBeige,
    padding: 20,
    ...Platform.select({
      // Sombra
      ios: {
        shadowColor: colors.primaryBlack,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: { elevation: 2 },
      web: { boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)' },
    }),
  },
  sectionTitle: {
    // Título "Selecionar Pagamento"
    fontSize: 22,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryBlue,
    marginBottom: 16,
  },
  orderSummaryContainer: {
    marginTop: 20, // Espaço acima do resumo do pedido
  },
  summaryRow: {
    // Para linhas como Subtotal
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    // Ex: "Subtotal"
    fontSize: 14,
    fontFamily: 'Afacad-Regular',
    color: '#6c757d',
  },
  summaryValue: {
    // Ex: "R$ 250,00" (para subtotal)
    fontSize: 14,
    fontFamily: 'Afacad-Regular',
    color: '#212529',
  },
  totalRow: {
    // Linha do Total
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.secondaryBeige,
  },
  totalLabel: {
    // "Total"
    fontSize: 18,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryBlue,
  },
  totalValue: {
    // Valor Total Final
    fontSize: 18,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryBlue,
  },
});
