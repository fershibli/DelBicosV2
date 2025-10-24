import ProfessionalCard from '@components/ProfessionalCard';
import { useProfessionalStore } from '@stores/Professional';
import { ListedProfessional } from '@stores/Professional/types';
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Platform,
  Dimensions,
} from 'react-native';

export interface ListProfessionalsProps {
  filter?: string;
}

const SIZE_LIMIT = 30;

const getNumColumns = (width: number) => {
  if (Platform.OS === 'web') {
    if (width > 1200) return 4;
    if (width > 900) return 3;
    if (width > 600) return 2;
  }
  return 1; // 1 coluna no mobile
};

const ListProfessionals = () => {
  const [page, setPage] = useState(0);
  const [professionals, setProfessionals] = useState<ListedProfessional[]>([]);
  const [loading, setLoading] = useState(true);

  const { fetchProfessionals } = useProfessionalStore();
  const [numColumns, setNumColumns] = useState(() =>
    getNumColumns(Dimensions.get('window').width),
  );

  useEffect(() => {
    const updateColumns = () => {
      setNumColumns(getNumColumns(Dimensions.get('window').width));
    };
    const subscription = Dimensions.addEventListener('change', updateColumns);
    return () => subscription?.remove();
  }, []);

  const handleNextPage = async () => {
    setLoading(true);
    const newProfessionals = await fetchProfessionals('', page + 1, SIZE_LIMIT);
    setProfessionals((prev) => [...prev, ...newProfessionals]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  return (
    <FlatList
      data={professionals}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      key={numColumns.toString()}
      columnWrapperStyle={{
        justifyContent: 'space-evenly',
      }}
      renderItem={({ item }) => <ProfessionalCard professional={item} />}
      onEndReached={handleNextPage}
      refreshing={loading}
      ListFooterComponent={
        loading ? (
          <View style={{ padding: 20 }}>
            <ActivityIndicator />
          </View>
        ) : null
      }
      onEndReachedThreshold={0.5}
      centerContent
    />
  );
};

export default ListProfessionals;
