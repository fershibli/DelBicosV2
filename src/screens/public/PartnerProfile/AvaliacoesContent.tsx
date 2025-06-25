import { Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

type AvaliacoesContentProps = {
  availabilities?: any[];
};

export function AvaliacoesContent({
  availabilities = [],
}: AvaliacoesContentProps) {
  if (availabilities.length === 0) {
    return (
      <View style={styles.noReviewsContainer}>
        <Text style={styles.noReviewsText}>
          Não há avaliações para este usuário.
        </Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  noReviewsContainer: {
    flex: 1,
    backgroundColor: '#DDE6F0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  noReviewsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
