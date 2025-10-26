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
    { id: 105, name: 'Cuidador de Idosos', categoryId: 1 },
  ],
  // Beleza & Estética (ID 2)
  2: [
    { id: 201, name: 'Cabeleireiro(a)', categoryId: 2 },
    { id: 202, name: 'Manicure & Pedicure', categoryId: 2 },
    { id: 203, name: 'Maquiador(a)', categoryId: 2 },
    { id: 204, name: 'Designer de Sobrancelhas', categoryId: 2 },
    { id: 205, name: 'Esteticista', categoryId: 2 },
    { id: 206, name: 'Barbeiro', categoryId: 2 },
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
    { id: 311, name: 'Montador de Móveis', categoryId: 3 },
    { id: 312, name: 'Instalação de Ar Condicionado', categoryId: 3 },
  ],
  4: [
    { id: 401, name: 'Motorista Particular', categoryId: 4 },
    { id: 402, name: 'Fotógrafo', categoryId: 4 },
    { id: 403, name: 'DJ para Eventos', categoryId: 4 },
    { id: 404, name: 'Organizador de Eventos', categoryId: 4 },
    { id: 405, name: 'Tradutor', categoryId: 4 },
  ],
  // Serviços Domésticos (ID 5)
  5: [
    { id: 501, name: 'Diarista / Faxineira', categoryId: 5 },
    { id: 502, name: 'Cozinheiro(a)', categoryId: 5 },
    { id: 503, name: 'Babá / Cuidador Infantil', categoryId: 5 },
    { id: 504, name: 'Jardineiro', categoryId: 5 },
    { id: 505, name: 'Passadeira', categoryId: 5 },
  ],
  // Pet (ID 6)
  6: [
    { id: 601, name: 'Dog Walker (Passeador)', categoryId: 6 },
    { id: 602, name: 'Pet Sitter (Cuidador)', categoryId: 6 },
    { id: 603, name: 'Banho e Tosa', categoryId: 6 },
    { id: 604, name: 'Adestrador', categoryId: 6 },
  ],
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
