import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import ProfessionalResultCard, {
  ProfessionalResult,
} from '@components/ProfessionalResultCard';
import { useProfessionalStore } from '@stores/Professional';
import { useLocation } from '@lib/hooks/LocationContext';

function SearchResultScreen() {
  const route = useRoute();
  const { subCategoryId, date } = route.params as {
    subCategoryId: number;
    date: string;
  };

  const { fetchProfessionalsByAvailability } = useProfessionalStore();
  const { address } = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<ProfessionalResult[]>([]);

  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true);

      const lat = address?.lat ? parseFloat(address.lat) : undefined;
      const lng = address?.lon ? parseFloat(address.lon) : undefined;
      const data = await fetchProfessionalsByAvailability(
        subCategoryId,
        date,
        lat,
        lng,
      );
      setResults(data || []);
      setIsLoading(false);
    };

    loadResults();
  }, [subCategoryId, date, fetchProfessionalsByAvailability, address]);

  const renderFilterBar = () => (
    <View style={styles.filterBar}>
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterButtonText}>Ordenar Por</Text>
        <FontAwesome name="chevron-down" size={12} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterButtonText}>Distância</Text>
        <FontAwesome name="chevron-down" size={12} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterButtonText}>Atendimento em Domicílio</Text>
        <FontAwesome name="chevron-down" size={12} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton}>
        <FontAwesome
          name="filter"
          size={14}
          color="#333"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.filterButtonText}>Filtros</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#003366" style={{ flex: 1 }} />
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={results}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          key={'two-columns'}
          ListHeaderComponent={
            <>
              <Text style={styles.title}>
                {results.length} Resultados Encontrados
              </Text>
              {renderFilterBar()}
            </>
          }
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProfessionalResultCard professional={item} selectedDate={date} />
            </View>
          )}
          ListFooterComponent={
            <Text style={styles.footer}>
              © DelBicos - 2024 - Todos os direitos reservados.
            </Text>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Nenhum profissional encontrado para esta data ou serviço.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

export default SearchResultScreen;
