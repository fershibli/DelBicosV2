import { HTTP_DOMAIN } from '@config/varEnvs';

export async function setupNotifications() {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted' ? 'web-notification' : null;
  }
  return null;
}

export async function scheduleLocalNotification(title: string, body: string) {
  try {
    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission === 'granted'
    ) {
      const notification = new Notification(title, {
        body: body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      });

      setTimeout(() => notification.close(), 5000);
    }
  } catch (error) {
    console.error('❌ Erro ao agendar notificação:', error);
  }
}

export async function checkForNewNotifications(
  userId: string,
  lastChecked: Date,
  showLogs: boolean = false,
): Promise<boolean> {
  try {
    const response = await fetch(`${HTTP_DOMAIN}/api/notifications/${userId}`);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const notifications = await response.json();

    const newNotifications = notifications.filter((notification: any) => {
      const notificationDate = new Date(notification.createdAt);
      return !notification.is_read && notificationDate > lastChecked;
    });

    for (const notification of newNotifications) {
      await scheduleLocalNotification(notification.title, notification.message);
    }

    return newNotifications.length > 0;
  } catch (error) {
    if (showLogs) {
      console.error('❌ Erro ao verificar notificações:', error);
    }
    return false;
  }
}
