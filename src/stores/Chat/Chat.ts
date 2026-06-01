import { create } from 'zustand';
import { backendHttpClient } from '@lib/helpers/httpClient';
import {
  ChatStore,
  Conversation,
  FetchMessagesResult,
  ChatMessage,
} from './types';

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: [],
  loadingRooms: false,
  error: null,

  fetchRooms: async () => {
    try {
      set({ loadingRooms: true, error: null });
      const response = await backendHttpClient.get('/api/chat/rooms');
      const conversations = (response.data as Conversation[]) || [];
      set({ conversations, loadingRooms: false });
    } catch (err) {
      set({ error: 'Erro ao carregar conversas.', loadingRooms: false });
      console.error('Erro ao buscar conversas:', err);
    }
  },

  fetchMessages: async (
    roomId: number,
    cursor?: string,
    limit = 20,
  ): Promise<FetchMessagesResult> => {
    const params: Record<string, string | number> = { limit };
    if (cursor) params.cursor = cursor;

    const response = await backendHttpClient.get(
      `/api/chat/rooms/${roomId}/messages`,
      { params },
    );

    const data = response.data || {};
    return {
      messages: (data.messages as ChatMessage[]) || [],
      nextCursor: data.nextCursor ?? null,
      roomStatus: data.room_status ?? 'active',
      role: data.role ?? 'client',
    };
  },

  // Atualiza a prévia da última mensagem na lista de conversas em tempo real
  applyIncomingMessage: (message: ChatMessage) => {
    const { conversations } = get();
    const updated = conversations.map((conv) =>
      conv.room_id === message.room_id
        ? {
            ...conv,
            last_message_preview: message.text.slice(0, 280),
            last_message_at: message.sent_at,
          }
        : conv,
    );

    // Reordena: conversa com mensagem mais recente vai para o topo
    updated.sort((a, b) => {
      const aTime = a.last_message_at
        ? new Date(a.last_message_at).getTime()
        : 0;
      const bTime = b.last_message_at
        ? new Date(b.last_message_at).getTime()
        : 0;
      return bTime - aTime;
    });

    set({ conversations: updated });
  },

  clearChat: () => {
    set({ conversations: [], error: null, loadingRooms: false });
  },
}));
