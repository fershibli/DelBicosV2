export type Service = {
  id: number;
  title: string;
  description?: string;
  price: number;
  duration: number;
  bannerImg?: string;
  active?: boolean;
  subcategory_id: number;
  professional_id: number;
  createdAt: string;
  updatedAt: string;
};

export type ServiceStore = {
  service: Service | null;
  loading: boolean;
  error: string | null;
  fetchServiceById: (id: number) => Promise<void>;
};
