// Interface para uma subcategoria individual
export interface SubCategory {
  id: number;
  title: string;
  categoryId: number; // Para sabermos a qual categoria ela pertence
}

// Interface para o store
export interface SubCategoryStore {
  subCategories: SubCategory[];
  fetchSubCategoriesByCategoryId: (categoryId: number) => Promise<void>;
}
