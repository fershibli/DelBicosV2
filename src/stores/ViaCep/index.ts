import { create } from 'zustand';
import { ViaCepResponse, ViaCepState } from './types';

export const useViaCepStore = create<ViaCepState>((set) => ({
  loading: false,
  error: null,

  fetchCep: async (rawCep: string) => {
    const cep = (rawCep || '').replace(/\D/g, '');
    if (cep.length !== 8) {
      set({ error: 'CEP inválido. Deve conter 8 dígitos.' });
      return null;
    }

    set({ loading: true, error: null });
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!res.ok) {
        const msg = `Erro na requisição: ${res.status} ${res.statusText}`;
        set({ error: msg, loading: false });
        return null;
      }

      const data = (await res.json()) as ViaCepResponse;

      if (data.erro) {
        set({ error: 'CEP não encontrado.', loading: false });
        return null;
      }

      set({
        loading: false,
        error: null,
      });

      return data;
    } catch (err: Error | unknown) {
      set({
        error: (err as Error)?.message || 'Erro desconhecido',
        loading: false,
      });
      return null;
    }
  },
}));
