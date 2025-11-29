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

// Imports dos SVGs
// @ts-ignore
import beautySVG from '@assets/categories/beauty.svg';
// @ts-ignore
import healthSVG from '@assets/categories/health.svg';
// @ts-ignore
import homeSVG from '@assets/categories/home.svg';
// @ts-ignore
import miscSVG from '@assets/categories/miscellaneous.svg';
// @ts-ignore
import petsSVG from '@assets/categories/pets.svg';
// @ts-ignore
import repairSVG from '@assets/categories/repair.svg';

const categoryInfoById: Record<number, any> = {
  1: { IconComponent: healthSVG, width: 72, height: 70 },
  2: { IconComponent: beautySVG, width: 63, height: 87 },
  3: { IconComponent: repairSVG, width: 70, height: 75 },
  4: { IconComponent: miscSVG, width: 51, height: 69 },
  5: { IconComponent: homeSVG, width: 61, height: 50 },
  6: { IconComponent: petsSVG, width: 74, height: 74 },
};

function getCategoryInfo(id: number) {
  return categoryInfoById[id] || categoryInfoById[4];
}

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
}

function CategoryCard({ category, onPress }: CategoryCardProps) {
  const info = getCategoryInfo(category.id);
  const [isHovered, setIsHovered] = useState(false);

  const { theme } = useThemeStore();
  const colors = useColors();
  const styles = createStyles(colors);

  const isDark = theme === ThemeMode.DARK;
  const isHighContrast = theme === ThemeMode.LIGHT_HI_CONTRAST;

  const colorProps = useMemo(() => {
    const active = isHovered;

    let bgColor = colors.cardBackground;
    let borderColor = colors.borderColor;
    let titleColor = colors.primaryOrange;
    let iconColor = colors.primaryOrange;

    if (isDark) {
      borderColor = colors.cardBackground;
      titleColor = colors.primaryWhite;
      iconColor = colors.primaryWhite;
    }

    if (isHighContrast) {
      bgColor = colors.primaryWhite;
      borderColor = colors.primaryBlack;
      titleColor = colors.primaryBlack;
      iconColor = colors.primaryBlack;
    }

    if (active) {
      if (isHighContrast) {
        bgColor = colors.primaryBlue;
        titleColor = colors.primaryWhite;
        iconColor = colors.primaryWhite;
        borderColor = colors.primaryBlue;
      } else if (isDark) {
        bgColor = colors.primaryOrange;
        titleColor = colors.primaryWhite;
        iconColor = colors.primaryWhite;
        borderColor = colors.primaryOrange;
      } else {
        bgColor = colors.primaryBlue;
        titleColor = colors.primaryWhite;
        iconColor = colors.primaryWhite;
        borderColor = colors.primaryBlue;
      }
    }

    return { bgColor, borderColor, titleColor, iconColor };
  }, [isHovered, isDark, isHighContrast, colors]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.categoryCard,
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
      accessibilityRole="button"
      accessibilityLabel={`Categoria ${category.title}`}>
      <info.IconComponent
        width={info.width * 0.8}
        height={info.height * 0.8}
        color={colorProps.iconColor}
      />
      <Text
        style={[
          styles.categoryTitle,
          { color: colorProps.titleColor },
          isHighContrast && { fontWeight: 'bold' },
        ]}
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
  const numColumns = width > 1000 ? 4 : width > 600 ? 3 : 2;

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
          <View style={{ flex: 1 / numColumns }}>
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
