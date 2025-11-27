import { create } from 'zustand';
import { createJSONStorage, persist } from 'expo-zustand-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FavoriteState,
  FavoriteProfessional,
  FavoritesListResponse,
} from './types';
import { backendHttpClient } from '@lib/helpers/httpClient';

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      loading: false,
      error: null,

      syncWithServer: async () => {
        try {
          console.log('🔄 Sincronizando favoritos com servidor...');
          set({ loading: true, error: null });

          const response =
            await backendHttpClient.get<FavoritesListResponse>(
              '/api/favorites',
            );
          const serverFavorites = response.data.favorites;

          console.log(
            '✅ Favoritos recebidos do servidor:',
            serverFavorites.length,
          );

          const favorites: FavoriteProfessional[] = serverFavorites.map(
            (fav) => ({
              professionalId: fav.professionalId,
              professionalName: fav.professionalName,
              professionalAvatar: fav.professionalAvatar || undefined,
              category: fav.category || undefined,
              serviceTitle: fav.lastServiceTitle || undefined,
              addedAt: fav.addedAt,
            }),
          );

          set({ favorites, loading: false });
          console.log('✅ Favoritos sincronizados:', favorites.length);
          return;
        } catch (error: any) {
          console.error('❌ Erro ao sincronizar favoritos:', error);
          set({
            loading: false,
            error: error.message || 'Erro ao sincronizar favoritos',
          });
        }
      },

      addFavorite: async (professional: FavoriteProfessional) => {
        const { favorites } = get();

        if (
          favorites.some(
            (fav) => fav.professionalId === professional.professionalId,
          )
        ) {
          console.log(
            '⚠️ Profissional já está nos favoritos:',
            professional.professionalId,
          );
          return;
        }

        console.log(
          '➕ Adicionando favorito local:',
          professional.professionalName,
        );
        const newFavorites = [...favorites, professional];
        set({ favorites: newFavorites });

        try {
          console.log(
            '📤 Enviando favorito para servidor:',
            professional.professionalId,
          );
          await backendHttpClient.post('/api/favorites', {
            professionalId: professional.professionalId,
          });
          console.log('✅ Favorito salvo no servidor!');
          return;
        } catch (error: any) {
          console.error('❌ Erro ao salvar favorito no servidor:', error);
          console.error(
            'Detalhes do erro:',
            error.response?.data || error.message,
          );
          // Mantém local mesmo se falhar no servidor
        }
      },

      removeFavorite: async (professionalId: number) => {
        const { favorites } = get();
        const newFavorites = favorites.filter(
          (fav) => fav.professionalId !== professionalId,
        );

        console.log('➖ Removendo favorito local:', professionalId);
        set({ favorites: newFavorites });

        try {
          console.log('📤 Enviando remoção para servidor:', professionalId);
          await backendHttpClient.delete(`/api/favorites/${professionalId}`);
          console.log('✅ Favorito removido do servidor!');
          return;
        } catch (error: any) {
          console.error('❌ Erro ao remover favorito do servidor:', error);
          console.error(
            'Detalhes do erro:',
            error.response?.data || error.message,
          );
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
