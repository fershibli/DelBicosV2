import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  Modal,
  StatusBar,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useColors } from '@theme/ThemeProvider';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { createStyles } from './styles';

type Imagem = {
  id: string;
  url: string;
};

type GaleriaContentProps = {
  imagens: Imagem[];
};

export function GaleriaContent({ imagens }: GaleriaContentProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const colors = useColors();
  const styles = createStyles(colors);

  const numColumns = 3;
  const screenWidth = Dimensions.get('window').width;
  const containerPadding = 16;
  const gap = 10;

  const availableWidth =
    screenWidth - containerPadding * 2 - gap * (numColumns - 1);
  const imageSize = availableWidth / numColumns;

  const openImageViewer = (index: number) => {
    setCurrentIndex(index);
    setVisible(true);
  };

  const renderItem = ({ item, index }: { item: Imagem; index: number }) => {
    const isLastInRow = (index + 1) % numColumns === 0;
    const marginRight = isLastInRow ? 0 : gap;

    return (
      <TouchableOpacity
        onPress={() => openImageViewer(index)}
        activeOpacity={0.8}
        style={[
          styles.imageContainer,
          {
            width: imageSize,
            height: imageSize,
            marginRight,
            marginBottom: gap,
          },
        ]}>
        <Image
          source={{ uri: item.url }}
          style={styles.imageThumbnail}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  const imagesForViewer = imagens.map((img) => ({
    url: img.url,
    props: {
      source: { uri: img.url },
    },
  }));

  const safeIndex = Math.max(0, Math.min(currentIndex, imagens.length - 1));

  const renderModalHeader = () => (
    <View style={styles.modalHeaderContainer}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setVisible(false)}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
        <MaterialIcons name="close" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  const renderModalFooter = (currentIndex?: number, total?: number) => (
    <View style={styles.indicatorContainer}>
      <Text style={styles.indicatorText}>
        {(currentIndex ?? 0) + 1} de {total ?? 0}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {imagens.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome name="image" size={50} color={colors.textTertiary} />
          <Text style={styles.emptyText}>
            Nenhuma imagem disponível na galeria.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={imagens}
            renderItem={renderItem}
            keyExtractor={(item: Imagem) => item.id}
            numColumns={numColumns}
            contentContainerStyle={[
              styles.galleryList,
              { padding: containerPadding },
            ]}
            showsVerticalScrollIndicator={false}
          />

          <Modal
            visible={visible}
            transparent
            onRequestClose={() => setVisible(false)}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <ImageViewer
              imageUrls={imagesForViewer}
              index={safeIndex}
              onSwipeDown={() => setVisible(false)}
              onChange={(index: number | undefined) =>
                setCurrentIndex(index || 0)
              }
              enableSwipeDown={true}
              enablePreload={true}
              useNativeDriver={true}
              renderHeader={renderModalHeader}
              renderIndicator={renderModalFooter}
              backgroundColor="black"
            />
          </Modal>
        </>
      )}
    </View>
  );
}
