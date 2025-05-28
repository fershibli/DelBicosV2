import { View, Text, StyleSheet, FlatList } from 'react-native';

type Servico = {
  nome: string;
  preco: string;
  duracao: string;
};

type ServicosContentProps = {
  servicos: Servico[];
};

export function ServicosContent({ servicos }: ServicosContentProps) {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Serviços</Text>

      {servicos.length === 0 ? (
        <Text style={styles.sectionText}>Nenhum serviço disponível.</Text>
      ) : (
        <FlatList
          data={servicos}
          keyExtractor={(item, index) => `${item.nome}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.servicoItem}>
              <Text style={styles.nomeServico}>{item.nome}</Text>
              <Text style={styles.infoServico}>{item.preco} • {item.duracao}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  sectionText: {
    fontSize: 15,
    color: '#666',
  },
  servicoItem: {
    marginBottom: 16,
  },
  nomeServico: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  infoServico: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});
