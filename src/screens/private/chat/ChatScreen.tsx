import React, { useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useChatStore } from '@stores/Chat/useChatStore';
import { useChatSocket } from '@lib/hooks/useChatSocket';
import MessageBubble from '@components/features/Chat/MessageBubble';
import ChatInput from '@components/features/Chat/ChatInput';
import { useUserStore } from '@stores/User';

const ChatScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { conversationId, participantName } = route.params;

  // Pega o estado diretamente com seletor, mas sem funções instáveis
  const messages = useChatStore((s) => s.messages[conversationId] || []);
  const addMessage = useChatStore((s) => s.addMessage);
  const { sendMessageSocket } = useChatSocket();

  // Define fetchMessages de forma estável, sem dependência externa
  const fetchMessagesStable = useCallback(() => {
    useChatStore.getState().fetchMessages(conversationId);
  }, [conversationId]);

  // Efeito para buscar mensagens (só na montagem ou quando mudar o ID)
  useEffect(() => {
    navigation.setOptions({ title: participantName });
  }, [participantName, navigation]);

  useEffect(() => {
    // Apenas busca se NÃO for o ID de teste (mock)
    if (conversationId !== '60f7b3b3d9f1f2b3b4c5d6e7') {
      fetchMessagesStable();
    }
  }, [fetchMessagesStable]);

  // Mock para o ID de teste
  useEffect(() => {
    if (conversationId === '60f7b3b3d9f1f2b3b4c5d6e7') {
      const currentUserId = useUserStore.getState().user?.id?.toString() || 'currentUser';
      const mockMessages = [
        {
          _id: '1',
          conversationId,
          senderId: 'user2',
          text: 'Olá, tudo bem?',
          createdAt: new Date('2026-05-23T08:00:00'),
        },
        {
          _id: '2',
          conversationId,
          senderId: currentUserId,
          text: 'Tudo ótimo! E você?',
          createdAt: new Date('2026-05-23T08:05:00'),
        },
      ];

      // Adiciona apenas se a conversa estiver vazia
      const currentMessages = useChatStore.getState().messages[conversationId];
      if (!currentMessages || currentMessages.length === 0) {
        mockMessages.forEach(msg => addMessage(conversationId, msg));
      }
    }
  }, [conversationId, addMessage]); // addMessage é estável da store, sem problemas

  const handleSend = useCallback(
    (text: string) => {
      sendMessageSocket(conversationId, text);
    },
    [conversationId, sendMessageSocket]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        inverted
        contentContainerStyle={styles.messagesList}
      />
      <ChatInput onSend={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messagesList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default ChatScreen;