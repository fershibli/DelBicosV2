import { create } from 'zustand';
import {
  ListedProfessional,
  ProfessionalStore,
  Professional,
} from '@stores/Professional/types';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { ProfessionalResult } from '@components/features/ProfessionalResultCard';

export const useProfessionalStore = create<ProfessionalStore>((set) => ({
  professionals: [],
  selectedProfessional: null,

  fetchProfessionals: async (filter = '', page = 0, limit = 12) => {
    try {
      const response = await backendHttpClient.get('/api/professionals', {
        params: { termo: filter, page, limit },
      });

      const rawData = Array.isArray(response.data)
        ? response.data
        : response.data.professionals || [];

      const mappedProfessionals: ListedProfessional[] = rawData.map(
        (prof: any) => ({
          id: prof.id,
          name: prof.User?.name || prof.name || 'Profissional',
          rating: Number(prof.rating || 0),
          ratingsCount: Number(prof.ratings_count || 0),
          imageUrl:
            prof.avatar_uri ||
            prof.User?.avatar_uri ||
            'https://via.placeholder.com/150',

          location:
            prof.MainAddress && prof.MainAddress.city
              ? `${prof.MainAddress.city}, ${prof.MainAddress.state || 'BR'}`
              : 'Localização não informada',

          distance:
            prof.distance_km && prof.distance_km > 0
              ? Number(parseFloat(prof.distance_km).toFixed(1))
              : undefined,

          offeredServices: prof.Services
            ? prof.Services.map((s: any) => s.title)
            : ['Serviços Gerais'],

          category: prof.Services?.[0]?.title || 'Serviços Diversos',
        }),
      );

      return mappedProfessionals;
    } catch (error) {
      console.error('[ProfessionalStore] Erro ao buscar profissionais:', error);
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
