import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';

const ErrorScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>
        Erro!
      </Text>
      <Text style={styles.descriptionText}>
        Essa página não está disponível
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Voltar para o início
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorScreen;