import { create } from 'zustand';
import {
  Appointment,
  AppointmentSheetRow,
  AppointmentStore,
  InvoiceData,
} from './types';
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

  fetchAppointmentsAsSheet: async (): Promise<AppointmentSheetRow[]> => {
    try {
      const { user } = useUserStore.getState();
      if (!user) {
        throw new Error('Usuário não autenticado para buscar agendamentos.');
      }

      const endpoint = `api/appointments/user/${user.id}`;
      const response = await backendHttpClient.get(endpoint);
      const appointments: Appointment[] = response.data;

      const sheetData: AppointmentSheetRow[] = appointments.map(
        (appointment) => ({
          ID: appointment.id,
          Professional: appointment.Professional.User.name,
          Client: appointment.Client.User.name,
          Service: appointment.Service.title,
          Date: new Date(appointment.start_time).toLocaleDateString(),
          Status: appointment.status,
        }),
      );

      return sheetData;
    } catch (error) {
      console.error('Failed to fetch appointments as sheet:', error);
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

  fetchInvoice: async (appointmentId: number): Promise<InvoiceData | null> => {
    try {
      const { user } = useUserStore.getState();
      if (!user) {
        throw new Error('Usuário não autenticado para buscar a nota.');
      }

      const endpoint = `api/appointments/${appointmentId}/receipt`;
      const response = await backendHttpClient.get(endpoint, {
        params: {
          userId: user.id,
        },
      });
      return response.data as InvoiceData;
    } catch (error) {
      console.error('Failed to fetch invoice:', error);
      return null;
    }
  },
}));
