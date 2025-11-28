import { Text } from '@react-navigation/elements';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useColors } from '@theme/ThemeProvider';
import { Address } from '@stores/Professional/types';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    navTabs: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.secondaryBeige,
    },
    tab: {
      fontSize: 17,
      color: '#666',
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    activeTab: {
      color: colors.primaryOrange,
      fontWeight: 'bold',
      borderBottomWidth: 2,
      borderBottomColor: colors.primaryOrange,
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
      lineHeight: 22,
    },
    list: {
      marginLeft: 16,
    },
    listItem: {
      fontSize: 15,
      color: '#666',
      marginBottom: 4,
    },
    emptyContainer: {
      padding: 32,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
    },
  });

export type SobreContentProps = {
  nome?: string;
  descricao?: string;
  endereco?: Address;
};

export function SobreContent({ nome, descricao, endereco }: SobreContentProps) {
  const colors = useColors();
  const styles = createStyles(colors);
  return (
    <ScrollView style={styles.contentContainer}>
      {nome && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nome</Text>
          <Text style={styles.sectionText}>{nome}</Text>
        </View>
      )}

      {descricao && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.sectionText}>{descricao}</Text>
        </View>
      )}

      {endereco && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>
          <Text style={styles.sectionText}>
            {endereco.street}, {endereco.number}
            {endereco.complement ? `, ${endereco.complement}` : ''}
          </Text>
          <Text style={styles.sectionText}>
            {endereco.neighborhood}, {endereco.city} - {endereco.state}
          </Text>
          <Text style={styles.sectionText}>CEP: {endereco.zipcode}</Text>
        </View>
      )}

      {!nome && !descricao && !endereco && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma informação disponível</Text>
        </View>
      )}
    </ScrollView>
  );
}
