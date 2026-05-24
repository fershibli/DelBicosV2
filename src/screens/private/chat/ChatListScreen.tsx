import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useChatStore } from '@stores/Chat/useChatStore';
import ChatListItem from '@components/features/Chat/ChatListItem';
import { ThemeMode } from '@stores/Theme';

const ChatListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { conversations, loading, fetchConversations } = useChatStore();

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const handlePress = (conversationId: string, participantName: string) => {
    navigation.navigate('Chat', { conversationId, participantName });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={'#FC8200'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            conversation={item}
            onPress={() => handlePress(item.id, item.participant.name)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#D9D9D9',
  },
});

export default ChatListScreen;