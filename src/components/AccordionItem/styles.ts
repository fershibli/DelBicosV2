import { StyleSheet, Platform } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryWhite,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden', // Garante que o conteúdo não vaze
    ...Platform.select({
      ios: {
        shadowColor: colors.primaryBlack,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease-in-out',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Afacad-SemiBold',
    color: colors.primaryBlue,
    flex: 1, // Para o texto quebrar a linha se for longo
    marginRight: 16,
  },
  icon: {
    // (O ícone 'FontAwesome' cuidará da sua própria cor)
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  bodyText: {
    fontSize: 15,
    fontFamily: 'Afacad-Regular',
    color: '#495057', // Um cinza escuro, não preto
    lineHeight: 22,
  },
});
