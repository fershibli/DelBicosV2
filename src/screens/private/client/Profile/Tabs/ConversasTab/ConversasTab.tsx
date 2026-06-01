import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';

const ConversasTab: React.FC = () => {
  const colors = useColors();
  const styles = createStyles(colors);
  const navigation = useNavigation();

  // A lista de conversas vive em uma tela dedicada no root stack
  useEffect(() => {
    // @ts-ignore - rota tipada em NavigationParams
    navigation.navigate('ChatList');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name="comments-o" size={48} color={colors.primaryOrange} />
      </View>

      <Text style={styles.title}>Conversas</Text>

      <Text style={styles.subtitle}>Abrindo suas conversas…</Text>
    </View>
  );
};

export default ConversasTab;
