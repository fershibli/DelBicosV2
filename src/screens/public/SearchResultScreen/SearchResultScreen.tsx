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

// --- PLACEHOLDERS ---
// (Substitua pelos seus stores e lógica de fetch)
const MOCK_RESULTS: ProfessionalResult[] = [
  // ... (vou usar os dados da sua imagem como exemplo)
  {
    id: 1,
    name: 'Jefferson Santos',
    serviceName: 'Serviços de Eletricista',
    rating: 4.8,
    ratingsCount: 13,
    priceFrom: 250,
    availableTimes: ['09:30', '11:30', '14:00', '15:30', '16:00', '18:30'],
    offeredServices: [
      'Eletricista Geral',
      'Instalação Elétrica Residencial',
      'Instalação Elétrica Comercial',
      'Instalação de Cooktop por Indução',
    ],
    distance: 1,
    location: 'Jardim Faculdade, Sorocaba, São Paulo',
    imageUrl: 'https://i.imgur.com/example.jpg',
  },
  {
    id: 2,
    name: 'Jefferson Santos',
    serviceName: 'Serviços de Eletricista',
    rating: 4.8,
    ratingsCount: 13,
    priceFrom: 250,
    availableTimes: ['09:30', '11:30', '14:00', '15:30', '16:00', '18:30'],
    offeredServices: [
      'Eletricista Geral',
      'Instalação Elétrica Residencial',
      'Instalação Elétrica Comercial',
      'Instalação de Cooktop por Indução',
    ],
    distance: 1,
    location: 'Jardim Faculdade, Sorocaba, São Paulo',
    imageUrl: 'https://i.imgur.com/example.jpg',
  },
];
// --- FIM PLACEHOLDERS ---

function SearchResultScreen() {
  const route = useRoute();
  const { subCategoryId, date } = route.params as {
    subCategoryId: number;
    date: string;
  };

  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<ProfessionalResult[]>([]);

  useEffect(() => {
    // Aqui você chamaria seu store para buscar os profissionais com os filtros
    // ex: fetchProfessionalsByFilter(categoryId, subCategoryId, date);
    setTimeout(() => {
      setResults(MOCK_RESULTS);
      setIsLoading(false);
    }, 1000);
  }, []);

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
          numColumns={2} // Grade de 2 colunas
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
            <ProfessionalResultCard
              professional={item}
              selectedDate={date} // <-- Adicione esta prop
            />
          )}
          ListFooterComponent={
            <Text style={styles.footer}>
              © DelBicos - 2024 - Todos os direitos reservados.
            </Text>
          }
        />
      )}
    </View>
  );
}

export default SearchResultScreen;
