import ProfessionalCard from '@components/ProfessionalCard';
import { Grid } from '@mui/material';
import { useProfessionalStore } from '@stores/Professional';
import { ListedProfessional } from '@stores/Professional/types';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

export interface ListProfessionalsProps {
  filter?: string;
}

const SIZE_LIMIT = 10;

const ListProfessionals = () => {
  const [page, setPage] = useState(1);
  const [professionals, setProfessionals] = useState<ListedProfessional[]>([]);
  const [loading, setLoading] = useState(true);

  const { fetchProfessionals } = useProfessionalStore();

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
      numColumns={4}
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
