import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteState, FavoriteProfessional } from './types';

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      loading: false,
      error: null,

      addFavorite: (professional: FavoriteProfessional) => {
        const { favorites } = get();
        
        // Verificar se já existe
        if (favorites.some(fav => fav.professionalId === professional.professionalId)) {
          return;
        }

        set({
          favorites: [...favorites, professional],
        });
      },

      removeFavorite: (professionalId: number) => {
        const { favorites } = get();
        set({
          favorites: favorites.filter(fav => fav.professionalId !== professionalId),
        });
      },

      isFavorite: (professionalId: number) => {
        const { favorites } = get();
        return favorites.some(fav => fav.professionalId === professionalId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'favorite-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
