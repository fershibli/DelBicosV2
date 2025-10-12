export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: number; // duration in minutes
  banner_uri: string | null;
  active: boolean;
  subcategory_id: number;
  professional_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  active: boolean;
  avatar_uri: string | null;
  banner_uri: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: number;
  user_id: number;
  main_address_id: number;
  cpf: string;
  createdAt: string;
  updatedAt: string;
  User: User;
}

export interface Professional {
  id: number;
  user_id: number;
  main_address_id: number;
  cpf: string;
  cnpj: string | null;
  description: string;
  createdAt: string;
  updatedAt: string;
  User: User;
}

export interface Appointment {
  id: number;
  professional_id: number;
  client_id: number;
  service_id: number;
  address_id: number;
  rating: number | null;
  review: string | null;
  start_time: string; // ISO date string
  end_time: string; // ISO date string
  status: AppointmentStatus;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  Service: Service;
  Client: Client;
  Professional: Professional;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerCpf: string;
  customerAddress: string;
  professionalName: string;
  professionalCpf: string;
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
  serviceDate: string;
  serviceTime: string;
  total: number;
  // Novos campos para melhor rastreabilidade
  paymentMethod?: string;
  transactionId?: string;
  dueDate?: string;
  observations?: string;
}

export interface AppointmentStore {
  fetchAppointments: () => Promise<Appointment[]>;
  reviewAppointment: (
    appointmentId: number,
    rating: number,
    review: string,
  ) => Promise<boolean>;
  fetchInvoice: (appointmentId: number) => Promise<InvoiceData | null>;
}
