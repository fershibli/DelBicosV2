import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParams } from '../../types';
import logo from '../../../assets/logo.png';

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

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image source={logo} style={styles.logoImage} />
            <View>
              <Text style={styles.logoText}>Delivery de bicos</Text>
            </View>
          </View>
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
        </View>
      </ScrollView>
      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
    </View>
  );
}

export default PhoneConfirmationScreen;
