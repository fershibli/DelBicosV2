import { Text } from '@react-navigation/elements';
import { FlatList, StyleSheet, View, Image } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Review } from '@stores/Professional/types';

type AvaliacoesContentProps = {
  avaliacoes?: Review[];
};

export function AvaliacoesContent({ avaliacoes = [] }: AvaliacoesContentProps) {
  const formatarData = (dataString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return new Date(dataString).toLocaleDateString('pt-BR', options);
  };

  const renderItem = ({ item }: { item: Review }) => (
    <View style={styles.avaliacaoContainer}>
      <View style={styles.cabecalhoAvaliacao}>
        <Image
          source={{
            uri:
              item.Client.User.avatar_uri || 'https://via.placeholder.com/50',
          }}
          style={styles.fotoUsuario}
        />
        <View style={styles.infoUsuario}>
          <Text style={styles.nomeUsuario}>{item.Client.User.name}</Text>
          <View style={styles.ratingContainer}>
            {item.rating && (
              <Rating
                type="star"
                ratingCount={5}
                imageSize={16}
                readonly
                startingValue={item.rating}
                fractions={1}
                tintColor="#f8f8f8"
              />
            )}
            <Text style={styles.dataAvaliacao}>
              {formatarData(item.start_time)}
            </Text>
          </View>
        </View>
      </View>

      {item.review && (
        <Text style={styles.descricaoAvaliacao}>{item.review}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.contentContainer}>
      {avaliacoes.length === 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avaliações</Text>
          <Text style={styles.sectionText}>
            Sem avaliações para este profissional
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>
            Avaliações ({avaliacoes.length})
          </Text>
          <FlatList
            data={avaliacoes}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={styles.separador} />}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    paddingBottom: 16,
  },
  avaliacaoContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
  },
  cabecalhoAvaliacao: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  fotoUsuario: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  infoUsuario: {
    flex: 1,
    justifyContent: 'center',
  },
  nomeUsuario: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataAvaliacao: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  tituloAvaliacao: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  descricaoAvaliacao: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  separador: {
    height: 12,
  },
});
