import { create } from 'zustand';
import {
  ListedProfessional,
  ProfessionalStore,
  Professional,
} from '@stores/Professional/types';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { ProfessionalResult } from '@components/ProfessionalResultCard';

export const useProfessionalStore = create<ProfessionalStore>((set) => ({
  professionals: [],
  selectedProfessional: null,

  fetchProfessionals: async (filter = '', page = 0, limit = 12) => {
    try {
      const response = await backendHttpClient.get('/api/professionals', {
        params: {
          termo: filter,
          page: page,
          limit: limit,
        },
      });
      const data = response.data;

      if (!data) {
        console.error(`[ProfessionalStore] Backend error: No data received.`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Espera-se que o backend retorne um array de profissionais
      // ou um objeto com { professionals: [], total: number }
      const professionals = Array.isArray(data)
        ? data
        : data.professionals || [];

      // Mapeia para o formato ListedProfessional
      const listedData: ListedProfessional[] = professionals.map(
        (prof: any) => ({
          id: prof.id,
          name: prof.User?.name || prof.name || 'Nome não disponível',
          category:
            prof.Service?.Subcategory?.name || prof.category || 'Serviços',
          rating: prof.rating ? Math.round(prof.rating * 10) / 10 : 0,
          ratingsCount: prof.ratings_count || prof.ratingsCount || 0,
          imageUrl:
            prof.User?.avatar_uri ||
            prof.Service?.banner_uri ||
            prof.imageUrl ||
            `https://picsum.photos/seed/${prof.id}/400/400`,
          location: prof.location || 'São Paulo, SP',
        }),
      );

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

      // Calcula a média de avaliações
      const ratings = professional.Appointments?.filter((a) => a.rating) || [];
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, a) => sum + (a.rating || 0), 0) /
            ratings.length
          : 0;

      // Arredonda a média para 1 casa decimal
      const roundedRating = Math.round(averageRating * 10) / 10;

      // Adiciona a média calculada ao objeto
      const professionalWithRating = {
        ...professional,
        rating: roundedRating,
        ratings_count: ratings.length,
      };

      set({ selectedProfessional: professionalWithRating });
      return professionalWithRating;
    } catch (error) {
      console.error(
        `[ProfessionalStore] Error fetching professional by ID ${id}:`,
        error,
      );
      set({ selectedProfessional: null });
      return null;
    }
  },

  fetchProfessionalsByAvailability: async (
    subCategoryId: number,
    date: string,
    lat?: number,
    lng?: number,
  ): Promise<ProfessionalResult[]> => {
    try {
      const response = await backendHttpClient.get(
        '/api/professionals/search-availability',
        {
          params: {
            subCategoryId,
            date,
            lat,
            lng,
          },
        },
      );

      const data = response.data as ProfessionalResult[];
      return data;
    } catch (error) {
      console.error('[ProfessionalStore] Error fetching availability:', error);
      return [];
    }
  },
}));
