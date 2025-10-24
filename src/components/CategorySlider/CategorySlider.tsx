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
import { Category } from '@stores/Category/types';
import { useNavigation } from '@react-navigation/native';
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

// {IconComponent, width, height}
const categoryImagesById: Record<number, any> = {
  1: { IconComponent: healthSVG, width: 72, height: 70 },
  2: { IconComponent: beautySVG, width: 63, height: 87 },
  3: { IconComponent: repairSVG, width: 70, height: 75 },
  4: { IconComponent: miscSVG, width: 51, height: 69 },
  5: { IconComponent: homeSVG, width: 61, height: 50 },
  6: { IconComponent: petsSVG, width: 74, height: 74 },
};

function getCategoryImagesById(id: number) {
  return categoryImagesById[id] || categoryImagesById[4];
}

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
}

function CategoryCard({ category, onPress }: CategoryCardProps) {
  const image = getCategoryImagesById(category.id);

  // 6. ADICIONE o estado de hover
  const [isHovered, setIsHovered] = useState(false);

  // 7. Estilos dinâmicos para o card, texto e ícone
  const cardStyle = [
    styles.categoryCard,
    isHovered && styles.categoryCardHovered,
  ];
  const titleStyle = [
    styles.categoryTitle,
    isHovered && styles.categoryTitleHovered,
  ];
  const iconColor = isHovered ? '#FFFFFF' : '#003366'; // Ícone branco no hover

  return (
    // 8. Mude para Pressable e adicione eventos de hover
    <Pressable
      style={cardStyle}
      onPress={() => onPress(category)}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}>
      <image.IconComponent
        style={{
          width: image.width * 0.7, // Ícones um pouco menores
          height: image.height * 0.7,
          resizeMode: 'contain',
        }}
        color={iconColor} // Cor do ícone agora é dinâmica
      />
      <Text style={titleStyle}>{category.title}</Text>
    </Pressable>
  );
}

function CategorySlider() {
  const [isLoading, setIsLoading] = useState(true);

  const { categories, fetchCategories } = useCategoryStore();

  const navigation = useNavigation();

  useEffect(() => {
    if (!categories?.length) {
      setIsLoading(true);
      fetchCategories().then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [categories, fetchCategories]);

  const handleCategoryPress = (category: Category) => {
    navigation.navigate('SubCategoryScreen', {
      categoryId: category.id,
      categoryTitle: category.title,
    });
  };

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
            onPress={handleCategoryPress} // Passa a função de navegação
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default CategorySlider;
