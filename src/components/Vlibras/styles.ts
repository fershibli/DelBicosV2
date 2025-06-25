import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  webviewContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 120, // Aumentado para melhor visibilidade
    height: 120, // Aumentado para melhor visibilidade
    borderRadius: 10, // Bordas arredondadas para estética
    overflow: 'hidden', // Garante que o conteúdo não vaze
  },
});
