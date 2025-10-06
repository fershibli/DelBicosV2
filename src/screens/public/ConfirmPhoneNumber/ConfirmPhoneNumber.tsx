import React, { useState, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Alert,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParams } from '../../types';
import { useUserStore } from '@stores/User';
import LogoV3 from '@assets/LogoV3.png';
import { styles } from './styles';

type ConfirmPhoneNumberRouteProp = RouteProp<
  { params: { code: string; phoneNumber?: string } },
  'params'
>;

type NavigationProp = NativeStackNavigationProp<NavigationParams>;

function ConfirmPhoneNumberScreen({
  route,
}: {
  route: ConfirmPhoneNumberRouteProp;
}) {
  const navigation = useNavigation<NavigationProp>();
  const { signIn } = useUserStore();
  const { code: sentCode = '1234', phoneNumber } = route.params || {};

  const [code, setCode] = useState(['', '', '', '']);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Refs para controlar o foco dos inputs
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleTextChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Foca no próximo input se um dígito for inserido
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }

    // Se o código de 4 dígitos estiver completo, fecha o teclado
    if (newCode.every((digit) => digit !== '')) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const enteredCode = code.join('');
    const verificationSuccess = enteredCode === sentCode;
    setIsSuccess(verificationSuccess);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    if (isSuccess) {
      signIn(); // Simula o login
      navigation.navigate('Feed');
    } else {
      setCode(['', '', '', '']);
      inputs.current[0]?.focus(); // Volta o foco para o primeiro input
    }
  };

  const handleResendCode = () => {
    // Aqui você adicionaria a lógica para reenviar o SMS
    Alert.alert(
      'Código Reenviado',
      `Um novo código foi enviado para ${phoneNumber || 'seu número'}.`,
    );
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
          <Text style={styles.title}>Confirme seu número</Text>
          <Text style={styles.subtitle}>
            Insira o código de 4 dígitos que você recebeu no número{' '}
            {phoneNumber || ''}.
          </Text>

          <View style={styles.codeInputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                style={styles.codeInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleTextChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.linkText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.linkText}>Reenviar código</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isSuccess ? 'Sucesso!' : 'Código Inválido'}
            </Text>
            <Text style={styles.modalText}>
              {isSuccess
                ? 'Seu número foi verificado.'
                : 'O código inserido está incorreto. Por favor, tente novamente.'}
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.modalButton]}
              onPress={closeModal}>
              <Text style={styles.buttonText}>
                {isSuccess ? 'Entrar' : 'Tentar Novamente'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ConfirmPhoneNumberScreen;
