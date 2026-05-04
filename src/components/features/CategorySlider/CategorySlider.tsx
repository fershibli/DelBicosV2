import React, { useEffect, useState, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Pressable,
  Platform,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCategoryStore } from '@stores/Category/Category';
import { Category } from '@stores/Category/types';
import { useThemeStore, ThemeMode } from '@stores/Theme';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const CATEGORY_ICONS: Record<number, string> = {
  1: 'heartbeat',
  2: 'cut',
  3: 'tools',
  4: 'lightbulb',
  5: 'home',
  6: 'paw',
};

const CATEGORY_IMAGES = [
  'https://images.unsplash.com/photo-1505506874110-6a7a6c9924c7?q=80&w=800&auto=format&fit=crop', // 0
  'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=800&auto=format&fit=crop', // 1
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop', // 2
  'https://images.unsplash.com/photo-1581092926214-ee854bb359ea?q=80&w=800&auto=format&fit=crop', // 3
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop', // 4
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop', // 5
  'https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=800&auto=format&fit=crop', // 6 - tech
  'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop', // 7 - events/food
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop', // 8 - teaching
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop', // 9 - driving
];

function getCategoryIconName(id: number) {
  return CATEGORY_ICONS[id] || 'shapes';
}

function getCategoryImage(id: number) {
  return CATEGORY_IMAGES[id % CATEGORY_IMAGES.length];
}

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
  isWebLayout: boolean;
}

function CategoryCard({ category, onPress, isWebLayout }: CategoryCardProps) {
  const iconName = getCategoryIconName(category.id);
  const imageUrl = getCategoryImage(category.id);
  const [isHovered, setIsHovered] = useState(false);

  const { theme } = useThemeStore();
  const colors = useColors();
  const styles = createStyles(colors);

  const isDark = theme === ThemeMode.DARK;

  // --- RENDERING WEB IMAGE CARD ---
  if (isWebLayout) {
    return (
      <Pressable
        style={[styles.webCard, isHovered && styles.webCardHovered]}
        onPress={() => onPress(category)}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        accessibilityRole="button">
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.webCardImage}
          imageStyle={{ borderRadius: 16 }}>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.webCardGradient}>
            <Text style={styles.webCardTitle} numberOfLines={1}>
              {category.title}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    );
  }

  // --- RENDERING MOBILE BUBBLE ---
  const bubbleBgColor = isDark ? '#2C2C2C' : colors.primaryOrange + '15'; // 15% opacity of original color

  return (
    <Pressable
      style={styles.bubbleCard}
      onPress={() => onPress(category)}
      accessibilityRole="button">
      <View
        style={[
          styles.bubble,
          { backgroundColor: isHovered ? colors.primaryOrange + '30' : bubbleBgColor },
        ]}>
        <FontAwesome5
          name={iconName}
          size={26}
          color={isDark ? colors.primaryWhite : colors.primaryOrange}
          solid
        />
      </View>
      <Text
        style={[styles.bubbleTitle, { color: isDark ? colors.primaryWhite : colors.primaryBlack }]}
        numberOfLines={2}>
        {category.title}
      </Text>
    </Pressable>
  );
}

function CategorySlider() {
  const [isLoading, setIsLoading] = useState(true);
  const { categories, fetchCategories } = useCategoryStore();
  const navigation = useNavigation();
  const colors = useColors();
  const styles = createStyles(colors);
  const { width } = useWindowDimensions();

  // If we are on web AND the screen is wider than a tablet, show the Image Cards.
  // Otherwise (mobile devices or small web screens), show the Bubbles.
  const isWebLayout = Platform.OS === 'web' && width > 768;

  useEffect(() => {
    if (!categories?.length) {
      setIsLoading(true);
      fetchCategories().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [categories, fetchCategories]);

  const handleCategoryPress = (category: Category) => {
    // @ts-ignore
    navigation.navigate('SubCategoryScreen', {
      categoryId: category.id,
      categoryTitle: category.title,
    });
  };

  const ITEM_WIDTH = isWebLayout ? 236 : 96; // Adjust based on layout sizes + gap
  const contentWidth = categories?.length ? categories.length * ITEM_WIDTH : 0;
  const shouldCenter = contentWidth < width && contentWidth > 0;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryBlue} />
      </View>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.emptyText}>Nenhuma categoria disponível</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.sliderWrapper}>
        {isWebLayout ? (
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CategoryCard category={item} onPress={handleCategoryPress} isWebLayout={isWebLayout} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.listContent,
              { justifyContent: shouldCenter ? 'center' : 'flex-start' },
            ]}
          />
        ) : (
          <View style={styles.gridContainer}>
            {categories.map((item) => (
              <CategoryCard 
                key={item.id.toString()} 
                category={item} 
                onPress={handleCategoryPress} 
                isWebLayout={isWebLayout} 
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

export default CategorySlider;
