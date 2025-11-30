import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    externalContainer: {
      backgroundColor: 'transparent',
      width: '100%',
      minHeight: 140,
      paddingVertical: 10,
      alignItems: 'center', // Centraliza o FlatList Wrapper
      justifyContent: 'center',
    },
    loadingContainer: {
      minHeight: 130,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    flatList: {
      // Propriedades movidas para contentContainerStyle inline no componente para funcionar o flexGrow
    },
    categoryCard: {
      flexDirection: 'row',
      width: 260,
      height: 100,
      marginHorizontal: 8, // Margem em ambos os lados para centralização correta
      paddingHorizontal: 20,
      borderRadius: 20,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center', // Centraliza conteúdo interno
      ...Platform.select({
        ios: {
          shadowColor: '#000',
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
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      textAlign: 'left',
      flexShrink: 1,
    },
  });
