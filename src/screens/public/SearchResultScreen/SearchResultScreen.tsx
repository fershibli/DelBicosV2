import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';
import { useThemeStore, ThemeMode } from '@stores/Theme';
import { FontAwesome } from '@expo/vector-icons';
import ProfessionalResultCard, {
  ProfessionalResult,
} from '@components/features/ProfessionalResultCard';
import { useProfessionalStore } from '@stores/Professional';
import { useLocation } from '@lib/hooks/LocationContext';
// radius filters removed (RF04 reverted)

function SearchResultScreen() {
  const route = useRoute();
  const { subCategoryId, date } = route.params as {
    subCategoryId: number;
    date: string;
  };

  const { fetchProfessionalsByAvailability } = useProfessionalStore();
  const { address } = useLocation();
  const { width } = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<ProfessionalResult[]>([]);
  // radius filter removed

  const numColumns = width > 1100 ? 3 : width > 768 ? 2 : 1;

  useEffect(() => {
    const loadResults = async () => {
      setIsLoading(true);

      const lat = address?.lat ? parseFloat(String(address.lat)) : undefined;
      const lng = address?.lng ? parseFloat(String(address.lng)) : undefined;

      try {
        const data = await fetchProfessionalsByAvailability(
          subCategoryId,
          date,
          lat,
          lng,
        );
        setResults(data || []);
      } catch (error) {
        console.error('Erro ao buscar profissionais:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCategoryId, date, fetchProfessionalsByAvailability, address]);

  const colors = useColors();
  const { theme } = useThemeStore();
  const isDark = theme === ThemeMode.DARK;
  const isHighContrast = theme === ThemeMode.LIGHT_HI_CONTRAST;
  const styles = createStyles(colors, isDark, isHighContrast);

  const renderFilterBar = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterBarContainer}
      contentContainerStyle={styles.filterBar}>
      <TouchableOpacity style={styles.filterButton}>
        <FontAwesome
          name="filter"
          size={14}
          color={colors.textSecondary}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.filterButtonText}>Filtros</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterButtonText}>Ordenar Por</Text>
        <FontAwesome
          name="chevron-down"
          size={12}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterButtonText}>Distância</Text>
        <FontAwesome
          name="chevron-down"
          size={12}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterButtonText}>Atendimento em Domicílio</Text>
        <FontAwesome
          name="chevron-down"
          size={12}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.primaryBlue}
          style={{ flex: 1 }}
        />
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={results}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          key={`grid-${numColumns}`}
          columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
          ListHeaderComponent={
            <>
              <Text style={styles.title}>
                {results.length} Resultados Encontrados
              </Text>
              {renderFilterBar()}
            </>
          }
          renderItem={({ item }) => (
            <View
              style={[styles.cardWrapper, { width: `${100 / numColumns}%` }]}>
              <ProfessionalResultCard professional={item} selectedDate={date} />
            </View>
          )}
          ListFooterComponent={
            <Text style={styles.footer}>
              © DelBicos - {new Date().getFullYear()} - Todos os direitos
              reservados.
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
