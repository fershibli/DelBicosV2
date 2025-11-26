import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteState, FavoriteProfessional } from './types';

// Nome da chave no banco de dados do celular
const STORAGE_KEY = 'favorite-storage';

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],
  loading: true,
  error: null,

  // Carrega os dados salvos quando o app abre
  initFavorites: async () => {
    try {
      set({ loading: true });
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        // O Zustand v5/middleware geralmente salva num formato { state: { favorites: [...] } }
        // Vamos tentar ler direto ou o formato antigo para garantir compatibilidade
        const parsed = JSON.parse(stored);
        const favorites = parsed.state ? parsed.state.favorites : parsed;

        if (Array.isArray(favorites)) {
          set({ favorites });
        }
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      set({ loading: false });
    }
  },

  addFavorite: (professional: FavoriteProfessional) => {
    const { favorites } = get();

    if (
      favorites.some(
        (fav) => fav.professionalId === professional.professionalId,
      )
    ) {
      return;
    }

    const newFavorites = [...favorites, professional];

    // 1. Atualiza a tela imediatamente
    set({ favorites: newFavorites });

    // 2. Salva no banco em segundo plano (sem usar o middleware problemático)
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites)).catch(
      (err) => console.error('Erro ao salvar favorito:', err),
    );
  },

  removeFavorite: (professionalId: number) => {
    const { favorites } = get();
    const newFavorites = favorites.filter(
      (fav) => fav.professionalId !== professionalId,
    );

    set({ favorites: newFavorites });

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites)).catch(
      (err) => console.error('Erro ao remover favorito:', err),
    );
  },

  isFavorite: (professionalId: number) => {
    const { favorites } = get();
    return favorites.some((fav) => fav.professionalId === professionalId);
  },

  clearFavorites: () => {
    set({ favorites: [] });
    AsyncStorage.removeItem(STORAGE_KEY);
  },
}));
