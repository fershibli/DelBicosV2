import { create } from 'zustand';
import {
  ListedProfessional,
  ProfessionalStore,
  Professional,
} from '@stores/Professional/types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_PROFESSIONALS_DB: Record<number, Professional> = {
  // Exemplo para Jefferson Santos (ID 1)
  1: {
    id: 1,
    user_id: 101, // ID do usuário associado
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    User: {
      // Dados do Usuário
      id: 101,
      name: 'Jefferson Santos',
      avatar_uri: 'url_avatar_jefferson.jpg',
      // --- ADICIONE OS CAMPOS FALTANTES ABAIXO ---
      email: 'jefferson.santos@example.com', // Exemplo
      phone: '+5515999991111', // Exemplo
      // Assumindo que Professional não tem cpf ou client_id diretamente,
      // mas se sua interface User exige, adicione como null ou valor mockado.
      // Se esses campos pertencem a uma interface Client separada,
      // ajuste sua interface Professional para não exigir User com esses campos.
      // Vou adicionar como null/exemplo para satisfazer o TS por agora:
      client_id: 1, // Ou um ID de cliente mockado se aplicável
      cpf: '40560351801', // Ou um CPF mockado se aplicável
      // --- FIM DOS CAMPOS ADICIONADOS ---
    },
    Service: {
      // Dados do Serviço principal
      id: 501,
      title: 'Instalação Elétrica Residencial',
      price: '250.00',
      subcategory_id: 302,
      Subcategory: { id: 302, name: 'Eletricista' },
      // --- ADICIONE OS CAMPOS FALTANTES ABAIXO ---
      description: 'Instalação completa para residências.', // Exemplo
      duration: 120, // Exemplo: 120 minutos
      banner_uri: 'url_banner_servico_eletrica.jpg', // Exemplo
      active: true, // Exemplo
      professional_id: 1, // Exemplo (ID do profissional)
      createdAt: new Date().toISOString(), // Exemplo
      updatedAt: new Date().toISOString(), // Exemplo
      // --- FIM DOS CAMPOS ADICIONADOS ---
    },
    rating: 4.8,
    ratings_count: 13,
    description:
      'Eletricista experiente para todos os tipos de reparos e instalações.',
  },
  // Exemplo para Outro Profissional (ID 2)
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
      // --- ADICIONE OS CAMPOS FALTANTES ABAIXO ---
      email: 'maria.silva@example.com', // Exemplo
      phone: '+5511988882222', // Exemplo
      client_id: 2,
      cpf: '12345678901',
      // --- FIM DOS CAMPOS ADICIONADOS ---
    },
    Service: {
      id: 601,
      title: 'Encanamento Geral',
      price: '180.00',
      subcategory_id: 303,
      Subcategory: { id: 303, name: 'Encanador' },
      // --- ADICIONE OS CAMPOS FALTANTES ABAIXO ---
      description: 'Reparos hidráulicos gerais.', // Exemplo
      duration: 90, // Exemplo
      banner_uri: null, // Exemplo
      active: true, // Exemplo
      professional_id: 2, // Exemplo
      createdAt: new Date().toISOString(), // Exemplo
      updatedAt: new Date().toISOString(), // Exemplo
      // --- FIM DOS CAMPOS ADICIONADOS ---
    },
    rating: 4.5,
    ratings_count: 8,
    description: 'Soluções rápidas e eficientes para problemas hidráulicos.',
  },
  // Adicione mais profissionais mockados se precisar testar outros IDs
};

export const useProfessionalStore = create<ProfessionalStore>((set) => ({
  professionals: [],
  selectedProfessional: null,

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
  fetchProfessionalById: async (id: number): Promise<Professional | null> => {
    console.log(`[ProfessionalStore] Buscando profissional com ID: ${id}`);
    try {
      // --- LÓGICA MOCKADA (ou sua lógica real) ---
      await sleep(500);
      const professional = MOCK_PROFESSIONALS_DB[id]; // Assumindo MOCK_PROFESSIONALS_DB definido
      if (!professional) {
        console.error(`[ProfessionalStore] Mock para ID ${id} não encontrado.`);
        set({ selectedProfessional: null });
        return null;
      }
      console.log(
        '[ProfessionalStore] Profissional encontrado (mock):',
        professional,
      );
      set({ selectedProfessional: professional }); // Define o estado
      return professional;
      // --- FIM MOCK ---
    } catch (error) {
      console.error('Falha ao buscar profissional por ID:', error);
      set({ selectedProfessional: null });
      return null;
    }
  },
}));
