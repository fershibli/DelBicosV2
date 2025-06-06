import React, { useEffect, useState } from 'react';
import { useCategoryStore } from '@stores/Category/Category';
import { View } from 'react-native';

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

  return <View></View>;
}

export default CategoryList;
