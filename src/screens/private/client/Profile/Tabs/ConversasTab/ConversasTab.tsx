import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@theme/ThemeProvider';
import { Conversation } from '@stores/Chat';
import ChatRoomListPanel from '@screens/private/chat/components/ChatRoomListPanel';
import ChatThreadPanel from '@screens/private/chat/components/ChatThreadPanel';
import { createStyles } from './styles';

/**
 * Web (perfil desktop): lista + thread na mesma área, ao lado do menu lateral.
 * Mobile: lista; ao tocar, navega para ChatThread no root stack.
 */
const ConversasTab: React.FC = () => {
  const colors = useColors();
  const styles = createStyles(colors);
  const navigation = useNavigation();
  const [selected, setSelected] = useState<Conversation | null>(null);

  const handleSelectRoom = (room: Conversation) => {
    if (Platform.OS === 'web') {
      setSelected(room);
      return;
    }
    // @ts-ignore
    navigation.navigate('ChatThread', {
      roomId: room.room_id,
      correspondent: room.correspondent,
      serviceTitle: room.service_title,
      roomStatus: room.status,
    });
  };

  if (Platform.OS !== 'web') {
    return (
      <View style={styles.mobileListOnly}>
        <ChatRoomListPanel
          selectedRoomId={null}
          onSelectRoom={handleSelectRoom}
        />
      </View>
    );
  }

  return (
    <View style={styles.inboxRoot}>
      <View style={styles.listColumn}>
        <ChatRoomListPanel
          selectedRoomId={selected?.room_id ?? null}
          onSelectRoom={handleSelectRoom}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.threadColumn}>
        {selected ? (
          <ChatThreadPanel
            roomId={selected.room_id}
            correspondent={selected.correspondent}
            roomStatus={selected.status}
            serviceTitle={selected.service_title}
          />
        ) : (
          <View style={styles.emptyThread}>
            <FontAwesome
              name="comments-o"
              size={56}
              color={colors.textTertiary}
            />
            <Text style={styles.emptyThreadTitle}>Suas conversas</Text>
            <Text style={styles.emptyThreadText}>
              Selecione uma conversa à esquerda para ver o histórico e enviar
              mensagens.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ConversasTab;
