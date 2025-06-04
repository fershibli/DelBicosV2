import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

function PhoneConfirmationScreen() {
  const navigation = useNavigation();
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
    <ScrollView
      style={styles.container}
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
      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
    </ScrollView>
  );
}

export default PhoneConfirmationScreen;
