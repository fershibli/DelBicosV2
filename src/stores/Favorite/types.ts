export interface FavoriteProfessional {
  professionalId: number;
  professionalName: string;
  professionalAvatar?: string;
  category?: string;
  serviceTitle?: string;
  addedAt: string;
}

export interface FavoriteState {
  favorites: FavoriteProfessional[];
  loading: boolean;
  error: string | null;

  syncWithServer: () => Promise<void>;
  addFavorite: (professional: FavoriteProfessional) => Promise<void>;
  removeFavorite: (professionalId: number) => Promise<void>;
  isFavorite: (professionalId: number) => boolean;
  clearFavorites: () => void;
}
