import { create } from 'zustand';
import {
  ListedProfessional,
  ProfessionalStore,
  Professional,
} from '@stores/Professional/types';
import { backendHttpClient } from '@lib/helpers/httpClient';

export const useProfessionalStore = create<ProfessionalStore>((set) => ({
  professionals: [],
  selectedProfessional: null,

  fetchProfessionals: async (filter = '', page = 0, limit = 12) => {
    try {
      const response = await backendHttpClient.get('/api/professionals', {
        params: {
          search: filter,
          page: page,
          limit: limit,
        },
      });

      const backendData: any[] = response.data;

      const listedData: ListedProfessional[] = backendData.map((prof) => {
        let categoryName = 'Serviços';
        if (
          prof.services &&
          prof.services.length > 0 &&
          prof.services[0].Subcategory
        ) {
          categoryName = prof.services[0].Subcategory.name;
        }

        return {
          id: prof.id,
          name: prof.User?.name || 'Nome Indisponível',
          category: categoryName,
          rating: prof.rating || 0,
          ratingsCount: prof.ratings_count || 0,
          imageUrl:
            prof.User?.avatar_uri ||
            `https://picsum.photos/id/${prof.id}/200/200`,
          location: prof.MainAddress?.city || 'Local não informado',
          Service: prof.Services,
        };
      });

      return listedData;
    } catch (error) {
      console.error('[ProfessionalStore] Error fetching professionals:', error);
      return [];
    }
  },

  fetchProfessionalById: async (id: number): Promise<Professional | null> => {
    set({ selectedProfessional: null });

    try {
      const response = await backendHttpClient.get(`/api/professionals/${id}`);

      if (response.status !== 200 || !response.data) {
        throw new Error(`Profissional com ID ${id} não encontrado.`);
      }

      const professional: Professional = response.data;

      set({ selectedProfessional: professional });
      return professional;
    } catch (error) {
      console.error(
        `[ProfessionalStore] Error fetching professional by ID ${id}:`,
        error,
      );
      set({ selectedProfessional: null });
      return null;
    }
  },
}));
