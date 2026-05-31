import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Pressable,
  useWindowDimensions,
  Platform,
  ImageBackground,
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

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop';

function getCategoryIconName(id: any) {
  const numericId = Number(id);
  return CATEGORY_ICONS[numericId] || 'shapes';
}

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
}

function CategoryCard({ category, onPress }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { theme } = useThemeStore();
  const colors = useColors();
  const styles = createStyles(colors);

  const isDark = theme === ThemeMode.DARK;
  const isHighContrast = theme === ThemeMode.LIGHT_HI_CONTRAST;

  const isWeb = Platform.OS === 'web';
  const imageUrl = category.imageUrl || PLACEHOLDER_IMAGE;

  // --- RENDERING WEB IMAGE CARD ---
  if (isWeb) {
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

  // --- RENDERING MOBILE ICON CARD (Keep untouched) ---
  const iconName = getCategoryIconName(category.id);
  const colorProps = useMemo(() => {
    let bgColor = colors.cardBackground;
    let borderColor = colors.borderColor;
    let contentColor = colors.primaryOrange;

    if (isDark) {
      bgColor = '#2C2C2C';
      borderColor = '#444';
      contentColor = '#FFFFFF';
    }

    if (isHighContrast) {
      bgColor = colors.primaryWhite;
      borderColor = colors.primaryBlack;
      contentColor = colors.primaryBlack;
    }

    if (isHovered) {
      bgColor = isDark ? colors.primaryOrange : colors.primaryBlue;
      contentColor = isDark ? colors.primaryWhite : colors.primaryWhite;
      borderColor = bgColor;
    }

    return { bgColor, borderColor, contentColor };
  }, [isHovered, isDark, isHighContrast, colors]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.categoryCard,
        {
          backgroundColor: colorProps.bgColor,
          borderColor: colorProps.borderColor,
          transform: [{ scale: pressed || isHovered ? 1.03 : 1 }],
        },
        isHighContrast && { borderWidth: 3 },
      ]}
      onPress={() => onPress(category)}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      accessibilityRole="button">
      <FontAwesome5
        name={iconName}
        size={48}
        color={colorProps.contentColor}
        style={{ marginBottom: 16 }}
        solid
      />
      <Text
        style={[styles.categoryTitle, { color: colorProps.contentColor }]}
        numberOfLines={2}>
        {category.title}
      </Text>
    </Pressable>
  );
}

function CategoryList() {
  const [isLoading, setIsLoading] = useState(true);
  const { categories, fetchCategories } = useCategoryStore();
  const navigation = useNavigation();
  const colors = useColors();
  const styles = createStyles(colors);

  const { width } = useWindowDimensions();

  // Ajuste de colunas para telas full-screen
  let numColumns = 2;
  if (width > 1600)
    numColumns = 5; // Telas ultra-wide
  else if (width > 1200) numColumns = 4;
  else if (width > 768) numColumns = 3;

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories().finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [fetchCategories, categories.length]);

  const handleCategoryPress = (category: Category) => {
    // @ts-ignore
    navigation.navigate('SubCategoryScreen', {
      categoryId: category.id,
      categoryTitle: category.title,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryBlue} />
      </View>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhuma categoria disponível</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        contentContainerStyle={styles.listContainer}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          // Padding de 12px para dar espaçamento entre os cards
          <View style={{ flex: 1 / numColumns, padding: 12 }}>
            <CategoryCard category={item} onPress={handleCategoryPress} />
          </View>
        )}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default CategoryList;
