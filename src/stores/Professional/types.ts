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
