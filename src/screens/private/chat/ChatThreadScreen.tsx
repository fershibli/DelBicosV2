import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useColors } from '@theme/ThemeProvider';
import { NavigationParams } from '@screens/types';
import ChatThreadPanel from './components/ChatThreadPanel';
import { createStyles } from './threadStyles';

type ChatThreadRoute = RouteProp<NavigationParams, 'ChatThread'>;

const ChatThreadScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ChatThreadRoute>();
  const colors = useColors();
  const styles = createStyles(colors);

  const roomId = route.params?.roomId;
  const correspondent = route.params?.correspondent ?? null;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ChatThreadPanel
        roomId={roomId}
        correspondent={correspondent}
        roomStatus={route.params?.roomStatus ?? 'active'}
        serviceTitle={route.params?.serviceTitle}
        showBackButton
        onBack={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

export default ChatThreadScreen;
