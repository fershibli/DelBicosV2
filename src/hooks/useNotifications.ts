import { useState, useEffect, useCallback } from 'react';
import { checkForNewNotifications } from '../utils/usePushNotifications';

interface UseNotificationsReturn {
  checkNotifications: () => Promise<void>;
  isLoading: boolean;
  lastChecked: Date;
  hasNewNotifications: boolean;
  error: string | null;
}

export const useNotifications = (userId: string, pollingInterval: number = 30000): UseNotificationsReturn => {
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNewNotifications, setHasNewNotifications] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const checkNotifications = useCallback(async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Iniciando verificação de notificações...');
      const hasNew = await checkForNewNotifications(userId, lastChecked);
      setHasNewNotifications(hasNew);
      
      if (hasNew) {
        console.log('Novas notificações detectadas!');
        setLastChecked(new Date());
      } else {
        console.log('Nenhuma nova notificação');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro no checkNotifications:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [userId, lastChecked, isLoading]);

  useEffect(() => {
    console.log('Iniciando sistema de notificações para usuário:', userId);
    
    checkNotifications();
    
    const interval = setInterval(checkNotifications, pollingInterval);
    console.log(`Polling configurado a cada ${pollingInterval/1000} segundos`);
    
    return () => {
      console.log('Limpando intervalo de notificações');
      clearInterval(interval);
    };
  }, [checkNotifications, pollingInterval, userId]);

  return {
    checkNotifications,
    isLoading,
    lastChecked,
    hasNewNotifications,
    error
  };
};