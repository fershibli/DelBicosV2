import { create } from 'zustand';
import axios from 'axios';
import { Service, ServiceStore } from './types';

export const useServiceStore = create<ServiceStore>((set) => ({
  service: null,
  loading: false,
  error: null,

  fetchServiceById: async (id: number) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get<Service>(
        `http://localhost:3000/api/services/${id}`,
      );
      set({ service: response.data });
    } catch (error) {
      console.error('Erro ao buscar serviço:', error);
      set({ error: 'Erro ao carregar serviço' });
    } finally {
      set({ loading: false });
    }
  },
}));
