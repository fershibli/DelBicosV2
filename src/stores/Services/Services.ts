import { create } from 'zustand';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { useUserStore } from '@stores/User';

export type ServiceItem = {
  id: number;
  title: string;
  description?: string;
  date?: string; // YYYY-MM-DD
  price_cents?: number;
  duration?: number; // minutos
  subcategory_id?: number;
  banner_uri?: string | null;
  active?: boolean;
};

type ServicesState = {
  services: ServiceItem[];
  loading: boolean;
  fetchServices: () => Promise<ServiceItem[]>;
  createService: (data: Partial<ServiceItem>) => Promise<ServiceItem | null>;
  updateService: (
    id: number,
    data: Partial<ServiceItem>,
  ) => Promise<ServiceItem | null>;
  deleteService: (id: number) => Promise<boolean>;
};

export const useServicesStore = create<ServicesState>((set, get) => ({
  services: [],
  loading: false,

  // NOTE: normalization removed — backend now returns `price_cents` reliably

  fetchServices: async () => {
    set({ loading: true });
    try {
      const professionalId = useUserStore.getState().user?.professional_id;
      const listPath = professionalId
        ? `/api/professionals/${professionalId}/services`
        : '/api/services';
      const res = await backendHttpClient.get(listPath);
      const raw = Array.isArray(res.data) ? res.data : res.data.services || [];
      const data: ServiceItem[] = raw as ServiceItem[];
      set({ services: data, loading: false });
      return data;
    } catch (e) {
      console.error('[Services] fetchServices', e);
      set({ loading: false });
      return [];
    }
  },

  createService: async (data) => {
    try {
      const professionalId = useUserStore.getState().user?.professional_id;
      const postPath = professionalId
        ? `/api/professionals/${professionalId}/services`
        : '/api/services';
      const res = await backendHttpClient.post(postPath, data);
      const raw = res.data;
      const created = raw as ServiceItem;
      set({ services: [...(get().services || []), created] });
      return created;
    } catch (e) {
      console.error('[Services] createService', e);
      return null;
    }
  },

  updateService: async (id, data) => {
    try {
      const res = await backendHttpClient.put(`/api/services/${id}`, data);
      const raw = res.data;
      const updated = raw as ServiceItem;
      set({
        services: (get().services || []).map((s) =>
          s.id === id ? updated : s,
        ),
      });
      return updated;
    } catch (e) {
      console.error('[Services] updateService', e);
      return null;
    }
  },

  deleteService: async (id) => {
    try {
      await backendHttpClient.delete(`/api/services/${id}`);
      set({ services: (get().services || []).filter((s) => s.id !== id) });
      return true;
    } catch (e) {
      console.error('[Services] deleteService', e);
      return false;
    }
  },
}));

export default useServicesStore;
