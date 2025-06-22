import { create } from 'zustand';
import { Category, CategoryStore } from './types';
import { backendHttpClient } from '@lib/helpers/httpClient';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useCategoryStore = create<CategoryStore>()((set) => ({
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
}));
