import React, { useState, useEffect, useCallback } from 'react';
<<<<<<< HEAD
import { 
    FlatList, 
    StyleSheet, 
    Alert,
    View,
    Image,
    ScrollView,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    Platform,
    RefreshControl,
=======
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
>>>>>>> 596a680260f88e5f3dc3a519b1e250e164db9f8c
} from 'react-native';
import axios from 'axios';
import { HTTP_DOMAIN } from '@config/varEnvs';

// Interface atualizada com todas as propriedades da API
interface Notification {
<<<<<<< HEAD
    id: number;
    user_id: number;
    title: string;
    message: string;
    is_read: boolean;
    notification_type: string;
    related_entity_id: number;
    createdAt: string;
    updatedAt: string;
=======
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  createdAt: string;
  user_id: number;
>>>>>>> 596a680260f88e5f3dc3a519b1e250e164db9f8c
}


interface NotificacoesContentProps {
  userId: string;
}

<<<<<<< HEAD
// 📌 Componente de Item
const NotificationItem: React.FC<{ item: Notification, onPress: (item: Notification) => void }> = ({ item, onPress }) => {
    const isUnread = !item.is_read;
    
    const primaryColor = '#FC8200';
    const secondaryColor = '#005A93';
    const onSurfaceVariant = '#555';
    const white = '#fff';

    const logoSource = isUnread 
        ? require('../../../../../assets/delbicos-logo.png') 
        : require('../../../../../assets/delbicos-logo-grey.png'); 

    const cardStyle = isUnread ? styles.unreadCard : styles.readCard;
    const titleColor = isUnread ? primaryColor : onSurfaceVariant; 
    const messageColor = isUnread ? secondaryColor : onSurfaceVariant; 
    const dateColor = onSurfaceVariant; 

    const formatTime = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.warn('Data inválida:', dateString);
                return '--:--';
            }
            return date.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: false
            });
        } catch (error) {
            console.error('Erro ao formatar data:', error);
            return '--:--';
        }
    };

    return (
        <TouchableOpacity
            style={[styles.card, cardStyle, { backgroundColor: white }]}
            onPress={() => onPress(item)}
            activeOpacity={0.7}
        >
            <View style={styles.cardContent}>
                <Image
                    source={logoSource} 
                    style={styles.logo}
                    onError={(e) => console.log('Erro ao carregar logo:', e.nativeEvent.error)}
                />
                
                <View style={styles.textContainer}>
                    <Text 
                        style={[
                            styles.title, 
                            { color: titleColor, fontWeight: isUnread ? '700' : '400' }
                        ]}
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>
                    
                    <Text 
                        style={[
                            styles.message, 
                            { color: messageColor }
                        ]}
                        numberOfLines={2} 
                    >
                        {item.message}
                    </Text>
                </View>
                
                <Text 
                    style={[
                        styles.date,
                        { color: dateColor, fontWeight: isUnread ? '400' : '300' }
                    ]}
                >
                    {formatTime(item.createdAt)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

// 📌 Componente de Botão
const SimpleButton: React.FC<{ onPress: () => void, title: string, color: string, textColor: string }> = ({ onPress, title, color, textColor }) => (
    <TouchableOpacity
        style={[styles.modalButton, { backgroundColor: color }]}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <Text style={[styles.modalButtonLabel, { color: textColor }]}>
            {title}
        </Text>
    </TouchableOpacity>
);

// 📌 Componente Principal
const NotificacoesContent: React.FC<NotificacoesContentProps> = ({ userId }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
    
    console.log('🔔 NotificacoesContent iniciado com userId:', userId);
    console.log('📱 Estado inicial - Loading:', loading, 'Error:', error, 'Notificações count:', notifications.length);

    const primaryColor = '#FC8200';
    const errorColor = '#B00020';
    const surfaceColor = '#fff';

    const fetchNotifications = useCallback(async () => {
        console.log('🔄 Iniciando fetchNotifications...');
        console.log('📍 URL da API:', `${BASE_URL}/notifications/${userId}`);
        
        try {
            setError(null);
            
            const response = await axios.get(`${BASE_URL}/notifications/${userId}`, {
                timeout: 15000,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('✅ Resposta da API recebida:', {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                dataType: typeof response.data,
                dataLength: Array.isArray(response.data) ? response.data.length : 'não é array'
            });

            console.log('📨 Dados recebidos:', response.data);

            if (Array.isArray(response.data)) {
                console.log(`📋 Notificações recebidas: ${response.data.length} items`);
                setNotifications(response.data);
                
                // Log detalhado de cada notificação
                response.data.forEach((notif: Notification, index: number) => {
                    console.log(`   ${index + 1}. ID: ${notif.id}, Title: "${notif.title}", Read: ${notif.is_read}`);
                });
            } else {
                console.error('❌ Erro: Dados não são um array:', response.data);
                setError('Formato de dados inválido da API');
                setNotifications([]);
            }

        } catch (err: any) {
            console.error('❌ Erro detalhado na requisição:', {
                name: err.name,
                message: err.message,
                code: err.code,
                response: err.response ? {
                    status: err.response.status,
                    statusText: err.response.statusText,
                    data: err.response.data
                } : 'Sem resposta',
                request: err.request ? 'Request feito' : 'Sem request'
            });

            let errorMessage = 'Erro ao carregar notificações.';
            
            if (err.code === 'ECONNABORTED') {
                errorMessage = 'Timeout: Servidor não respondeu a tempo.';
            } else if (err.response) {
                // Servidor respondeu com erro
                if (err.response.status === 404) {
                    errorMessage = 'Endpoint não encontrado. Verifique a URL.';
                } else if (err.response.status === 500) {
                    errorMessage = 'Erro interno do servidor.';
                } else {
                    errorMessage = `Erro ${err.response.status}: ${err.response.data?.message || err.response.statusText}`;
                }
            } else if (err.request) {
                // Request feito mas sem resposta
                errorMessage = 'Sem resposta do servidor. Verifique a conexão.';
            }

            setError(errorMessage);
            setNotifications([]);
            
        } finally {
            console.log('🏁 Fetch finalizado. Loading false.');
            setLoading(false);
            setRefreshing(false);
        }
    }, [userId]);

    useEffect(() => {
        console.log('🎯 useEffect executado, chamando fetchNotifications...');
        fetchNotifications();
    }, [fetchNotifications]);

    const onRefresh = useCallback(() => {
        console.log('🔄 Pull to refresh acionado');
        setRefreshing(true);
        fetchNotifications();
    }, [fetchNotifications]);

    const markAsRead = useCallback(async (notificationId: number) => {
        console.log(`📌 Marcando notificação ${notificationId} como lida...`);
        
        const notification = notifications.find(n => n.id === notificationId);
        console.log(`   Notificação encontrada:`, notification);
        
        if (!notification || notification.is_read) {
            console.log(`   ⏭️ Notificação ${notificationId} já está lida. Ignorando.`);
            return;
        }

        try {
            console.log(`   📤 Enviando PATCH para: ${BASE_URL}/notifications/${notificationId}/read/${userId}`);
            
            const response = await axios.patch(`${BASE_URL}/notifications/${notificationId}/read/${userId}`);
            
            console.log(`   ✅ Notificação ${notificationId} marcada como lida com sucesso:`, response.data);
            
            setNotifications(prev => 
                prev.map(notif => 
                    notif.id === notificationId ? { ...notif, is_read: true } : notif
                )
            );
            
            console.log(`   📊 Estado atualizado: notificação ${notificationId} marcada como lida`);
            
        } catch (err: any) {
            console.error(`   ❌ Erro ao marcar notificação ${notificationId} como lida:`, {
                message: err.message,
                response: err.response?.data
            });
            
            Alert.alert('Erro', 'Não foi possível marcar a notificação como lida.');
        }
    }, [userId, notifications]);

    const handleNotificationPress = (item: Notification) => {
        console.log(`👆 Notificação pressionada:`, {
            id: item.id,
            title: item.title,
            is_read: item.is_read
        });
        
        setSelectedNotification(item);
        if (!item.is_read) {
            markAsRead(item.id);
        }
    };

    const hideModal = () => {
        console.log('🚪 Fechando modal de notificação');
        setSelectedNotification(null);
    };

    const formatTime = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.warn('Data inválida no modal:', dateString);
                return '--:--';
            }
            return date.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: false
            });
        } catch (error) {
            console.error('Erro ao formatar data no modal:', error);
            return '--:--';
        }
    };

    // Log do estado atual para debug
    console.log('🎨 Renderizando componente - Estado:', {
        loading,
        refreshing,
        error,
        notificationsCount: notifications.length,
        selectedNotification: selectedNotification ? selectedNotification.id : null
    });

    if (loading && notifications.length === 0) {
        console.log('⏳ Renderizando loading state...');
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={primaryColor} />
                <Text style={styles.loadingText}>Carregando notificações...</Text>
            </View>
        );
    }

    if (error) {
        console.log('❌ Renderizando error state:', error);
        return (
            <View style={styles.centered}>
                <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>
                <TouchableOpacity 
                    style={[styles.retryButton, { backgroundColor: primaryColor }]}
                    onPress={fetchNotifications}
                >
                    <Text style={styles.retryButtonText}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
=======
const NotificacoesContent: React.FC<NotificacoesContentProps> = ({
  userId,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const colors = {
    primary: '#FC8200',
    error: '#FF0000',
    surface: '#FFFFFF',
    onSurfaceVariant: '#666666',
  };

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${HTTP_DOMAIN}/notifications/${userId}`);
      const apiNotifications = response.data as Notification[];
      setNotifications(apiNotifications);
    } catch (err) {
      setError('Erro ao carregar notificações.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = useCallback(
    async (notificationId: number) => {
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
        await axios.patch(
          `${HTTP_DOMAIN}/notifications/${notificationId}/read/${userId}`,
        );
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === notificationId ? { ...notif, is_read: true } : notif,
          ),
        );
      } catch (err) {
        Alert.alert('Erro', 'Não foi possível marcar a notificação como lida.');
        console.error('Erro ao marcar como lida:', err);
      }
    },
    [userId, notifications],
  );

  const handleNotificationPress = (item: Notification) => {
    setSelectedNotification(item);
    if (!item.is_read) {
      markAsRead(item.id);
>>>>>>> 596a680260f88e5f3dc3a519b1e250e164db9f8c
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
    const titleColor = isUnread ? '#FC8200' : colors.onSurfaceVariant;
    const descriptionColor = isUnread ? '#005A93' : colors.onSurfaceVariant;

<<<<<<< HEAD
    if (notifications.length === 0 && !loading) {
        console.log('📭 Renderizando empty state');
        return (
            <View style={styles.centered}>
                <Text style={styles.emptyText}>Você não tem notificações.</Text>
                <TouchableOpacity 
                    style={[styles.retryButton, { backgroundColor: primaryColor }]}
                    onPress={fetchNotifications}
                >
                    <Text style={styles.retryButtonText}>Recarregar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    console.log('✅ Renderizando lista com', notifications.length, 'notificações');
    
    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={({ item, index }) => {
                    console.log(`   📝 Renderizando item ${index}:`, { id: item.id, title: item.title });
                    return <NotificationItem item={item} onPress={handleNotificationPress} />;
                }}
                keyExtractor={item => {
                    const key = String(item.id);
                    console.log(`   🔑 Key para item ${item.id}:`, key);
                    return key;
                }}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[primaryColor]}
                        tintColor={primaryColor}
                    />
                }
                onEndReachedThreshold={0.1}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhuma notificação encontrada</Text>
                }
            />

            <Modal 
                visible={!!selectedNotification} 
                onRequestClose={hideModal} 
                transparent={true}
                animationType="fade"
            >
                <TouchableOpacity 
                    style={styles.modalBackdrop} 
                    activeOpacity={1}
                    onPress={hideModal} 
                >
                    <View style={[styles.modalContent, { backgroundColor: surfaceColor }]}>
                        {selectedNotification && (
                            <TouchableOpacity activeOpacity={1} style={styles.modalInnerContainer}>
                                <Text style={[styles.modalTitle, { color: primaryColor }]}>
                                    {selectedNotification.title}
                                </Text>

                                <ScrollView style={styles.modalMessageScroll}>
                                    <Text style={styles.modalMessage}>
                                        {selectedNotification.message}
                                    </Text>
                                </ScrollView>

                                <Text style={styles.modalDate}>
                                    {new Date(selectedNotification.createdAt).toLocaleDateString('pt-BR')} às {formatTime(selectedNotification.createdAt)}
                                </Text>

                                <SimpleButton 
                                    onPress={hideModal} 
                                    title="Fechar"
                                    color={primaryColor}
                                    textColor={'#FFF'}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
=======
    return (
      <TouchableOpacity
        style={[styles.card, cardStyle]}
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.7}>
        <View style={styles.cardContent}>
          <Image source={logoSource} style={styles.logo} />

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.title,
                { color: titleColor, fontWeight: isUnread ? '700' : '400' },
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
                color: colors.onSurfaceVariant,
                fontWeight: isUnread ? '400' : '300',
              },
            ]}>
            {formatTime(item.createdAt)}
          </Text>
        </View>
      </TouchableOpacity>
>>>>>>> 596a680260f88e5f3dc3a519b1e250e164db9f8c
    );
  };

  if (loading && notifications.length === 0) {
    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={styles.centered}
      />
    );
  }

  if (error) {
    return (
      <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
    );
  }

  if (notifications.length === 0 && !loading) {
    return <Text style={styles.emptyText}>Você não tem notificações.</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
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
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            {selectedNotification && (
              <View style={styles.modalInnerContainer}>
                <Text style={[styles.modalTitle, { color: '#FC8200' }]}>
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
                  style={[styles.modalButton, { backgroundColor: '#FC8200' }]}
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
<<<<<<< HEAD
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
    card: {
        marginBottom: 10,
        borderRadius: 50, 
        backgroundColor: '#fff', 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    unreadCard: {
        borderWidth: 2, 
        borderColor: '#FC8200',
        elevation: 4, 
    },
    readCard: {
        borderWidth: 1,
        borderColor: '#eee', 
        elevation: 1,
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
        shadowColor: "rgba(0, 0, 0, 0.25)",
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
        fontSize: 14,
        lineHeight: 20,
        color: '#666',
        marginLeft: 10,
        alignSelf: 'center', 
        minWidth: 40,
        textAlign: 'right',
    },
    errorText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        marginBottom: 20,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 20,
        fontSize: 16,
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
        fontSize: 16,
    },
    retryButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    retryButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 16,
        width: '90%',
        maxHeight: '80%',
        ...Platform.select({
            web: {
                maxWidth: 500,
            },
        }),
    },
    modalInnerContainer: {
        flexGrow: 1,
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
        flexShrink: 1,
        marginBottom: 16,
    },
    modalMessage: {
        fontSize: 16,
        lineHeight: 22,
        color: '#333',
        textAlign: 'left',
    },
    modalDate: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 16,
    },
    modalButton: {
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    modalButtonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
=======
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
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadCard: {
    borderWidth: 2,
    borderColor: '#FC8200',
  },
  readCard: {
    borderWidth: 1,
    borderColor: '#eee',
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
    color: '#000000',
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
    color: '#666',
    marginTop: 20,
    fontSize: 16,
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
    color: '#333',
    textAlign: 'left',
  },
  modalDate: {
    fontSize: 14,
    color: '#666',
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
>>>>>>> 596a680260f88e5f3dc3a519b1e250e164db9f8c
});

export default NotificacoesContent;
