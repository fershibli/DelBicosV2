import { create } from 'zustand';
import { SubCategory, SubCategoryStore } from './types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- NOSSOS DADOS MOCKADOS ---
// Um mapa que armazena as subcategorias por ID da categoria pai
const MOCK_DATA_MAP: Record<number, SubCategory[]> = {
  // Saúde & Bem-Estar (ID 1)
  1: [
    { id: 101, name: 'Massagista', categoryId: 1 },
    { id: 102, name: 'Psicólogo', categoryId: 1 },
    { id: 103, name: 'Nutricionista', categoryId: 1 },
    { id: 104, name: 'Personal Trainer', categoryId: 1 },
  ],
  // Beleza & Estética (ID 2)
  2: [
    { id: 201, name: 'Cabeleireiro', categoryId: 2 },
    { id: 202, name: 'Manicure & Pedicure', categoryId: 2 },
    { id: 203, name: 'Maquiador', categoryId: 2 },
    { id: 204, name: 'Designer de Sobrancelhas', categoryId: 2 },
  ],
  // Reformas & Reparos (ID 3)
  3: [
    { id: 301, name: 'Chaveiro', categoryId: 3 },
    { id: 302, name: 'Eletricista', categoryId: 3 },
    { id: 303, name: 'Encanador', categoryId: 3 },
    { id: 304, name: 'Gás & Água', categoryId: 3 },
    { id: 305, name: 'Limpeza pós Obra', categoryId: 3 },
    { id: 306, name: 'Marido de Aluguel', categoryId: 3 },
    { id: 307, name: 'Marceneiro', categoryId: 3 },
    { id: 308, name: 'Pedreiro', categoryId: 3 },
    { id: 309, name: 'Pintor', categoryId: 3 },
    { id: 310, name: 'Vidraceiro', categoryId: 3 },
  ],
  // (Adicione mais mocks para as categorias 4, 5, 6 se desejar)
};
// --- FIM DOS DADOS MOCKADOS ---

export const useSubCategoryStore = create<SubCategoryStore>()((set) => ({
  subCategories: [],

  fetchSubCategoriesByCategoryId: async (categoryId: number) => {
    try {
      // Busca os dados no nosso mapa mockado
      const data: SubCategory[] = MOCK_DATA_MAP[categoryId] || [];

      await sleep(500); // Simula um delay de rede menor

      // Define o estado com os dados encontrados
      set({ subCategories: data });
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
      set({ subCategories: [] }); // Limpa em caso de erro
    }
  },
}));
