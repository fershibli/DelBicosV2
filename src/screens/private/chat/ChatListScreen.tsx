import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@theme/ThemeProvider';
import { Conversation } from '@stores/Chat';
import ChatRoomListPanel from './components/ChatRoomListPanel';
import { createStyles } from './listStyles';

const ChatListScreen: React.FC = () => {
  const navigation = useNavigation();
  const colors = useColors();
  const styles = createStyles(colors);

  const handleSelectRoom = (room: Conversation) => {
    // @ts-ignore
    navigation.navigate('ChatThread', {
      roomId: room.room_id,
      correspondent: room.correspondent,
      serviceTitle: room.service_title,
      roomStatus: room.status,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ChatRoomListPanel selectedRoomId={null} onSelectRoom={handleSelectRoom} />
    </SafeAreaView>
  );
};

export default ChatListScreen;
