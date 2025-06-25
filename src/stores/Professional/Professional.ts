import { create } from 'zustand';
import {
  ListedProfessional,
  ProfessionalDetailsStore,
  ProfessionalStore,
} from '@stores/Professional/types';
import axios from 'axios';
import { Professional } from '@screens/types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useProfessionalStore = create<ProfessionalStore>((set) => ({
  fetchProfessionals: async (filter = '', page = 1, limit = 10) => {
    try {
      const mockedData: ListedProfessional[] = [];
      for (let i = 1; i <= limit; i++) {
        mockedData.push({
          id: i,
          name: `Professional ${i + (page - 1) * limit}`,
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

export const useProfessionalDetailsStore = create<ProfessionalDetailsStore>(
  (set) => ({
    professional: null,
    loading: false,
    error: null,

    fetchProfessionalById: async (id: string) => {
      try {
        set({ loading: true, error: null });
        const response = await axios.get<Professional>(
          `http://localhost:3000/api/professionals/${id}`,
        );
        set({ professional: response.data });
      } catch (error) {
        console.error('Erro ao buscar profissional:', error);
        set({ error: 'Erro ao carregar profissional' });
      } finally {
        set({ loading: false });
      }
    },

    getProfessionalById: async (id: string) => {
      try {
        set({ loading: true, error: null });
        const response = await axios.get<Professional>(
          `http://localhost:3000/api/professionals/${id}`,
        );
        set({ professional: response.data });
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar profissional:', error);
        set({ error: 'Erro ao carregar profissional' });
        throw error;
      } finally {
        set({ loading: false });
      }
    },
  }),
);
