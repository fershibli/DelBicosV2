import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { useUserStore } from '@stores/User';
import { useChatStore } from '@stores/Chat/useChatStore';
import type { Message, Conversation } from '@stores/Types/chat';

const SOCKET_URL =
  process.env.EXPO_PUBLIC_CHAT_SOCKET_URL || 'http://localhost:3001';

export const useChatSocket = () => {
  const token = useUserStore((s) => s.token);
  const addMessage = useChatStore((s) => s.addMessage);
  const updateConversation = useChatStore((s) => s.updateConversation);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    const socket = io(SOCKET_URL, {
      auth: { token },
    });

    socketRef.current = socket;

    socket.on('message:new', (message: Message) => {
      addMessage(message.conversationId, message);
    });

    socket.on('conversation:updated', (conversation: Conversation) => {
      updateConversation(conversation);
    });

    return () => {
      socket.disconnect();
    };
  }, [token, addMessage, updateConversation]);

  const sendMessageSocket = (conversationId: string, text: string) => {
    socketRef.current?.emit('message:send', { conversationId, text });
  };

  return { sendMessageSocket };
};