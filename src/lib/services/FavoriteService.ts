import { backendHttpClient } from '@lib/helpers/httpClient';

export interface FavoriteResponse {
  id: number;
  professionalId: number;
  professionalName: string;
  professionalAvatar: string | null;
  category: string | null;
  lastServiceTitle: string | null;
  addedAt: string;
}

export interface FavoritesListResponse {
  favorites: FavoriteResponse[];
}

export class FavoriteService {
  private static BASE_URL = '/api/favorites';

  // Listar todos os favoritos
  static async getFavorites(): Promise<FavoriteResponse[]> {
    try {
      const response = await backendHttpClient.get<FavoritesListResponse>(
        this.BASE_URL
      );
      return response.data.favorites;
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
      throw error;
    }
  }

  // Adicionar favorito
  static async addFavorite(professionalId: number): Promise<void> {
    try {
      await backendHttpClient.post(this.BASE_URL, { professionalId });
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
      throw error;
    }
  }

  // Remover favorito
  static async removeFavorite(professionalId: number): Promise<void> {
    try {
      await backendHttpClient.delete(`${this.BASE_URL}/${professionalId}`);
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      throw error;
    }
  }

  // Verificar se está favoritado
  static async checkFavorite(professionalId: number): Promise<boolean> {
    try {
      const response = await backendHttpClient.get<{ isFavorite: boolean }>(
        `${this.BASE_URL}/check/${professionalId}`
      );
      return response.data.isFavorite;
    } catch (error) {
      console.error('Erro ao verificar favorito:', error);
      return false;
    }
  }
}
