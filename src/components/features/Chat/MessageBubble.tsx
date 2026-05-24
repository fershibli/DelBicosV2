import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Message } from '@stores/Types/chat';
import { useUserStore } from '@stores/User';


interface Props {
  message: Message;
}

const MessageBubble: React.FC<Props> = ({ message }) => {
  const currentUserId = String(useUserStore((s) => s.user?.id));
  const isOwn = message.senderId === currentUserId;

  return (
    <View
      style={[styles.bubble, isOwn ? styles.ownBubble : styles.otherBubble]}
    >
      <Text style={[styles.messageText, isOwn && styles.ownText]}>
        {message.text}
      </Text>
      <Text style={[styles.time, isOwn && styles.ownTime]}>
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 20,
    marginVertical: 4,
    marginHorizontal: 10,
  },
  ownBubble: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(252, 130, 0, 0.4)',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(216, 214, 214, 0.4)',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  ownText: {
    color: '#000',
  },
  time: {
    fontSize: 11,
    color: '#000',
    textAlign: 'right',
    marginTop: 4,
  },
  ownTime: {
    color: '#000',
  },
});

export default MessageBubble;