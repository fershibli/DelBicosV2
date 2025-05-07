import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';

const ErrorScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Erro! Essa página não está disponível
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('home')}>
        <Text style={styles.buttonText}>Voltar para o início</Text>
      </TouchableOpacity>
    </View>
  );
};


export default ErrorScreen;