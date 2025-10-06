import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParams } from '../../types';
import { MaskedTextInput } from 'react-native-mask-text';

import CustomTextInput from '@components/CustomTextInput';
import LogoV3 from '@assets/LogoV3.png';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<NavigationParams>;

function PhoneConfirmationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    // A máscara já garante um formato próximo, então só validamos o comprimento
    if (phoneNumber.length === 19) {
      // Comprimento de "+55 (11) 98888-8888"
      setIsLoading(true);
      // Simula um envio de SMS
      setTimeout(() => {
        const mockCode = '1234';
        setIsLoading(false);
        Alert.alert('Simulação', 'Código 1234 enviado com sucesso!');
        navigation.navigate('ConfirmPhoneNumber', { code: mockCode });
      }, 1000); // Simula 1 segundo de espera
    } else {
      Alert.alert('Erro', 'Digite um número de telefone válido.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={LogoV3} style={styles.logo} />
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.title}>Acesse sua conta</Text>
          <Text style={styles.subtitle}>
            Insira seu celular para entrar. Você receberá um código SMS para
            confirmar seu telefone.
          </Text>

          <CustomTextInput label="Celular com DDD">
            <MaskedTextInput
              mask="+55 (99) 99999-9999"
              style={styles.input}
              placeholder="+55 (00) 00000-0000"
              placeholderTextColor="#999"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </CustomTextInput>

          <TouchableOpacity
            style={styles.button}
            onPress={handleContinue}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Continuar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.linkText}>Voltar</Text>
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
