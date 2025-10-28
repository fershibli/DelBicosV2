import { User } from '@stores/User/types';
import { Service } from '@stores/Appointment/types';

export interface ListedProfessional {
  id: number;
  name: string;
  category: string;
  rating: number;
  ratingsCount: number;
  imageUrl: string;
  location: string;
}

export interface ProfessionalStore {
  professionals: ListedProfessional[];
  selectedProfessional: Professional | null;
  fetchProfessionals: (
    filter?: string,
    page?: number,
    limit?: number,
  ) => Promise<ListedProfessional[]>;
  fetchProfessionalById: (id: number) => Promise<Professional | null>;
}

export interface Professional {
  id: number;
  user_id: number;
  main_service_id?: number;
  description?: string | null;
  active: boolean;
  createdAt: string; // Data ISO
  updatedAt: string; // Data ISO

  // --- Dados Aninhados Essenciais ---
  User: User; // Informações do usuário associado
  Service?: Service; // O serviço principal ou relevante para o contexto

  // --- Dados Calculados/Agregados (Opcional, mas útil) ---
  rating?: number | null; // Média de avaliações
  ratings_count?: number; // Contagem de avaliações

  // --- Outros Relacionamentos (Adicione se seu backend retornar) ---
  // Addresses?: Address[];
  // Availabilities?: Availability[];
  // GalleryImages?: GalleryImage[];
}
