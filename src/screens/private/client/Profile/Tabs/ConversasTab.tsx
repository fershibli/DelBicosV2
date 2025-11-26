import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@theme/ThemeProvider';

const ConversasTab: React.FC = () => {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.primaryBlack }]}>
        Conversas
      </Text>
      <Text style={[styles.subtitle, { color: colors.secondaryGray }]}>
        Esta funcionalidade está em desenvolvimento.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ConversasTab;
