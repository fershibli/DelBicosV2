import { create } from 'zustand';
import axios from 'axios';
import { ProfessionalDetailsStore } from './types';
import { Professional } from '@screens/types';

export const useProfessionalDetailsStore = create<ProfessionalDetailsStore>(
  (set) => ({
    professional: null,
    loading: false,
    error: null,

    fetchProfessionalById: async (id: string) => {
      try {
        set({ loading: true, error: null });
        const response = await axios.get<Professional>(
          `http://localhost:3000/api/professional_dto/${id}`
        );
        set({ professional: response.data });
      } catch (error) {
        console.error('Erro ao buscar profissional:', error);
        set({ error: 'Erro ao carregar profissional' });
      } finally {
        set({ loading: false });
      }
    },
  })
);
