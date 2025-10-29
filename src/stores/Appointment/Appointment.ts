import { create } from 'zustand';
import { AppointmentStore } from './types';
import { useUserStore } from '@stores/User';
import { backendHttpClient } from '@lib/helpers/httpClient';

export const useAppointmentStore = create<AppointmentStore>()((set) => ({
  appointments: [],
  loading: false,

  fetchAppointments: async () => {
    set({ loading: true });
    try {
      const { user } = useUserStore.getState();
      if (!user) {
        throw new Error('Usuário não autenticado para buscar agendamentos.');
      }

      const endpoint = `api/appointments/user/${user.id}`;
      const response = await backendHttpClient.get(endpoint);

      set({ appointments: response.data, loading: false });
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      set({ appointments: [], loading: false });
    }
  },

  reviewAppointment: async (appointmentId, rating, review) => {
    try {
      const response = await backendHttpClient.post(
        `api/appointments/${appointmentId}/review`,
        { rating, review },
      );
      return response.status === 200;
    } catch (error) {
      console.error('Failed to submit review:', error);
      return false;
    }
  },

  fetchInvoice: async (appointmentId) => {
    try {
      const response = await backendHttpClient.get(
        `api/appointments/${appointmentId}/receipt`,
        { params: { userId: useUserStore.getState().user?.id } },
      );
      return response.data.receiptUrl;
    } catch (error) {
      console.error('Failed to fetch invoice:', error);
      return null;
    }
  },
}));
