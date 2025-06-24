import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import CodeInput from '@components/CodeInput';
import { styles } from './styles';
import logo from '../../../assets/logo.png';

type ConfirmPhoneNumberRouteProp = RouteProp<
  { params: { code: string } },
  'params'
>;

function ConfirmPhoneNumberScreen({
  route,
}: {
  route: ConfirmPhoneNumberRouteProp;
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
          <Text style={styles.title}>Confirme seu número</Text>
          <Text style={styles.subtitle}>
            Insira o código de acesso de 4 dígitos que você recebeu
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
    </View>
  );
}

export default ConfirmPhoneNumberScreen;
