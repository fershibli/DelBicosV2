import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA', // Fundo cinza claro da página
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center', // Centraliza a lista na web
  },
  list: {
    width: '100%',
    maxWidth: 1200, // Limite de largura para a lista na web
  },
  title: {
    fontSize: 28,
    fontFamily: 'Afacad-Bold',
    color: '#003366',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  filterBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end', // Alinha os filtros à direita
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  // Estilo placeholder para os botões de filtro
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: 'Afacad-Regular',
    marginRight: 8,
  },
  footer: {
    padding: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#6c757d',
    fontFamily: 'Afacad-Regular',
  },
});
