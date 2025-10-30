import { create } from 'zustand';
import { SubCategory, SubCategoryStore } from './types';
import { backendHttpClient } from '@lib/helpers/httpClient';

export const useSubCategoryStore = create<SubCategoryStore>()((set) => ({
  subCategories: [],

  fetchSubCategoriesByCategoryId: async (categoryId: number) => {
    if (!categoryId) {
      console.warn(
        '[SubCategoryStore] fetchSubCategoriesByCategoryId chamado sem categoryId.',
      );
      return;
    }

    try {
      const response = await backendHttpClient.get(
        `/api/subcategories/category/${categoryId}`,
      );

      const data: SubCategory[] = response.data;

      if (response.status !== 200) {
        throw new Error('Falha ao buscar subcategorias no servidor.');
      }

      set({ subCategories: data });
    } catch (error) {
      console.error(
        `Falha ao buscar subcategorias para categoryId ${categoryId}:`,
        error,
      );
      set({ subCategories: [] }); // Limpa em caso de erro
    }
  },
}));
