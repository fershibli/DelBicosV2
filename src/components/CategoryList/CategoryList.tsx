import React, { useEffect, useState } from 'react';
import { useCategoryStore } from '@stores/Category/Category';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Category } from '@stores/Category/types';
import colors from '@theme/colors';
import { styles } from './styles';

interface CategoryCardProps {
  category: Category;
  imageUrl: string;
  onPress: (category: Category) => void;
}

function CategoryCard({ category, imageUrl, onPress }: CategoryCardProps) {
  return (
    <View style={styles.categoryCard}>
      <Text>{category.title}</Text>
    </View>
  );
}

function CategoryList() {
  const [isLoading, setIsLoading] = useState(true);

  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      setIsLoading(false);
    };
    if (!categories?.length) {
      setIsLoading(true);
      fetchData();
    }
  }, [categories, fetchCategories]);

  if (isLoading) {
    return <ActivityIndicator size="large" color={colors.primaryBlue} />;
  }

  if (!categories || categories.length === 0) {
    return (
      <View>
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
