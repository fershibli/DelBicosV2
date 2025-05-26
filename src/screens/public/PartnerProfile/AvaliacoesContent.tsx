import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export function AvaliacoesContent() {
  return (
  <View style={styles.contentContainer}>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Avaliações</Text>
      <Text style={styles.sectionText}>Sem avaliações para este </Text>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionText: {
    fontSize: 15,
    color: '#666',
  },
});