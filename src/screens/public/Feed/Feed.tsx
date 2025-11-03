import React, { useRef, useState } from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { styles } from './styles';
import CategorySlider from '@components/CategorySlider';
import ListProfessionals from '@components/ListProfessionals';
import { FontAwesome } from '@expo/vector-icons';
import { HighlightCard, HighlightItem } from '@components/HighlightCard';
import colors from '@theme/colors';

const HIGHLIGHT_DATA: HighlightItem[] = [
  {
    id: '1',
    title: 'Reformas de Fim de Ano',
    description: 'Pintores e eletricistas com agenda aberta.',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&h=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Prepare-se para o Verão',
    description: 'Instalação de piscina e ar-condicionado.',
    image:
      'https://images.unsplash.com/photo-1574610758891-5b809b6e6e2e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Beleza & Estética',
    description: 'Manicures e cabeleireiros para as festas.',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&h=800&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Cuidados Pet',
    description: 'Dog walkers e pet sitters perto de você.',
    image:
      'https://images.unsplash.com/photo-1574610758891-5b809b6e6e2e?q=80&w=800&auto=format&fit=crop',
  },
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_MARGIN = 8;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN * 2;

const FeedScreen: React.FC = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScrollLeft = () => {
    const newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      scrollRef.current?.scrollTo({
        x: newIndex * width,
        animated: true,
      });
      setCurrentIndex(newIndex);
    }
  };
  const handleScrollRight = () => {
    const newIndex = currentIndex + 1;
    if (newIndex < HIGHLIGHT_DATA.length) {
      scrollRef.current?.scrollTo({
        x: newIndex * width,
        animated: true,
      });
      setCurrentIndex(newIndex);
    }
  };
  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollX / width);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.carouselSection}>
        {/* <Text style={styles.title}>Destaques para você</Text> */}

        <View style={styles.carouselContainer}>
          {Platform.OS === 'web' && currentIndex > 0 && (
            <TouchableOpacity
              style={[styles.scrollButton, styles.scrollButtonLeft]}
              onPress={handleScrollLeft}>
              <FontAwesome
                name="chevron-left"
                size={18}
                color={colors.primaryBlue}
              />
            </TouchableOpacity>
          )}

          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselListContainer}
            pagingEnabled
            onMomentumScrollEnd={onMomentumScrollEnd}
            scrollEventThrottle={16}
            snapToInterval={SNAP_INTERVAL}
            decelerationRate="fast">
            {HIGHLIGHT_DATA.map((item) => (
              <HighlightCard key={item.id} item={item} />
            ))}
          </ScrollView>

          {Platform.OS === 'web' &&
            currentIndex < HIGHLIGHT_DATA.length - 1 && (
              <TouchableOpacity
                style={[styles.scrollButton, styles.scrollButtonRight]}
                onPress={handleScrollRight}>
                <FontAwesome
                  name="chevron-right"
                  size={18}
                  color={colors.primaryBlue}
                />
              </TouchableOpacity>
            )}

          <View style={styles.paginationContainer}>
            {HIGHLIGHT_DATA.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.dotActive]}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.categorySection}>
        <Text style={styles.title}>Selecione por Categorias</Text>
        <CategorySlider />
      </View>
      <View style={styles.listSection}>
        <Text style={styles.title}>Profissionais próximos a você</Text>
        <ListProfessionals />
      </View>
    </ScrollView>
  );
};

export default FeedScreen;
