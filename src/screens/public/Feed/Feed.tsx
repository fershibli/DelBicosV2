import React, { useRef, useState } from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';
import CategorySlider from '@components/features/CategorySlider';
import ListProfessionals from '@components/features/ListProfessionals';
import { FontAwesome } from '@expo/vector-icons';
import { HighlightCard, HighlightItem } from '@components/ui/HighlightCard';

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
      'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1200&h=800&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Cuidados Pet',
    description: 'Dog walkers e pet sitters perto de você.',
    image:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop',
  },
];

const FeedScreen: React.FC = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const colors = useColors();
  const styles = createStyles(colors);
  const { width } = useWindowDimensions();

  const handleScrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    if (newIndex !== currentIndex) {
      scrollRef.current?.scrollTo({ x: newIndex * width, animated: true });
      setCurrentIndex(newIndex);
    }
  };

  const handleScrollRight = () => {
    const newIndex = Math.min(HIGHLIGHT_DATA.length - 1, currentIndex + 1);
    if (newIndex !== currentIndex) {
      scrollRef.current?.scrollTo({ x: newIndex * width, animated: true });
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
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Seção Carrossel Destaques */}
      <View style={styles.carouselSection}>
        <View style={styles.carouselContainer}>
          {Platform.OS === 'web' && currentIndex > 0 && (
            <TouchableOpacity
              style={[styles.scrollButton, styles.scrollButtonLeft]}
              onPress={handleScrollLeft}
              activeOpacity={0.8}>
              <FontAwesome
                name="chevron-left"
                size={16}
                color={colors.primaryBlue}
              />
            </TouchableOpacity>
          )}

          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselListContainer}
            onMomentumScrollEnd={onMomentumScrollEnd}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={width}>
            {HIGHLIGHT_DATA.map((item) => (
              <HighlightCard key={item.id} item={item} />
            ))}
          </ScrollView>

          {Platform.OS === 'web' &&
            currentIndex < HIGHLIGHT_DATA.length - 1 && (
              <TouchableOpacity
                style={[styles.scrollButton, styles.scrollButtonRight]}
                onPress={handleScrollRight}
                activeOpacity={0.8}>
                <FontAwesome
                  name="chevron-right"
                  size={16}
                  color={colors.primaryBlue}
                />
              </TouchableOpacity>
            )}

          {/* Paginação (Dots) */}
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

      {/* Seção Categorias */}
      <View style={styles.categorySection}>
        <Text style={styles.title}>Selecione por Categorias</Text>
        <CategorySlider />
      </View>

      {/* Seção Profissionais */}
      <View style={styles.listSection}>
        <Text style={styles.title}>Profissionais próximos a você</Text>
        <ListProfessionals />
      </View>
    </ScrollView>
  );
};

export default FeedScreen;
