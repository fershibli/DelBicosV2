import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
      },
      trigger: null,
    });
    console.log('Notificação local agendada:', title);
  } catch (error) {
    console.error('Erro ao agendar notificação:', error);
  }
}

export async function checkForNewNotifications(userId: string, lastChecked: Date): Promise<boolean> {
  try {
    console.log('🔍 Verificando novas notificações...');
    
    const response = await fetch(`http://192.168.1.136:3000/api/notifications/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const notifications = await response.json();
    console.log('Notificações da API:', notifications.length);
    
    const newNotifications = notifications.filter((notification: any) => {
      const notificationDate = new Date(notification.createdAt);
      const isNew = !notification.is_read && notificationDate > lastChecked;
      
      if (isNew) {
        console.log('🆕 Nova notificação encontrada:', {
          id: notification.id,
          title: notification.title,
          createdAt: notification.createdAt,
          is_read: notification.is_read
        });
      }
      
      return isNew;
    });

    console.log(`${newNotifications.length} novas notificações encontradas`);

    for (const notification of newNotifications) {
      await scheduleLocalNotification(notification.title, notification.message);
      console.log('Notificação exibida:', notification.title);
    }

    return newNotifications.length > 0;
  } catch (error) {
    console.error('Erro ao verificar notificações:', error);
    return false;
  }
}