import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export function ServicosContent() {
  return (
  <View style={styles.contentContainer}>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Serviços</Text>
      <Text style={styles.sectionText}>Não informado</Text>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  navTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    fontSize: 17,
    color: '#666',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  activeTab: {
    color: '#FC8200',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#FC8200',
  },
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
  list: {
    marginLeft: 16,
  },
  listItem: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
  },
});