import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../lib/types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

export function PhoneConfirmation() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [phoneNumber, setPhoneNumber] = useState('');

  const mockSendSMS = () => {
    const mockCode = '1234';
    navigation.navigate('ConfirmPhoneNumber', { code: mockCode });
    Alert.alert('Simulação', 'Código 1234 enviado com sucesso!');
  };

  const handleContinue = () => {
    if (phoneNumber && phoneNumber.match(/^\+\d{2}\s\(\d{2}\)\s\d{5}-\d{4}$/)) {
      mockSendSMS();
    } else {
      Alert.alert(
        'Erro',
        'Digite um número de telefone válido no formato +DD (XX) XXXXX-XXXX.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Acesse sua conta</Text>
        <Text style={styles.subtitle}>
          Insira seu celular para entrar. Você receberá um código SMS para
          confirmar seu telefone
        </Text>
        <TextInput
          style={styles.input}
          placeholder="DDD + CELULAR"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </ScrollView>
      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0fa',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 50, // Espaço para o rodapé
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#003366',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff7f00',
    padding: 12,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    fontSize: 12,
    color: '#003366',
  },
});
