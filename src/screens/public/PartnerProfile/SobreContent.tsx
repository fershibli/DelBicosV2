import { Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

type SobreContentProps = {
  detalhes: string;
  comodidadesIds: (string | number)[];
  todasComodidades: {
    id: string | number;
    nome: string;
  }[];
};

export function SobreContent({
  detalhes,
  comodidadesIds,
  todasComodidades,
}: SobreContentProps) {
  const comodidadesParceiro = todasComodidades.filter((comodidade) =>
    comodidadesIds.includes(comodidade.id),
  );

  return (
    <View style={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detalhes</Text>
        <Text style={styles.sectionText}>{detalhes || 'Não informado'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Comodidades</Text>
        <View style={styles.list}>
          {comodidadesParceiro.length > 0 ? (
            comodidadesParceiro.map((comodidade) => (
              <Text key={comodidade.id.toString()} style={styles.listItem}>
                • {comodidade.nome}
              </Text>
            ))
          ) : (
            <Text style={styles.sectionText}>Nenhuma comodidade informada</Text>
          )}
        </View>
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
  list: {
    marginLeft: 16,
  },
  listItem: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
  },
});