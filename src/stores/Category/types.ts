export interface Category {
  id: number;
  title: string;
  description?: string;
  active: boolean;
}

export interface CategoryStore {
  categories: Category[];
  fetchCategories: () => Promise<void>;
}
