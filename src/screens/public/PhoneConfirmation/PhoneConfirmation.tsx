import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParams } from '../../types';

type NavigationProp = NativeStackNavigationProp<NavigationParams>;

function PhoneConfirmationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('(__) _____-____');

  const mockSendSMS = () => {
    const mockCode = '1234';
    navigation.navigate('ConfirmPhoneNumber', { code: mockCode });
    Alert.alert('Simulação', 'Código 1234 enviado com sucesso!');
  };

  const handlePhoneNumberChange = (text: string) => {
    const cleanedText = text.replace(/\D/g, '').slice(2);
    console.log('Número de telefone digitado:', cleanedText);
    if (cleanedText.length <= 11) {
      let formatedText = '(__) _____-____';
      for (let i = 0; i < cleanedText.length; i++) {
        formatedText = formatedText.replace('_', cleanedText[i]);
      }
      console.log('Número de telefone formatado:', formatedText);
      setPhoneNumber(formatedText);
    }
  };

  const handleContinue = () => {
    if (
      phoneNumber &&
      ('+55 ' + phoneNumber).match(/^\+\d{2}\s\(\d{2}\)\s\d{5}-\d{4}$/)
    ) {
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
          value={'+55 ' + phoneNumber}
          onChangeText={handlePhoneNumberChange}
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

export default PhoneConfirmationScreen;
