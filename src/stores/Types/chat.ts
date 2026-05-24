export interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  text: string;
  readAt?: Date;
  createdAt: Date;
}

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
}

export interface Conversation {
  id: string;
  participant: Participant;
  lastMessage?: {
    text: string;
    createdAt: Date;
  };
  updatedAt: Date;
}