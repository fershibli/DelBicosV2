import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CodeInput } from './../lib/util/CodeInput';

interface ConfirmPhoneNumberRoute {
  params?: {
    code?: string;
  };
}

export function ConfirmPhoneNumber({
  route,
}: {
  route: ConfirmPhoneNumberRoute;
}) {
  const navigation = useNavigation();
  const { code: sentCode = '1234' } = route.params || {};
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleContinue = () => {
    const enteredCode = verificationCode.join('');
    const verificationSuccess = enteredCode === sentCode;
    setIsSuccess(verificationSuccess);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    if (isSuccess) {
      navigation.navigate('Register');
    } else {
      setVerificationCode(['', '', '', '']);
      setFocusedIndex(0);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Confirme seu número</Text>
      <Text style={styles.subtitle}>
        Insira o código de acesso de 4 dígitos que você recebeu para o número
        (+55) 1622
      </Text>
      <CodeInput
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        focusedIndex={focusedIndex}
        setFocusedIndex={setFocusedIndex}
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.messageBox,
              { backgroundColor: isSuccess ? '#003366' : '#ff4444' },
            ]}>
            <Text style={styles.message}>
              {isSuccess
                ? 'Código enviado com sucesso!'
                : 'Erro na verificação do código.'}
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0fa',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    fontSize: 12,
    color: '#003366',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBox: {
    width: '80%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#ff7f00',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
});
