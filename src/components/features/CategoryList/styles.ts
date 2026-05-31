import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      // alignItems: 'center', // Removido para permitir esticar total
    },
    loadingContainer: {
      width: '100%',
      minHeight: 150,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyContainer: {
      width: '100%',
      minHeight: 150,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyText: {
      fontFamily: 'Afacad-Regular',
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    listContainer: {
      paddingBottom: 40,
      paddingHorizontal: 16,
      width: '100%',
      // maxWidth: 1200, // REMOVIDO: Agora ocupa a tela toda
      // alignSelf: 'center', // REMOVIDO
    },
    categoryCard: {
      flex: 1,
      margin: 0,
      padding: 24,
      borderRadius: 24,
      minHeight: 180,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
        android: {
          elevation: 4,
        },
        web: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          transitionDuration: '0.2s',
        },
      }),
    },
    categoryTitle: {
      fontSize: 20,
      fontFamily: 'Afacad-Bold',
      textAlign: 'center',
      marginTop: 12,
      lineHeight: 26,
    },
    webCard: {
      width: '100%',
      height: 160,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: colors.cardBackground,
      ...Platform.select({
        web: {
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        } as any,
      }),
    },
    webCardHovered: {
      transform: [{ scale: 1.03 }],
    },
    webCardImage: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
    },
    webCardGradient: {
      height: '50%',
      justifyContent: 'flex-end',
      padding: 16,
    },
    webCardTitle: {
      fontSize: 20,
      fontFamily: 'Afacad-Bold',
      color: '#FFFFFF',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 3,
    },
  });
