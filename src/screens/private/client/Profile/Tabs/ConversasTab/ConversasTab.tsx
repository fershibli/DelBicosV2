import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';

const ConversasTab: React.FC = () => {
  const colors = useColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name="comments-o" size={48} color={colors.primaryOrange} />
      </View>

      <Text style={styles.title}>Conversas</Text>

      <Text style={styles.subtitle}>
        O chat está em desenvolvimento. Em breve você poderá conversar
        diretamente com os prestadores por aqui.
      </Text>
    </View>
  );
};

export default ConversasTab;
