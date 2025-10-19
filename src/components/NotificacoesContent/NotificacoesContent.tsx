import React, { useState, useEffect, useCallback } from 'react';
import { 
    FlatList, 
    StyleSheet, 
    Alert,
    View,
    Image,
    ScrollView 
} from 'react-native';
import { 
    Surface, 
    Text, 
    ActivityIndicator, 
    Card, 
    useTheme,
    Modal,
    Portal,
    Button,
} from 'react-native-paper'; 
import axios from 'axios';

interface Notification {
    id: number;
    title: string;
    message: string;
    is_read: boolean;
    createdAt: string; 
    user_id: number;
}

const BASE_URL = 'http://192.168.1.136:3000/api'; 

interface NotificacoesContentProps {
    userId: string;
}

const NotificacoesContent: React.FC<NotificacoesContentProps> = ({ userId }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
    
    const { colors } = useTheme();

    const fetchNotifications = useCallback(async () => {
        try {
            setLoading(true);  
            const response = await axios.get(`${BASE_URL}/notifications/${userId}`);
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

    const markAsRead = useCallback(async (notificationId: number) => {
        const isCurrentlyUnread = notifications.find(n => n.id === notificationId && !n.is_read);
        
        if (!isCurrentlyUnread) {
            console.log(`Notificação ${notificationId} já está lida. Ignorando chamada à API.`);
            return;
        }

        try {
            await axios.patch(`${BASE_URL}/notifications/${notificationId}/read/${userId}`); 
            setNotifications(prev => 
                prev.map(notif => 
                    notif.id === notificationId ? { ...notif, is_read: true } : notif
                )
            );
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível marcar a notificação como lida.');
            console.error('Erro ao marcar como lida:', err);
        }
    }, [userId, notifications]);

    const handleNotificationPress = (item: Notification) => {
        setSelectedNotification(item);
        if (!item.is_read) {
            markAsRead(item.id);
        }
    };

    const hideModal = () => setSelectedNotification(null);

    const formatTime = (dateString: string) => {
       const date = new Date(dateString);
       return date.toLocaleTimeString('pt-BR', { 
           hour: '2-digit', 
           minute: '2-digit', 
           hour12: false
       });
    };
    
    const renderItem = ({ item }: { item: Notification }) => {
        const isUnread = !item.is_read;
        const logoSource = isUnread 
            ? require('../assets/delbicos-logo.png') 
            : require('../assets/delbicos-logo-grey.png'); 
        
        const cardStyle = isUnread ? styles.unreadCard : styles.readCard;
        const titleColor = isUnread ? '#FC8200' : colors.onSurfaceVariant; 
        const descriptionColor = isUnread ? '#005A93' : colors.onSurfaceVariant; 

        return (
            <Card 
                style={[styles.card, cardStyle]}
                onPress={() => handleNotificationPress(item)}
                elevation={isUnread ? 4 : 2} 
            >
                <Card.Content style={styles.cardContent}>
                    <Image
                        source={logoSource} 
                        style={styles.logo}
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
                                { color: descriptionColor }
                            ]}
                            numberOfLines={2} 
                        >
                            {item.message}
                        </Text>
                    </View>
                    
                    <Text 
                        style={[
                            styles.date,
                            { color: colors.onSurfaceVariant, fontWeight: isUnread ? '400' : '300' }
                        ]}
                    >
                        {formatTime(item.createdAt)}
                    </Text>
                </Card.Content>
            </Card>
        );
    };

    if (loading && notifications.length === 0) {
        return <ActivityIndicator size="large" color={colors.primary} style={styles.centered} />;
    }

    if (error) {
        return <Text style={[styles.errorText, {color: colors.error}]}>{error}</Text>;
    }

    if (notifications.length === 0 && !loading) {
        return <Text style={styles.emptyText}>Você não tem notificações.</Text>;
    }
    
    return (
        <Surface style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={item => String(item.id)}
                contentContainerStyle={styles.listContent}
            />

            <Modal 
                visible={!!selectedNotification} 
                onDismiss={hideModal} 
                contentContainerStyle={[styles.modalContent, {backgroundColor: colors.surface}]}
            >
                {selectedNotification && (
                    <View style={styles.modalInnerContainer}>
                        <Text style={[styles.modalTitle, {color: '#FC8200'}]}>
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

                        <Button 
                            onPress={hideModal} 
                            mode="contained" 
                            style={styles.modalButton}
                            labelStyle={styles.modalButtonLabel}
                            buttonColor='#FC8200'
                        >
                            Fechar
                        </Button>
                    </View>
                )}
            </Modal>
        </Surface>
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
        backgroundColor: '#fff', 
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
    
    modalContent: {
        marginHorizontal: 20,
        marginVertical: 40,
        padding: 20,
        borderRadius: 16,
        alignSelf: 'center',
        width: '90%',
        maxHeight: 'auto', 
        minHeight: 'auto',
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
    messageContainer: {
        flex: 1,
        minHeight: 100,
        marginVertical: 12,
    },
    modalMessageScroll: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingRight: 8,
    },
    modalMessage: {
        fontSize: 16,
        lineHeight: 22,
        color: '#333',
        textAlign: 'left',
    },
    modalFooter: {
        marginTop: 16,
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
    },
    modalButtonLabel: {
        fontSize: 16,
        paddingVertical: 4,
    },
});

export default NotificacoesContent;