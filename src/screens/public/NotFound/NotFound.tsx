import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';

const NotFoundScreen = () => {
  const navigation = useNavigation();
  const colors = useColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Erro!</Text>
      <Text style={styles.descriptionText}>
        Essa página não está disponível
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home' as any)}>
        <Text style={styles.buttonText}>Voltar para o início</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotFoundScreen;
