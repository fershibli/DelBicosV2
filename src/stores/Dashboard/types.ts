export type KpisResponse = {
  totalServices: number;
  totalEarnings: number;
  avgRating?: number;
};

export type EarningsMonth = {
  month: string; // "MM-YYYY"
  total: number;
  // optional derived ISO date for the first day of the month (YYYY-MM-01)
  parsedDate?: string;
};

export type ServiceCategory = {
  category: string;
  count: number;
};

export type EarningsResponse = EarningsMonth[];
export type CategoriesResponse = ServiceCategory[];

export type DashboardState = {
  kpis: KpisResponse | null;
  earnings: EarningsResponse;
  categories: CategoriesResponse;
  loading: boolean;
  error: string | null;
  fetchKpis: () => Promise<void>;
  fetchEarnings: (from?: string, to?: string) => Promise<void>;
  fetchCategories: (from?: string, to?: string) => Promise<void>;
  clear: () => void;
};
