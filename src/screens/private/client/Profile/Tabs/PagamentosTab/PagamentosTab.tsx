import React from 'react';
import { View, Text } from 'react-native';
import { useColors } from '@theme/ThemeProvider';
import { FontAwesome } from '@expo/vector-icons';
import { createStyles } from './styles';

const PagamentosTab: React.FC = () => {
  const colors = useColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name="credit-card" size={48} color={colors.primaryBlue} />
      </View>

      <Text style={styles.title}>Pagamentos</Text>

      <Text style={styles.subtitle}>
        O histórico financeiro detalhado e gerenciamento de cartões estarão
        disponíveis em breve.
      </Text>
    </View>
  );
};

export default PagamentosTab;
