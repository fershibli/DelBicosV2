export interface AppointmentPayload {
  professional_id: number;
  client_id: number;
  service_id: number;
  address_id: number;
  start_time: string;
  end_time: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

export interface Appointment {
  id: number;
  professional_id: number;
  client_id: number;
  service_id: number;
  address_id: number;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

export interface AppointmentStore {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;

  createAppointment: (payload: AppointmentPayload) => Promise<boolean>;
  fetchAppointmentsByClient?: (clientId: number) => Promise<void>;
  fetchAppointmentsByProfessional?: (professionalId: number) => Promise<void>;
}
