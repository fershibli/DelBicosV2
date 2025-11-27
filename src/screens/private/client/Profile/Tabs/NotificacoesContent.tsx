import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Alert,
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

const NotificacoesContent: React.FC = () => {
  const { user } = useUserStore();
  const { notifications, loading, error, fetchNotifications, markAsRead } =
    useNotificationStore();
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const colors = useColors();

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
        Alert.alert('Erro', 'Não foi possível marcar a notificação como lida.');
      }
    }
  };

  const hideModal = () => setSelectedNotification(null);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const renderItem = ({ item }: { item: Notification }) => {
    const isUnread = !item.is_read;
    const logoSource = isUnread
      ? require('../../../../../assets/delbicos-logo.png')
      : require('../../../../../assets/delbicos-logo-grey.png');

    const cardStyle = isUnread ? styles.unreadCard : styles.readCard;
    const titleColor = isUnread
      ? colors.notification.unreadTitle
      : colors.notification.readTitle;
    const descriptionColor = isUnread
      ? colors.notification.unreadMessage
      : colors.notification.readMessage;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          cardStyle,
          {
            backgroundColor: colors.notification.cardBackground,
            borderColor: isUnread
              ? colors.notification.unreadBorder
              : colors.borderColor,
          },
        ]}
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.7}>
        <View style={styles.cardContent}>
          <Image source={logoSource} style={styles.logo} />

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: titleColor,
                  fontWeight: isUnread ? '700' : '400',
                },
              ]}
              numberOfLines={1}>
              {item.title}
            </Text>

            <Text
              style={[styles.message, { color: descriptionColor }]}
              numberOfLines={2}>
              {item.message}
            </Text>
          </View>

          <Text
            style={[
              styles.date,
              {
                color: colors.textTertiary,
                fontWeight: isUnread ? '400' : '300',
              },
            ]}>
            {formatTime(item.createdAt)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && notifications.length === 0) {
    return (
      <ActivityIndicator
        size="large"
        color={colors.primaryOrange}
        style={styles.centered}
      />
    );
  }

  if (error) {
    return (
      <Text style={[styles.errorText, { color: colors.primaryOrange }]}>
        {error}
      </Text>
    );
  }

  if (notifications.length === 0 && !loading) {
    return (
      <View
        style={[styles.container, { backgroundColor: colors.primaryWhite }]}>
        <Text style={[styles.emptyText, { color: colors.textTertiary }]}>
          Você não tem notificações.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryWhite }]}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        visible={!!selectedNotification}
        animationType="fade"
        transparent={true}
        onRequestClose={hideModal}>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.notification.modalBackground },
            ]}>
            {selectedNotification && (
              <View style={styles.modalInnerContainer}>
                <Text
                  style={[styles.modalTitle, { color: colors.primaryOrange }]}>
                  {selectedNotification.title}
                </Text>

                <ScrollView style={styles.modalMessageScroll}>
                  <Text
                    style={[
                      styles.modalMessage,
                      { color: colors.primaryBlack },
                    ]}>
                    {selectedNotification.message}
                  </Text>
                </ScrollView>

                <Text
                  style={[styles.modalDate, { color: colors.textTertiary }]}>
                  {new Date(selectedNotification.createdAt).toLocaleDateString(
                    'pt-BR',
                  )}{' '}
                  às {formatTime(selectedNotification.createdAt)}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    { backgroundColor: colors.primaryOrange },
                  ]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadCard: {
    borderWidth: 2,
  },
  readCard: {
    borderWidth: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  logo: {
    width: 47,
    height: 47,
    borderRadius: 50,
    marginRight: 15,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
  },
  message: {
    fontSize: 13,
    lineHeight: 18,
  },
  date: {
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 10,
    alignSelf: 'center',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  refreshButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
  },
  modalInnerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  modalMessageScroll: {
    flex: 1,
    marginVertical: 12,
  },
  modalMessage: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'left',
  },
  modalDate: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalButton: {
    borderRadius: 12,
    marginHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default NotificacoesContent;
