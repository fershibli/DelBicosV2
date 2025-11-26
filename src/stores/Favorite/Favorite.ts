import { create } from 'zustand';
import { createJSONStorage, persist } from 'expo-zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteState, FavoriteProfessional } from './types';
import { FavoriteService } from '@lib/services/FavoriteService';

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      loading: false,
      error: null,

      syncWithServer: async () => {
        try {
          set({ loading: true, error: null });
          const serverFavorites = await FavoriteService.getFavorites();

          const favorites: FavoriteProfessional[] = serverFavorites.map((fav) => ({
            professionalId: fav.professionalId,
            professionalName: fav.professionalName,
            professionalAvatar: fav.professionalAvatar || undefined,
            category: fav.category || undefined,
            serviceTitle: fav.lastServiceTitle || undefined,
            addedAt: fav.addedAt,
          }));

          set({ favorites, loading: false });
          return;
        } catch (error: any) {
          console.error('Erro ao sincronizar favoritos:', error);
          set({ loading: false, error: error.message || 'Erro ao sincronizar favoritos' });
        }
      },

      addFavorite: async (professional: FavoriteProfessional) => {
        const { favorites } = get();

        if (favorites.some((fav) => fav.professionalId === professional.professionalId)) {
          return;
        }

        const newFavorites = [...favorites, professional];
        set({ favorites: newFavorites });

        try {
          await FavoriteService.addFavorite(professional.professionalId);
          return;
        } catch (error: any) {
          console.error('Erro ao salvar favorito no servidor:', error);
          // Mantém local mesmo se falhar no servidor
        }
      },

      removeFavorite: async (professionalId: number) => {
        const { favorites } = get();
        const newFavorites = favorites.filter(
          (fav) => fav.professionalId !== professionalId,
        );

        set({ favorites: newFavorites });

        try {
          await FavoriteService.removeFavorite(professionalId);
          return;
        } catch (error: any) {
          console.error('Erro ao remover favorito do servidor:', error);
          // Mantém remoção local mesmo se falhar no servidor
        }
      },

      isFavorite: (professionalId: number) => {
        const { favorites } = get();
        return favorites.some((fav) => fav.professionalId === professionalId);
      },

      clearFavorites: () => {
        set({ favorites: [], error: null });
      },
    }),
    {
      name: 'favorite-storage',
      storage: createJSONStorage(() => AsyncStorage),
      //@ts-ignore
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    },
  ),
);
