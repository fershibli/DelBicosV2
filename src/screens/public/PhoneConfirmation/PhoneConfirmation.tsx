import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParams } from '../../types';
import { MaskedTextInput } from 'react-native-mask-text';

type NavigationProp = NativeStackNavigationProp<NavigationParams>;

function PhoneConfirmationScreen() {
  const navigation = useNavigation<NavigationProp>();
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

  const handlePhoneNumberChange = (text: string) => {
    if (phoneNumber.length === 0) {
      text = '+55 ' + text;
    }
    setPhoneNumber(text);
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
        <MaskedTextInput
          mask="+99 (99) 99999-9999"
          style={styles.input}
          placeholder="DDD + CELULAR"
          value={phoneNumber}
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
