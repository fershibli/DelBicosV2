import { create } from 'zustand';
import {
  ListedProfessional,
  ProfessionalStore,
  Professional,
} from '@stores/Professional/types';

const MOCK_PROFESSIONALS_DB: Record<number, Professional> = {
  1: {
    id: 1,
    user_id: 101,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    User: {
      id: 101,
      name: 'Jefferson Santos',
      avatar_uri: 'url_avatar_jefferson.jpg',
      email: 'jefferson.santos@example.com',
      phone: '+5515999991111',
      client_id: 1,
      cpf: '40560351801',
    },
    Service: {
      id: 501,
      title: 'Instalação Elétrica Residencial',
      price: '250.00',
      subcategory_id: 302,
      Subcategory: { id: 302, name: 'Eletricista' },
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
    user_id: 102,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    User: {
      id: 102,
      name: 'Maria Silva',
      avatar_uri: 'url_avatar_maria.jpg',
      email: 'maria.silva@example.com',
      phone: '+5511988882222',
      client_id: 2,
      cpf: '12345678901',
    },
    Service: {
      id: 601,
      title: 'Encanamento Geral',
      price: '180.00',
      subcategory_id: 303,
      Subcategory: { id: 303, name: 'Encanador' },
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

const SIMULATED_DELAY_MS = 1000;
const SIMULATED_DETAIL_DELAY_MS = 500;
const MOCK_TOTAL_ITEMS = 80;

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
      const startIndex = page * limit;

      if (startIndex >= MOCK_TOTAL_ITEMS) {
        await sleep(SIMULATED_DELAY_MS / 3);
        return [];
      }

      const mockedData: ListedProfessional[] = [];
      const endIndex = Math.min(startIndex + limit, MOCK_TOTAL_ITEMS);

      for (let i = startIndex; i < endIndex; i++) {
        const uniqueId = i + 1;
        mockedData.push({
          id: uniqueId,
          name: `Profissional Mock ${uniqueId}`,
          category: `Categoria ${Math.ceil(uniqueId / 5)}`,
          rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
          ratingsCount: Math.floor(Math.random() * 100) + 5,
          imageUrl: `https://picsum.photos/id/${uniqueId}/200/200`,
          location: `Localização Mock ${uniqueId}`,
        });
      }

      await sleep(SIMULATED_DELAY_MS);

      return mockedData;
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
