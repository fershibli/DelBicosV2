import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { HTTP_DOMAIN } from '@config/varEnvs';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: Platform.OS === 'ios',
    shouldShowList: Platform.OS === 'ios',
  }),
});

export async function setupNotifications() {
  // Na web, notificações push do Expo não funcionam como no mobile
  if (Platform.OS === 'web') {
    console.log('⚠️ Notificações push não são suportadas na web');

    // Tentar usar Notification API nativa do navegador
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      console.log('Permissão de notificação do navegador:', permission);
      return permission === 'granted' ? 'web-notification' : null;
    }
    return null;
  }

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permissão para notificações negada!');
    return null;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  console.log('Push Token:', token);

  return token;
}

export async function scheduleLocalNotification(title: string, body: string) {
  try {
    // Na web, usar Notification API do navegador
    if (Platform.OS === 'web') {
      if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification(title, {
          body: body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
        });

        // Auto-fechar após 5 segundos
        setTimeout(() => notification.close(), 5000);
      }
      return;
    }

    // Para mobile, usar Expo Notifications
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
      },
      trigger: null,
    });
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
    if (showLogs) {
      console.log('🔍 Verificando novas notificações...');
    }

    const response = await fetch(`${HTTP_DOMAIN}/api/notifications/${userId}`);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const notifications = await response.json();

    const newNotifications = notifications.filter((notification: any) => {
      const notificationDate = new Date(notification.createdAt);
      return !notification.is_read && notificationDate > lastChecked;
    });

    if (showLogs && newNotifications.length > 0) {
      console.log(
        `✨ ${newNotifications.length} novas notificações encontradas`,
      );
    }

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
