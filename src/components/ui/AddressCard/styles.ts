import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.primaryWhite,
      borderRadius: 16,
      padding: 20,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: 'transparent', // Borda transparente por padrão
      // Sombras suaves
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },
        android: {
          elevation: 3,
        },
        web: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease',
        },
      }),
    },
    cardPrimary: {
      borderColor: colors.primaryOrange, // Borda laranja sutil se for principal
      backgroundColor: '#FFFBF5', // Fundo muito levemente laranja
    },

    // Cabeçalho
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    iconCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#FFF5EB', // Laranja bem claro
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconCirclePrimary: {
      backgroundColor: colors.primaryOrange,
    },
    cardTitle: {
      fontSize: 14,
      fontFamily: 'Afacad-SemiBold',
      color: colors.primaryOrange,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    deleteButton: {
      padding: 4,
    },

    // Corpo
    body: {
      marginBottom: 16,
    },
    streetText: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      marginBottom: 4,
    },
    complementText: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
      marginBottom: 4,
      fontStyle: 'italic',
    },
    detailText: {
      fontSize: 15,
      fontFamily: 'Afacad-Regular',
      color: '#555',
      marginBottom: 2,
    },
    zipText: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
      marginTop: 4,
    },

    // Rodapé
    footer: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: 'rgba(0,0,0,0.05)',
      paddingTop: 12,
      gap: 16,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 4,
      paddingRight: 12,
    },
    actionText: {
      fontSize: 14,
      fontFamily: 'Afacad-SemiBold',
      color: colors.primaryBlue,
    },
  });
