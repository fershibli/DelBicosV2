import { backendHttpClient } from '@lib/helpers/httpClient';

export interface DashboardStats {
  totalRevenue: number;
  activeUsers: number;
  completedServices: number;
  averageRating: number;
}

export interface ServiceByCategory {
  category: string;
  count: number;
  revenue: number;
}

export interface ServiceByMonth {
  month: string;
  count: number;
}

export interface AppointmentData {
  id: number;
  professional_id: number;
  service_id: number;
  client_id: number;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
  rating?: number;
  review?: string;
  service?: {
    title: string;
    category: string;
    price: number;
  };
  professional?: {
    name: string;
  };
}

export interface UserAppointments {
  asClient: AppointmentData[];
  asProfessional: AppointmentData[];
}

export interface ReviewData {
  rating: number;
  review?: string;
}

class DashboardService {
  // Testar conectividade com o back-end
  async testConnection(): Promise<boolean> {
    try {
      console.log('🔍 Testando conectividade com o back-end...');
      const response = await backendHttpClient.get('/api/health', {
        timeout: 5000,
      });
      console.log('✅ Back-end está respondendo:', response.status);
      return true;
    } catch (error: any) {
      console.error('❌ Back-end não está respondendo:', error.message);
      return false;
    }
  }

  // Buscar agendamentos do usuário
  async getUserAppointments(userId: number): Promise<UserAppointments> {
    try {
      console.log(`🔍 Buscando agendamentos para userId: ${userId}`);
      console.log(`📡 URL: /api/appointments/user/${userId}`);
      const response = await backendHttpClient.get(
        `/api/appointments/user/${userId}`,
      );
      console.log('📦 Resposta recebida:', response);
      console.log('📋 Dados dos agendamentos:', response.data);

      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao buscar agendamentos:', error);
      console.error('🔍 Detalhes do erro:', {
        message: error?.message,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
      });
      // Se for erro 404, retornar estrutura vazia em vez de erro
      if (error?.response?.status === 404) {
        console.log('⚠️ Usuário não encontrado, retornando dados vazios');
        return {
          asClient: [],
          asProfessional: [],
        };
      }
      throw error;
    }
  }

  // Enviar avaliação
  async submitReview(
    appointmentId: number,
    reviewData: ReviewData,
  ): Promise<AppointmentData> {
    try {
      const response = await backendHttpClient.post(
        `/api/appointments/${appointmentId}/review`,
        reviewData,
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      throw error;
    }
  }

  // Buscar detalhes de um agendamento
  async getAppointmentDetails(appointmentId: number): Promise<AppointmentData> {
    try {
      const response = await backendHttpClient.get(
        `/api/appointments/${appointmentId}`,
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do agendamento:', error);
      throw error;
    }
  }

  // Calcular estatísticas do dashboard
  async getDashboardStats(userId: number): Promise<DashboardStats> {
    try {
      const appointments = await this.getUserAppointments(userId);

      // Combinar agendamentos como cliente e profissional
      const allAppointments = [
        ...appointments.asClient,
        ...appointments.asProfessional,
      ];

      // Calcular estatísticas
      const completedServices = allAppointments.filter(
        (apt) => apt.status === 'completed',
      ).length;

      const totalRevenue = allAppointments
        .filter((apt) => apt.status === 'completed' && apt.service?.price)
        .reduce((sum, apt) => sum + (apt.service?.price || 0), 0);

      const ratingsOnly = allAppointments
        .filter((apt) => apt.rating && apt.rating > 0)
        .map((apt) => apt.rating!);

      const averageRating =
        ratingsOnly.length > 0
          ? ratingsOnly.reduce((sum, rating) => sum + rating, 0) /
            ratingsOnly.length
          : 0;

      const activeUsers = allAppointments
        .filter((apt) => apt.status !== 'canceled')
        .map((apt) => apt.client_id)
        .filter((id, index, arr) => arr.indexOf(id) === index).length;

      return {
        totalRevenue,
        activeUsers,
        completedServices,
        averageRating,
      };
    } catch (error) {
      console.error('Erro ao calcular estatísticas:', error);
      throw error;
    }
  }

  // Agrupar serviços por categoria
  async getServicesByCategory(userId: number): Promise<ServiceByCategory[]> {
    try {
      const appointments = await this.getUserAppointments(userId);
      const allAppointments = [
        ...appointments.asClient,
        ...appointments.asProfessional,
      ];

      const categoryMap = new Map<string, { count: number; revenue: number }>();

      allAppointments
        .filter((apt) => apt.status === 'completed')
        .forEach((apt) => {
          const category = apt.service?.category || 'Outros';
          const current = categoryMap.get(category) || { count: 0, revenue: 0 };

          categoryMap.set(category, {
            count: current.count + 1,
            revenue: current.revenue + (apt.service?.price || 0),
          });
        });

      return Array.from(categoryMap.entries()).map(([category, data]) => ({
        category,
        count: data.count,
        revenue: data.revenue,
      }));
    } catch (error) {
      console.error('Erro ao agrupar serviços por categoria:', error);
      throw error;
    }
  }

  // Agrupar serviços por mês
  async getServicesByMonth(userId: number): Promise<ServiceByMonth[]> {
    try {
      const appointments = await this.getUserAppointments(userId);
      const allAppointments = [
        ...appointments.asClient,
        ...appointments.asProfessional,
      ];

      const monthMap = new Map<string, number>();

      allAppointments
        .filter((apt) => apt.status === 'completed')
        .forEach((apt) => {
          const date = new Date(apt.start_time);
          const monthKey = date.toLocaleDateString('pt-BR', { month: 'short' });

          monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + 1);
        });

      // Preencher últimos 6 meses
      const months = [];
      const now = new Date();
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = date.toLocaleDateString('pt-BR', { month: 'short' });
        months.push({
          month: monthKey,
          count: monthMap.get(monthKey) || 0,
        });
      }

      return months;
    } catch (error) {
      console.error('Erro ao agrupar serviços por mês:', error);
      throw error;
    }
  }
}

export const dashboardService = new DashboardService();
