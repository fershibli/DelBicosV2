import React, { useEffect, useState, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCategoryStore } from '@stores/Category/Category';
import { Category } from '@stores/Category/types';
import { useThemeStore, ThemeMode } from '@stores/Theme';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';
import { FontAwesome5 } from '@expo/vector-icons';

const CATEGORY_ICONS: Record<number, string> = {
  1: 'heartbeat',
  2: 'cut',
  3: 'tools',
  4: 'lightbulb',
  5: 'home',
  6: 'paw',
};

function getCategoryIconName(id: number) {
  return CATEGORY_ICONS[id] || 'shapes';
}

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
}

function CategoryCard({ category, onPress }: CategoryCardProps) {
  const iconName = getCategoryIconName(category.id);
  const [isHovered, setIsHovered] = useState(false);

  const { theme } = useThemeStore();
  const colors = useColors();
  const styles = createStyles(colors);

  const isDark = theme === ThemeMode.DARK;
  const isHighContrast = theme === ThemeMode.LIGHT_HI_CONTRAST;

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
        styles.card,
        {
          backgroundColor: colorProps.bgColor,
          borderColor: colorProps.borderColor,
          transform: [{ scale: pressed || isHovered ? 1.02 : 1 }],
        },
        isHighContrast && { borderWidth: 2 },
      ]}
      onPress={() => onPress(category)}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      accessibilityRole="button">
      <FontAwesome5
        name={iconName}
        size={32}
        color={colorProps.contentColor}
        style={{ marginRight: 16 }}
        solid
      />
      <Text
        style={[styles.title, { color: colorProps.contentColor }]}
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

  const ITEM_WIDTH = 280;
  const contentWidth = categories.length * ITEM_WIDTH;
  const shouldCenter = contentWidth < width;

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
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CategoryCard category={item} onPress={handleCategoryPress} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            { justifyContent: shouldCenter ? 'center' : 'flex-start' },
          ]}
        />
      </View>
    </View>
  );
}

export default CategorySlider;
