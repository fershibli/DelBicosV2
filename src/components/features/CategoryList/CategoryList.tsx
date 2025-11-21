import React, { useEffect, useState } from 'react';
import { useCategoryStore } from '@stores/Category/Category';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Pressable,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Category } from '@stores/Category/types';
import colors from '@theme/colors';
import { styles } from './styles';
import { useThemeStore, ThemeMode } from '@stores/Theme';

// Imports dos seus SVGs
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
  const isDark = theme === ThemeMode.DARK;

  const cardStyle = [
    styles.categoryCard,
    {
      backgroundColor: isDark ? colors.secondaryGray : colors.cardBackground,
      borderColor: isDark ? colors.secondaryGray : colors.borderColor,
    },
    isHovered &&
      (isDark
        ? {
            backgroundColor: colors.primaryOrange,
            borderColor: colors.primaryOrange,
          }
        : styles.categoryCardHovered),
  ];

  const titleStyle = [
    styles.categoryTitle,
    { color: isDark ? colors.primaryBlack : undefined },
    isHovered && (isDark ? { color: '#E2E8F0' } : styles.categoryTitleHovered),
  ];

  const iconColor = isDark
    ? '#E2E8F0'
    : isHovered
      ? '#E2E8F0'
      : colors.primaryOrange;

  return (
    <Pressable
      style={cardStyle}
      onPress={() => onPress(category)}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}>
      <info.IconComponent
        width={info.width * 0.8}
        height={info.height * 0.8}
        color={iconColor}
      />
      <Text style={titleStyle}>{category.title}</Text>
    </Pressable>
  );
}

function CategoryList() {
  const [isLoading, setIsLoading] = useState(true);
  const { categories, fetchCategories } = useCategoryStore();
  const navigation = useNavigation();

  useEffect(() => {
    if (!categories?.length) {
      setIsLoading(true);
      fetchCategories().then(() => setIsLoading(false));
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
      <View style={styles.loadingContainer}>
        <Text>Nenhuma categoria disponível</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CategoryCard category={item} onPress={handleCategoryPress} />
      )}
      numColumns={Platform.OS === 'web' ? 3 : 2}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default CategoryList;
