import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, Modal, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../config/navigation';
import { globalStyles } from '../../theme/globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { API_URL } from '../../lib/constants/api';
import Button from '../../components/Button';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ConfirmCode'>;
type RouteProp = ReturnType<typeof useRoute>;

const ConfirmCodeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const { phoneNumber } = route.params as { phoneNumber: string };
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handleContinue = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 4) {
      alert('Por favor, insira um código de 4 dígitos.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/verify-code`, {
        phoneNumber,
        code: fullCode,
      });

      if (response.status === 200) {
        setShowSuccessModal(true);
      }
    } catch (error) {
      alert('Erro ao verificar código. Tente novamente.');
      console.error(error);
    }
  };

  const handleModalClose = async () => {
    setShowSuccessModal(false);

    try {
      const response = await axios.post(`${API_URL}/auth/verify-code`, {
        phoneNumber,
        code: code.join(''),
      });

      const data = response.data as { exists: boolean };

      if (data.exists) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Register', { phoneNumber });
      }
    } catch (error) {
      alert('Erro ao verificar usuário. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <View style={styles.headerMessage}>
          <Text style={styles.headerText}>Agende todo tipo de serviço, hoje mesmo!</Text>
        </View>
      </View>
      <Text style={styles.title}>Insira o código de acesso</Text>
      <Text style={styles.subtitle}>
        Digite o código de 4 dígitos que foi enviado para {phoneNumber}
      </Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>
      <Button title="Continuar" onPress={handleContinue} />

      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Código reenviado com sucesso!</Text>
            <Button title="OK" onPress={handleModalClose} style={styles.modalButton} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F6FA',
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  logoImage: {
    width: wp('15%'),
    height: wp('15%'),
    marginBottom: hp('1%'),
  },
  headerMessage: {
    backgroundColor: '#FFFFFF',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('5%'),
  },
  headerText: {
    fontSize: wp('3.5%'),
    color: '#F5A623',
    fontWeight: 'bold',
  },
  title: {
    fontSize: Platform.OS === 'web' ? wp('7%') : wp('6%'),
    color: '#1E88E5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: '#000000',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: wp('2%'),
    width: wp('12%'),
    height: wp('12%'),
    fontSize: wp('5%'),
    textAlign: 'center',
    marginHorizontal: wp('1%'),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1E88E5',
    padding: wp('5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    width: Platform.OS === 'web' ? wp('30%') : wp('80%'),
  },
  modalText: {
    fontSize: wp('4%'),
    color: '#FFFFFF',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('5%'),
  },
});

export default ConfirmCodeScreen;