import { create } from 'zustand';
import {
  ListedProfessional,
  ProfessionalStore,
} from '@stores/Professional/types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useProfessionalStore = create<ProfessionalStore>((set) => ({
  fetchProfessionals: async (filter = '', page = 1, limit = 10) => {
    try {
      const mockedData: ListedProfessional[] = [];
      for (let i = 1; i <= limit; i++) {
        mockedData.push({
          id: i,
          name: `Professional ${i}`,
          category: 'Category',
          rating: Math.random() * 5,
          ratingsCount: Math.floor(Math.random() * 100),
          imageUrl: `https://picsum.photos/200/300?random=${i}`,
          location: `Location ${i}`,
        });
      }

      sleep(1000); // Simulate network delay

      return mockedData;
    } catch (error) {
      console.error('Error fetching professionals:', error);
      return [];
    }
  },
}));
