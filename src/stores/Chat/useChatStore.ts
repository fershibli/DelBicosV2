import { create } from 'zustand';
import chatHttpClient from '@lib/helpers/chatHttpClient';
import type { Conversation, Message } from '@stores/Types/chat';

interface ChatState {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConversationId: string | null;
  loading: boolean;
  setActiveConversation: (id: string | null) => void;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  addMessage: (conversationId: string, message: Message) => void;
  updateConversation: (conversation: Conversation) => void;
  sendMessage: (conversationId: string, text: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  messages: {},
  activeConversationId: null,
  loading: false,

  setActiveConversation: (id) => set({ activeConversationId: id }),

  fetchConversations: async () => {
    set({ loading: true });
    try {
      const { data } = await chatHttpClient.get('/conversations');
      set({ conversations: data });
    } catch (error) {
      console.error('Erro ao buscar conversas:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchMessages: async (conversationId) => {
    try {
      const { data } = await chatHttpClient.get(
        `/conversations/${conversationId}/messages`
      );
      set((state) => ({
        messages: { ...state.messages, [conversationId]: data },
      }));
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    }
  },

  addMessage: (conversationId, message) => {
    set((state) => {
      const existing = state.messages[conversationId] || [];
      return {
        messages: {
          ...state.messages,
          [conversationId]: [...existing, message],
        },
      };
    });
  },

  updateConversation: (updated) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === updated.id ? { ...c, ...updated } : c
      ),
    }));
  },

  sendMessage: (_conversationId, _text) => {
  },
}));