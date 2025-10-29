import { create } from 'zustand';
import { AddressStore, Address } from './types';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper para obter o token de autenticação
const getAuthHeaders = async () => {
  try {
    const userStorage = await AsyncStorage.getItem('user-storage');
    if (userStorage) {
      const { state } = JSON.parse(userStorage);
      if (state?.token) {
        return { Authorization: `Bearer ${state.token}` };
      }
    }
  } catch (error) {
    console.error('Error getting auth headers:', error);
  }
  return {};
};

export const useAddressStore = create<AddressStore>((set, get) => ({
  addresses: [],
  isLoading: false,
  error: null,

  fetchAddressesByUserId: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      // Usa a rota autenticada /session se disponível, ou a pública /user/:id
      const headers = await getAuthHeaders();
      const endpoint =
        Object.keys(headers).length > 0
          ? '/api/address/session'
          : `/api/address/user/${userId}`;

      const response = await backendHttpClient.get(endpoint, { headers });
      if (response.status === 200 && response.data) {
        // A API retorna diretamente o array de endereços
        const addresses = Array.isArray(response.data) ? response.data : [];
        set({ addresses, isLoading: false });
      } else {
        throw new Error('Falha ao buscar endereços');
      }
    } catch (error: any | AxiosError) {
      console.error('Error fetching addresses:', error);
      let errorMessage = 'Erro ao carregar endereços';

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          errorMessage = 'Não autorizado. Faça login novamente.';
        } else if (error.response?.status === 404) {
          errorMessage = 'Endereços não encontrados';
        } else if (error.response?.status.toString().startsWith('5')) {
          errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
        }
      }

      set({ error: errorMessage, isLoading: false, addresses: [] });
    }
  },

  addAddress: async (address: Omit<Address, 'id'>) => {
    set({ isLoading: true, error: null });
    try {
      const headers = await getAuthHeaders();
      const response = await backendHttpClient.post(
        '/api/address/session',
        address,
        { headers },
      );

      if (response.status === 201 || response.status === 200) {
        const newAddress = response.data;
        set((state) => ({
          addresses: [...state.addresses, newAddress],
          isLoading: false,
        }));
      } else {
        throw new Error('Falha ao adicionar endereço');
      }
    } catch (error: any | AxiosError) {
      console.error('Error adding address:', error);
      let errorMessage = 'Erro ao adicionar endereço';

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          errorMessage = 'Não autorizado. Faça login novamente.';
        } else if (error.response?.status.toString().startsWith('4')) {
          errorMessage = 'Dados inválidos. Verifique as informações.';
        }
      }

      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  updateAddress: async (id: number, data: Partial<Address>) => {
    set({ isLoading: true, error: null });
    try {
      const headers = await getAuthHeaders();
      const response = await backendHttpClient.put(
        `/api/address/session/${id}`,
        data,
        { headers },
      );

      if (response.status === 200) {
        set((state) => ({
          addresses: state.addresses.map((addr) =>
            addr.id === id ? { ...addr, ...data } : addr,
          ),
          isLoading: false,
        }));
      } else {
        throw new Error('Falha ao atualizar endereço');
      }
    } catch (error: any | AxiosError) {
      console.error('Error updating address:', error);
      let errorMessage = 'Erro ao atualizar endereço';

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          errorMessage = 'Não autorizado. Faça login novamente.';
        } else if (error.response?.status === 403) {
          errorMessage = 'Você não tem permissão para editar este endereço.';
        } else if (error.response?.status === 404) {
          errorMessage = 'Endereço não encontrado';
        }
      }

      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  deleteAddress: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const headers = await getAuthHeaders();
      const response = await backendHttpClient.delete(
        `/api/address/session/${id}`,
        {
          headers,
        },
      );

      if (response.status === 200 || response.status === 204) {
        set((state) => ({
          addresses: state.addresses.filter((addr) => addr.id !== id),
          isLoading: false,
        }));
      } else {
        throw new Error('Falha ao deletar endereço');
      }
    } catch (error: any | AxiosError) {
      console.error('Error deleting address:', error);
      let errorMessage = 'Erro ao deletar endereço';

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          errorMessage = 'Não autorizado. Faça login novamente.';
        } else if (error.response?.status === 403) {
          errorMessage = 'Você não tem permissão para deletar este endereço.';
        } else if (error.response?.status === 404) {
          errorMessage = 'Endereço não encontrado';
        }
      }

      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },

  setPrimaryAddress: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const headers = await getAuthHeaders();
      // Como não existe rota específica, vamos usar o update para marcar como primário
      // Primeiro, desmarcar todos os outros
      const response = await backendHttpClient.put(
        `/api/address/session/${id}`,
        { isPrimary: true },
        { headers },
      );

      if (response.status === 200) {
        set((state) => ({
          addresses: state.addresses.map((addr) => ({
            ...addr,
            isPrimary: addr.id === id,
          })),
          isLoading: false,
        }));
      } else {
        throw new Error('Falha ao definir endereço principal');
      }
    } catch (error: any | AxiosError) {
      console.error('Error setting primary address:', error);
      let errorMessage = 'Erro ao definir endereço principal';

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          errorMessage = 'Não autorizado. Faça login novamente.';
        } else if (error.response?.status === 403) {
          errorMessage = 'Você não tem permissão para editar este endereço.';
        } else if (error.response?.status === 404) {
          errorMessage = 'Endereço não encontrado';
        }
      }

      set({ error: errorMessage, isLoading: false });
      throw new Error(errorMessage);
    }
  },
}));
