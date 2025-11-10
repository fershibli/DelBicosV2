import { create } from 'zustand';
import { backendHttpClient } from '@lib/helpers/httpClient';
import {
  KpisResponse,
  EarningsResponse,
  CategoriesResponse,
} from '@lib/types/dashboard';

type DashboardState = {
  kpis: KpisResponse | null;
  earnings: EarningsResponse;
  categories: CategoriesResponse;
  loading: boolean;
  error: string | null;
  lastFetchedKpis: number | null; // timestamp
  fetchKpis: () => Promise<void>;
  fetchEarnings: (from?: string, to?: string) => Promise<void>;
  fetchCategories: (from?: string, to?: string) => Promise<void>;
  clear: () => void;
};

const KPIS_CACHE_SECONDS = 60;

export const useDashboardStore = create<DashboardState>((set, get) => ({
  kpis: null,
  earnings: [],
  categories: [],
  loading: false,
  error: null,
  lastFetchedKpis: null,

  fetchKpis: async (forceRefresh = false) => {
    // dedupe pending requests
    const pendingKey = 'kpis';
    // ensure pendingRequests map exists on the store instance
  // @ts-ignore
  let pendingRequests: any = (get as any)._pendingRequests;
    // @ts-ignore
    if (!pendingRequests) {
      // @ts-ignore
      (get as any)._pendingRequests = {};
      // @ts-ignore
      pendingRequests = (get as any)._pendingRequests;
    }

    if (pendingRequests[pendingKey]) {
      return pendingRequests[pendingKey];
    }

    const promise = (async () => {
      const now = Date.now();
      const last = get().lastFetchedKpis;
      if (!forceRefresh && last && now - last < KPIS_CACHE_SECONDS * 1000) {
        // cached
        return;
      }

      set({ loading: true, error: null });
      try {
        const response = await backendHttpClient.get<KpisResponse>('/api/dashboard/kpis');
        set({ kpis: response.data, lastFetchedKpis: Date.now() });
      } catch (err: any) {
        set({ error: err?.message || (err?.normalizedMessage as string) || 'Erro ao buscar KPIs' });
      } finally {
        set({ loading: false });
      }
    })();

    pendingRequests[pendingKey] = promise;
    try {
      await promise;
    } finally {
      delete pendingRequests[pendingKey];
    }
  },

  fetchEarnings: async (from?: string, to?: string, forceRefresh = false) => {
    const params: Record<string, string> = {};
    if (from) params.from = from;
    if (to) params.to = to;
    const query = new URLSearchParams(params).toString();
    const url = `/api/dashboard/earnings-over-time${query ? `?${query}` : ''}`;

    // dedupe by url
    // ensure pendingRequests map exists on the store instance
  // @ts-ignore
  let pendingRequests: any = (get as any)._pendingRequests;
    // @ts-ignore
    if (!pendingRequests) {
      // @ts-ignore
      (get as any)._pendingRequests = {};
      // @ts-ignore
      pendingRequests = (get as any)._pendingRequests;
    }
    if (pendingRequests[url]) return pendingRequests[url];

    const promise = (async () => {
      set({ loading: true, error: null });
      try {
        const response = await backendHttpClient.get<EarningsResponse>(url);
        // normalize months: add parsedDate YYYY-MM-01 in ISO
        const normalized = response.data.map((item) => {
          const [mm, yyyy] = item.month.split('-').map((v) => Number(v));
          const parsedDate = new Date(yyyy, mm - 1, 1).toISOString().slice(0, 10);
          return { ...item, parsedDate };
        });
        set({ earnings: normalized });
      } catch (err: any) {
        set({ error: err?.message || (err?.normalizedMessage as string) || 'Erro ao buscar ganhos' });
      } finally {
        set({ loading: false });
      }
    })();

    pendingRequests[url] = promise;
    try {
      await promise;
    } finally {
      delete pendingRequests[url];
    }
  },

  fetchCategories: async (from?: string, to?: string, forceRefresh = false) => {
    const params: Record<string, string> = {};
    if (from) params.from = from;
    if (to) params.to = to;
    const query = new URLSearchParams(params).toString();
    const url = `/api/dashboard/services-by-category${query ? `?${query}` : ''}`;

    // dedupe by url
    // ensure pendingRequests map exists on the store instance
  // @ts-ignore
  let pendingRequests: any = (get as any)._pendingRequests;
    // @ts-ignore
    if (!pendingRequests) {
      // @ts-ignore
      (get as any)._pendingRequests = {};
      // @ts-ignore
      pendingRequests = (get as any)._pendingRequests;
    }
    if (pendingRequests[url]) return pendingRequests[url];

    const promise = (async () => {
      set({ loading: true, error: null });
      try {
        const response = await backendHttpClient.get<CategoriesResponse>(url);
        set({ categories: response.data });
      } catch (err: any) {
        set({ error: err?.message || (err?.normalizedMessage as string) || 'Erro ao buscar categorias' });
      } finally {
        set({ loading: false });
      }
    })();

    pendingRequests[url] = promise;
    try {
      await promise;
    } finally {
      delete pendingRequests[url];
    }
  },

  clear: () => set({ kpis: null, earnings: [], categories: [], error: null }),
}));

export default useDashboardStore;
