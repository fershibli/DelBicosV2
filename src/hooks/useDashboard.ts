import { useState, useEffect, useCallback } from 'react';
import type {
  DashboardStats,
  ServiceByCategory,
  ServiceByMonth,
} from '@services/dashboardService';

interface DashboardData {
  stats: DashboardStats;
  servicesByCategory: ServiceByCategory[];
  servicesByMonth: ServiceByMonth[];
}

export const useDashboard = (userId: number) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Iniciando fetch do dashboard para userId:', userId);

      console.log('Carregando dados mock...');
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockData = {
        stats: {
          totalRevenue: 2500,
          activeUsers: 42,
          completedServices: 18,
          averageRating: 4.5,
        },
        servicesByCategory: [
          { category: 'Beleza', count: 8, revenue: 1200 },
          { category: 'Limpeza', count: 5, revenue: 600 },
          { category: 'Reparos', count: 5, revenue: 700 },
        ],
        servicesByMonth: [
          { month: 'Jan', count: 3 },
          { month: 'Fev', count: 5 },
          { month: 'Mar', count: 2 },
          { month: 'Abr', count: 8 },
          { month: 'Mai', count: 4 },
          { month: 'Jun', count: 1 },
        ],
      };

      setData(mockData);
      console.log('Dados mock carregados com sucesso', mockData);
    } catch (err) {
      console.error('Erro ao carregar dados do dashboard:', err);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchDashboardData();
    }
  }, [userId, fetchDashboardData]);

  const refetch = () => {
    fetchDashboardData();
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};
