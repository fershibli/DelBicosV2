import { create } from 'zustand';
import { Category, CategoryStore } from './types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useCategoryStore = create<CategoryStore>()((set) => ({
  categories: [],

  fetchCategories: async () => {
    try {
      const data: Category[] = [
        {
          id: 1,
          title: 'Saúde & Bem-Estar',
          description: 'Serviços relacionados à saúde e bem-estar.',
          active: true,
        },
        {
          id: 2,
          title: 'Beleza & Estética',
          description: 'Serviços de beleza e estética.',
          active: true,
        },
        {
          id: 3,
          title: 'Reformas & Reparos',
          description: 'Serviços de reformas e reparos em casa.',
          active: true,
        },
        {
          id: 4,
          title: 'Serviços Gerais',
          description: 'Serviços diversos para o dia a dia.',
          active: true,
        },
        {
          id: 5,
          title: 'Serviços Domésticos',
          description: 'Serviços relacionados a tarefas domésticas.',
          active: true,
        },
        {
          id: 6,
          title: 'Pet',
          description: 'Serviços relacionados a animais de estimação.',
          active: true,
        },
      ];

      await sleep(1000); // Simulate network delay

      set({ categories: data });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  },
}));
