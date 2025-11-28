import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Platform,
  Dimensions,
  Text,
} from 'react-native';
import ProfessionalCard from '@components/ui/ProfessionalCard';
import { useProfessionalStore } from '@stores/Professional';
import { usePagination } from '@hooks/usePagination';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles'; // <-- Importe os estilos criados

// O hook useResponsiveColumns pode ficar aqui ou ser extraído para um arquivo separado
const useResponsiveColumns = () => {
  const getCols = (width: number) => {
    if (Platform.OS === 'web') {
      if (width > 1200) return 4;
      if (width > 900) return 3;
      if (width > 600) return 2;
    }
    return 1;
  };

  const [numColumns, setNumColumns] = useState(() =>
    getCols(Dimensions.get('window').width),
  );

  useEffect(() => {
    const update = () => setNumColumns(getCols(Dimensions.get('window').width));
    const sub = Dimensions.addEventListener('change', update);
    return () => sub?.remove();
  }, []);

  return numColumns;
};

const ListProfessionals = () => {
  const colors = useColors();
  const styles = createStyles(colors); // <-- Crie a instância de estilos com as cores atuais
  const { fetchProfessionals } = useProfessionalStore();
  const numColumns = useResponsiveColumns();

  const fetcher = useCallback(
    (p: number, l: number) => fetchProfessionals('', p, l),
    [fetchProfessionals],
  );

  const {
    data: professionals,
    loadingInitial,
    loadingMore,
    hasMore,
    onEndReached,
  } = usePagination({ fetchData: fetcher, limit: 12 });

  if (loadingInitial) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryBlue} />
      </View>
    );
  }

  return (
    <FlatList
      data={professionals}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      key={numColumns.toString()}
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : undefined}
      renderItem={({ item }) => (
        <View style={[styles.cardWrapper, { width: `${100 / numColumns}%` }]}>
          <ProfessionalCard professional={item} />
        </View>
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
      ListFooterComponent={() => {
        if (loadingMore) {
          return (
            <View style={styles.footerContainer}>
              <ActivityIndicator color={colors.primaryOrange} />
            </View>
          );
        }
        if (!hasMore && professionals.length > 0) {
          return (
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Não há mais profissionais.</Text>
            </View>
          );
        }
        return null;
      }}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum profissional encontrado.</Text>
        </View>
      }
    />
  );
};

export default ListProfessionals;
