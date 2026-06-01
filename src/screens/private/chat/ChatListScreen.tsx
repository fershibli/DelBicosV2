import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useColors } from '@theme/ThemeProvider';
import { useChatStore, Conversation } from '@stores/Chat';
import { createStyles } from './listStyles';

const formatTime = (iso: string | null) => {
  if (!iso) return '';
  const date = new Date(iso);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  if (sameDay) {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  return date.toLocaleDateString('pt-BR');
};

const ChatListScreen: React.FC = () => {
  const navigation = useNavigation();
  const colors = useColors();
  const styles = createStyles(colors);
  const { conversations, loadingRooms, error, fetchRooms } = useChatStore();

  useFocusEffect(
    useCallback(() => {
      fetchRooms();
    }, [fetchRooms]),
  );

  const renderItem = ({ item }: { item: Conversation }) => {
    const name = item.correspondent?.name ?? 'Conversa';
    const avatar = item.correspondent?.avatar_uri;
    const isArchived = item.status === 'archived';

    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.7}
        onPress={() =>
          // @ts-ignore - rota tipada em NavigationParams
          navigation.navigate('ChatThread', {
            roomId: item.room_id,
            correspondent: item.correspondent,
            serviceTitle: item.service_title,
            roomStatus: item.status,
          })
        }>
        <View style={styles.avatarWrapper}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarFallback}>
              <FontAwesome name="user" size={22} color={colors.primaryWhite} />
            </View>
          )}
        </View>

        <View style={styles.rowContent}>
          <View style={styles.rowHeader}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.time}>{formatTime(item.last_message_at)}</Text>
          </View>

          <View style={styles.rowHeader}>
            <Text style={styles.preview} numberOfLines={1}>
              {item.last_message_preview || 'Nenhuma mensagem ainda'}
            </Text>
            {isArchived && (
              <View style={styles.archivedBadge}>
                <Text style={styles.archivedText}>Arquivada</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loadingRooms && conversations.length === 0) {
    return (
      <SafeAreaView style={styles.centered} edges={['bottom']}>
        <ActivityIndicator size="large" color={colors.primaryOrange} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered} edges={['bottom']}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => String(item.room_id)}
        renderItem={renderItem}
        contentContainerStyle={
          conversations.length === 0 ? styles.emptyContainer : styles.listContent
        }
        refreshing={loadingRooms}
        onRefresh={fetchRooms}
        ListEmptyComponent={
          !loadingRooms ? (
            <View style={styles.centered}>
              <FontAwesome
                name="comments-o"
                size={48}
                color={colors.textTertiary}
              />
              <Text style={styles.emptyText}>
                Você ainda não tem conversas. Elas aparecem aqui quando um serviço
                é agendado.
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default ChatListScreen;
