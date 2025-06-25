import { create } from 'zustand';
import { AppointmentStore, Appointment, AppointmentPayload } from './types';

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointments: [],
  loading: false,
  error: null,

  createAppointment: async (payload: AppointmentPayload) => {
    try {
      set({ loading: true, error: null });

      const response = await fetch('http://localhost:3000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar agendamento');
      }

      const created = (await response.json()) as Appointment;

      set((state) => ({
        appointments: [...state.appointments, created],
        loading: false,
      }));

      return true;
    } catch (error: any) {
      console.error('createAppointment error:', error);
      set({ loading: false, error: error.message || 'Erro inesperado' });
      return false;
    }
  },


  fetchAppointmentsByClient: async (clientId: number) => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(
        `http://localhost:3000/api/appointments?clientId=${clientId}`,
      );
      const data = await res.json();

      set({ appointments: data, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message || 'Erro inesperado' });
    }
  },

  fetchAppointmentsByProfessional: async (professionalId: number) => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(
        `http://localhost:3000/api/appointments?professionalId=${professionalId}`,
      );
      const data = await res.json();

      set({ appointments: data, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message || 'Erro inesperado' });
    }
  },
}));
