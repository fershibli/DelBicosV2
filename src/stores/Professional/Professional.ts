import { create } from 'zustand';
import {
  ListedProfessional,
  ProfessionalStore,
  Professional,
} from '@stores/Professional/types';

const MOCK_PROFESSIONALS_DB: Record<number, Professional> = {
  1: {
    id: 1,
    user_id: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    User: {
      id: 1,
      name: 'Jefferson Santos',
      avatar_uri: 'url_avatar_jefferson.jpg',
      email: 'jefferson.santos@example.com',
      phone: '+5515999991111',
      client_id: 1,
      cpf: '40560351801',
    },
    Service: {
      id: 1,
      title: 'Instalação Elétrica Residencial',
      price: '250.00',
      subcategory_id: 1,
      Subcategory: { id: 1, name: 'Eletricista' },
      description: 'Instalação completa para residências.',
      duration: 120,
      banner_uri: 'url_banner_servico_eletrica.jpg',
      active: true,
      professional_id: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    rating: 4.8,
    ratings_count: 13,
    description:
      'Eletricista experiente para todos os tipos de reparos e instalações.',
  },
  2: {
    id: 2,
    user_id: 2,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    User: {
      id: 2,
      name: 'Maria Silva',
      avatar_uri: 'url_avatar_maria.jpg',
      email: 'maria.silva@example.com',
      phone: '+5511988882222',
      client_id: 2,
      cpf: '12345678901',
    },
    Service: {
      id: 2,
      title: 'Encanamento Geral',
      price: '180.00',
      subcategory_id: 2,
      Subcategory: { id: 2, name: 'Encanador' },
      description: 'Reparos hidráulicos gerais.',
      duration: 90,
      banner_uri: null,
      active: true,
      professional_id: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    rating: 4.5,
    ratings_count: 8,
    description: 'Soluções rápidas e eficientes para problemas hidráulicos.',
  },
};

const SIMULATED_DETAIL_DELAY_MS = 500;

// --- Funções Utilitárias ---
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Store Implementation ---
export const useProfessionalStore = create<ProfessionalStore>((set) => ({
  // --- Estado ---
  professionals: [],
  selectedProfessional: null,

  // --- Ações ---
  fetchProfessionals: async (filter = '', page = 0, limit = 12) => {
    try {
      const allProfessionals = Object.values(MOCK_PROFESSIONALS_DB);

      // Simula paginação
      const startIndex = page * limit;
      const endIndex = startIndex + limit;
      const pageData = allProfessionals.slice(startIndex, endIndex);

      // Mapeia do tipo 'Professional' (detalhado) para 'ListedProfessional' (simplificado)
      const listedData: ListedProfessional[] = pageData.map((prof) => ({
        id: prof.id,
        name: prof.User.name,
        category: prof.Service?.Subcategory?.name || 'Serviços',
        rating: prof.rating || 0,
        ratingsCount: prof.ratings_count || 0,
        imageUrl:
          prof.User.avatar_uri || `https://picsum.photos/id/${prof.id}/200/200`, // Fallback
        location: 'Localização Mock', // TODO: Adicionar localização real
      }));

      await sleep(1000); // Simula delay de rede

      console.log(
        `[ProfessionalStore] Retornando ${listedData.length} itens REAIS para página ${page}.`,
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
      await sleep(SIMULATED_DETAIL_DELAY_MS);

      const professional = MOCK_PROFESSIONALS_DB[id];

      if (!professional) {
        console.warn(`[ProfessionalStore] Mock data for ID ${id} not found.`);
        return null;
      }

      set({ selectedProfessional: professional });
      return professional;
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
