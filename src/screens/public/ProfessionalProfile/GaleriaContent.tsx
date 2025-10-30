import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { Professional } from '@stores/Professional/types';
import colors from '@theme/colors';

interface GaleriaContentProps {
  professional: Professional;
}

// Tipo temporário para galeria (aguardando backend)
interface GalleryImage {
  id: string;
  url: string;
}

export function GaleriaContent({ professional }: GaleriaContentProps) {
  // TODO: Quando o backend estiver pronto, buscar imagens reais
  // Por enquanto, vamos usar imagens placeholder baseadas no profissional
  const mockImages: GalleryImage[] = Array.from({ length: 8 }, (_, index) => ({
    id: `${professional.id}-${index}`,
    url: `https://picsum.photos/seed/${professional.id}-${index}/400/400`,
  }));

  // Se no futuro o backend retornar GalleryImages[], usar:
  // const images = professional.GalleryImages || mockImages;
  const images = mockImages;

  if (images.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Nenhuma imagem disponível na galeria.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item.url }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.gallery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  gallery: {
    padding: 4,
  },
  imageWrapper: {
    flex: 1 / 3,
    aspectRatio: 1,
    padding: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: colors.secondaryBeige,
  },
});
