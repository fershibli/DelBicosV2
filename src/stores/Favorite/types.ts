export interface FavoriteProfessional {
  professionalId: number;
  professionalName: string;
  professionalAvatar?: string;
  category?: string;
  addedAt: string;
}

export interface FavoriteState {
  favorites: FavoriteProfessional[];
  loading: boolean;
  error: string | null;
  
  addFavorite: (professional: FavoriteProfessional) => void;
  removeFavorite: (professionalId: number) => void;
  isFavorite: (professionalId: number) => boolean;
  clearFavorites: () => void;
}
