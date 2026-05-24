import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import type { Conversation } from '@stores/Types/chat';

interface Props {
  conversation: Conversation;
  onPress: () => void;
}

const ChatListItem: React.FC<Props> = ({ conversation, onPress }) => {
  const { participant, lastMessage } = conversation;
  const avatarSource = participant.avatar
    ? { uri: participant.avatar }
    : require('@assets/default-avatar.png'); // Certifique-se de ter uma imagem padrão

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={avatarSource} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {participant.name}
        </Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {lastMessage?.text || 'Nenhuma mensagem ainda'}
        </Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.time}>
          {lastMessage?.createdAt
            ? new Date(lastMessage.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  avatar: {
    width: 71,
    height: 71,
    borderRadius: 35.5,
    marginRight: 12,
    backgroundColor: '#E0E0E0',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FC8200',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 16,
    color: '#B3B3B3',
  },
  meta: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 14,
    color: '#000',
  },
});

export default ChatListItem;