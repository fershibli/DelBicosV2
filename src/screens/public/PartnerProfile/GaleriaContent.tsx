import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  Modal,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { GalleryImage } from '@screens/types';

type GaleriaContentProps = {
  imagens: GalleryImage[];
};

export function GaleriaContent({ imagens }: GaleriaContentProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const numColumns = 3;
  const screenWidth = Dimensions.get('window').width;
  const imageSize = (screenWidth - 32) / numColumns;

  const openImageViewer = (index: number) => {
    setCurrentIndex(index);
    setVisible(true);
  };

  const renderItem = ({ item, index }: { item: GalleryImage; index: number }) => (
    <TouchableOpacity
      onPress={() => openImageViewer(index)}
      activeOpacity={0.8}>
      <Image
        source={{ uri: item.url }}
        style={{
          width: imageSize,
          height: imageSize,
          margin: 1,
          backgroundColor: '#f0f0f0',
        }}
        resizeMode="cover"
      />
      {item.description && (
        <View style={styles.imageDescription}>
          <Text style={styles.descriptionText} numberOfLines={1}>
            {item.description}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const imagesForViewer = imagens.map((img) => ({
    url: img.url,
    props: {
      source: { uri: img.url },
    },
  }));

  const safeIndex = Math.max(0, Math.min(currentIndex, imagens.length - 1));

  return (
    <View style={styles.container}>
      {imagens.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma imagem disponível</Text>
        </View>
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={imagens}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            contentContainerStyle={styles.galleryContainer}
          />
          <Modal visible={visible} transparent={true}>
            <ImageViewer
              imageUrls={imagesForViewer}
              index={safeIndex}
              onSwipeDown={() => setVisible(false)}
              onChange={(index: number | undefined) =>
                setCurrentIndex(index || 0)
              }
              enableSwipeDown={true}
              enablePreload={true}
              renderHeader={() => (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setVisible(false)}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              )}
              renderIndicator={(currentIndex?: number, total?: number) => (
                <View style={styles.indicator}>
                  <Text style={styles.indicatorText}>
                    {(currentIndex ?? 0) + 1} / {total ?? 0}
                  </Text>
                </View>
              )}
            />
          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDE6F0',
  },
  galleryContainer: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  indicatorText: {
    color: 'white',
    fontSize: 16,
  },
  imageDescription: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 4,
  },
  descriptionText: {
    color: 'white',
    fontSize: 10,
  },
});