import { create } from 'zustand';
import { Appointment, AppointmentStore } from './types';
import { useUserStore } from '@stores/User';
import { backendHttpClient } from '@lib/helpers/httpClient';

export const useAppointmentStore = create<AppointmentStore>()((set) => ({
  fetchAppointments: async () => {
    try {
      const { user } = useUserStore.getState();
      const endpoint = `api/appointments/user/${user?.id}`;
      const response = await backendHttpClient.get(endpoint);

      return response.data as Appointment[];
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      return [];
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
}));
