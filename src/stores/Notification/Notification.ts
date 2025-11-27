import { create } from 'zustand';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { NotificationStore, Notification } from './types';

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  loading: false,
  error: null,

  fetchNotifications: async (userId: number, showLogs: boolean = false) => {
    try {
      set({ loading: true, error: null });
      const url = `/api/notifications/${userId}`;

      if (showLogs) {
        console.log('🔍 Buscando notificações:', url);
      }

      const response = await backendHttpClient.get(url);
      const apiNotifications = response.data as Notification[];

      if (showLogs) {
        console.log('✅ Recebidas:', apiNotifications.length, 'notificações');
        if (apiNotifications.length > 0) {
          console.table(
            apiNotifications.map((n) => ({
              id: n.id,
              title: n.title,
              lida: n.is_read ? 'Sim' : 'Não',
              data: new Date(n.createdAt).toLocaleString('pt-BR'),
            })),
          );
        }
      }

      set({ notifications: apiNotifications, loading: false });
    } catch (err) {
      const errorMessage = 'Erro ao carregar notificações.';
      set({ error: errorMessage, loading: false });
      if (showLogs) {
        console.error('❌ Erro ao buscar notificações:', err);
      }
    }
  },

  markAsRead: async (notificationId: number, userId: number) => {
    const { notifications } = get();
    const isCurrentlyUnread = notifications.find(
      (n) => n.id === notificationId && !n.is_read,
    );

    if (!isCurrentlyUnread) {
      console.log(
        `Notificação ${notificationId} já está lida. Ignorando chamada à API.`,
      );
      return;
    }

    try {
      await backendHttpClient.patch(
        `/api/notifications/${notificationId}/read/${userId}`,
      );

      set({
        notifications: notifications.map((notif) =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif,
        ),
      });
    } catch (err) {
      console.error('Erro ao marcar como lida:', err);
      throw new Error('Não foi possível marcar a notificação como lida.');
    }
  },

  clearNotifications: () => {
    set({ notifications: [], error: null, loading: false });
  },
}));
