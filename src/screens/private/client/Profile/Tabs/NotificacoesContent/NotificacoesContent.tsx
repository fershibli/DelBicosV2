import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useColors } from '@theme/ThemeProvider';
import { useUserStore } from '@stores/User';
import { useNotificationStore, Notification } from '@stores/Notification';
import { createStyles } from './styles';

const NotificacoesContent: React.FC = () => {
  const { user } = useUserStore();
  const { notifications, loading, error, fetchNotifications, markAsRead } =
    useNotificationStore();
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const colors = useColors();
  const styles = createStyles(colors);

  useEffect(() => {
    if (user?.id) {
      fetchNotifications(user.id, false);
    }
  }, [user?.id, fetchNotifications]);

  const handleNotificationPress = async (item: Notification) => {
    setSelectedNotification(item);
    if (!item.is_read && user?.id) {
      try {
        await markAsRead(item.id, user.id);
      } catch {
        console.error('Erro ao marcar como lida');
      }
    }
  };

  const hideModal = () => setSelectedNotification(null);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item }: { item: Notification }) => {
    const isUnread = !item.is_read;
    const logoSource = isUnread
      ? require('@assets/delbicos-logo.png')
      : require('@assets/delbicos-logo-grey.png');

    return (
      <TouchableOpacity
        style={[styles.card, isUnread ? styles.unreadCard : styles.readCard]}
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.7}>
        <View style={styles.cardContent}>
          <Image source={logoSource} style={styles.logo} />

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: isUnread ? colors.primaryOrange : colors.primaryBlack,
                  fontWeight: isUnread ? '700' : '400',
                },
              ]}
              numberOfLines={1}>
              {item.title}
            </Text>

            <Text
              style={[
                styles.message,
                {
                  color: isUnread ? colors.primaryBlack : colors.textSecondary,
                },
              ]}
              numberOfLines={2}>
              {item.message}
            </Text>
          </View>

          <Text style={[styles.date, { color: colors.textTertiary }]}>
            {formatTime(item.createdAt)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && notifications.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primaryOrange} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (notifications.length === 0 && !loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Você não tem notificações.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={!!selectedNotification}
        animationType="fade"
        transparent={true}
        onRequestClose={hideModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedNotification && (
              <View style={styles.modalInnerContainer}>
                <Text style={styles.modalTitle}>
                  {selectedNotification.title}
                </Text>

                <ScrollView style={styles.modalMessageScroll}>
                  <Text style={styles.modalMessage}>
                    {selectedNotification.message}
                  </Text>
                </ScrollView>

                <Text style={styles.modalDate}>
                  {new Date(selectedNotification.createdAt).toLocaleDateString(
                    'pt-BR',
                  )}{' '}
                  às {formatTime(selectedNotification.createdAt)}
                </Text>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={hideModal}>
                  <Text style={styles.modalButtonLabel}>Fechar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NotificacoesContent;
