import { create } from 'zustand';
import { createJSONStorage, persist } from 'expo-zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { backendHttpClient } from '@lib/helpers/httpClient';

import { Category, CategoryStore } from './types';

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      categories: [],

      fetchCategories: async () => {
        try {
          const response = await backendHttpClient.get('/api/categories');
          const data: Category[] = response.data;

          set({ categories: data });
        } catch (error) {
          console.error('Failed to fetch categories:', error);
        }
      },
    }),
    {
      name: 'category-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // @ts-ignore
      partialize: (state) => ({
        categories: state.categories,
      }),
    },
  ),
);
