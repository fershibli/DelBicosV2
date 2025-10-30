import { create } from 'zustand';
import {
  ListedProfessional,
  ProfessionalStore,
  Professional,
} from '@stores/Professional/types';
import { HTTP_DOMAIN } from '@config/varEnvs';

// --- Store Implementation ---
export const useProfessionalStore = create<ProfessionalStore>((set) => ({
  // --- Estado ---
  professionals: [],
  selectedProfessional: null,

  // --- Ações ---
  fetchProfessionals: async (filter = '', page = 0, limit = 12) => {
    try {
      const url = new URL(`${HTTP_DOMAIN}/api/professionals`);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('limit', limit.toString());
      if (filter) {
        url.searchParams.append('filter', filter);
      }

      console.log(`[ProfessionalStore] Fetching professionals from: ${url}`);

      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `[ProfessionalStore] Backend error ${response.status}:`,
          errorText,
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

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
          rating: prof.rating || 0,
          ratingsCount: prof.ratings_count || prof.ratingsCount || 0,
          imageUrl:
            prof.User?.avatar_uri ||
            prof.Service?.banner_uri ||
            prof.imageUrl ||
            `https://picsum.photos/seed/${prof.id}/400/400`,
          location: prof.location || 'São Paulo, SP',
        }),
      );

      console.log(
        `[ProfessionalStore] Retornando ${listedData.length} profissionais para página ${page}.`,
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
      const url = `${HTTP_DOMAIN}/api/professionals/${id}`;
      console.log(`[ProfessionalStore] Fetching professional from: ${url}`);

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 404) {
          console.warn(
            `[ProfessionalStore] Professional with ID ${id} not found.`,
          );
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const professional: Professional = await response.json();

      // Calcula a média de avaliações
      const ratings = professional.Appointments?.filter((a) => a.rating) || [];
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, a) => sum + (a.rating || 0), 0) /
            ratings.length
          : 0;

      // Adiciona a média calculada ao objeto
      const professionalWithRating = {
        ...professional,
        rating: averageRating,
        ratings_count: ratings.length,
      };

      console.log(
        `[ProfessionalStore] Professional loaded:`,
        professionalWithRating,
      );

      set({ selectedProfessional: professionalWithRating });
      return professionalWithRating;
    } catch (error) {
      console.error(
        '[ProfessionalStore] Error fetching professional by ID:',
        error,
      );
      set({ selectedProfessional: null });
      return null;
    }
  },
}));
