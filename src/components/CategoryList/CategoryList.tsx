import React, { useEffect, useState } from 'react';
import { useCategoryStore } from '@stores/Category/Category';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { Category } from '@stores/Category/types';
import colors from '@theme/colors';
import { styles } from './styles';

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

// {src, width, height}
const categoryImagesById: Record<number, any> = {
  1: {
    src: healthSVG,
    width: 72,
    height: 70,
  },
  2: {
    src: beautySVG,
    width: 63,
    height: 87,
  },
  3: {
    src: repairSVG,
    width: 70,
    height: 75,
  },
  4: {
    src: miscSVG,
    width: 51,
    height: 69,
  },
  5: {
    src: homeSVG,
    width: 61,
    height: 50,
  },
  6: {
    src: petsSVG,
    width: 74,
    height: 74,
  },
};

function getCategoryImagesById(id: number) {
  return categoryImagesById[id] || miscSVG;
}

interface CategoryCardProps {
  category: Category;
  imageUrl: string;
  onPress: (category: Category) => void;
}

function CategoryCard({ category, imageUrl, onPress }: CategoryCardProps) {
  const image = getCategoryImagesById(category.id);
  return (
    <View style={styles.categoryCard}>
      <image.src
        style={{
          width: image.width,
          height: image.height,
          resizeMode: 'contain',
        }}
        color={colors.primaryOrange}
      />
      <Text style={styles.categoryTitle}>{category.title}</Text>
    </View>
  );
}

function CategoryList() {
  const [isLoading, setIsLoading] = useState(true);

  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    if (!categories?.length) {
      setIsLoading(true);
      fetchCategories().then(() => {
        setIsLoading(false);
      });
    }
  }, [categories, fetchCategories]);

  if (isLoading) {
    return (
      <View style={styles.externalContainer}>
        <ActivityIndicator size="large" color={colors.primaryBlue} />
      </View>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <View style={styles.externalContainer}>
        <Text>No categories available</Text>
      </View>
    );
  }

  return (
    <View style={styles.externalContainer}>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            imageUrl={''}
            onPress={(category) => console.log('Category pressed:', category)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default CategoryList;
