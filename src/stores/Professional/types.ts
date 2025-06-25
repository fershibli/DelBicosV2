import { Professional } from '@screens/types';

export interface ListedProfessional {
  id: number;
  name: string;
  category: string;
  rating: number;
  ratingsCount: number;
  imageUrl: string;
  location: string;
}

export interface ProfessionalStore {
  fetchProfessionals: (
    filter?: string,
    page?: number,
    limit?: number,
  ) => Promise<ListedProfessional[]>;
}

export interface ProfessionalDetailsStore {
  professional: Professional | null;
  loading: boolean;
  error: string | null;
  fetchProfessionalById: (id: string) => Promise<void>;
}
