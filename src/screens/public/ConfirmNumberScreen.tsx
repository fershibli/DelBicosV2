import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../config/navigation';
import { globalStyles } from '../../theme/globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { API_URL } from '../../lib/constants/api';
import Button from '../../components/Button';
import { useAuthStore } from '../../stores/authStore';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ConfirmNumber'>;

const ConfirmNumberScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [phoneNumber, setLocalPhoneNumber] = useState<string>('');
  const { setPhoneNumber } = useAuthStore();

  const handleContinue = async () => {
    if (phoneNumber.length < 10) {
      alert('Por favor, insira um número de celular válido.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/confirm-number`, {
        phoneNumber,
      });

      if (response.status === 200) {
        setPhoneNumber(phoneNumber);
        navigation.navigate('ConfirmCode', { phoneNumber });
      }
    } catch (error) {
      alert('Erro ao verificar número. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.header}>
        <View style={styles.containerLogo}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.headerMessage}>
          <Text style={styles.headerText}>Agende todo tipo de serviço, hoje mesmo!</Text>
        </View>
      </View>
      <Text style={styles.title}>Confirme seu número</Text>
      <Text style={styles.subtitle}>Insira seu celular para entrar</Text>
      <Text style={styles.description}>Você receberá o código por SMS para confirmar o telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="DDD + Celular (11) 90000-0000"
        value={phoneNumber}
        onChangeText={setLocalPhoneNumber}
        keyboardType="phone-pad"
        maxLength={15}
      />
      <Button title="Continuar" onPress={handleContinue} />
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
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: wp('30%'),
    height: wp('30%'),
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
    marginBottom: hp('0.5%'),
  },
  description: {
    fontSize: wp('3.5%'),
    color: '#666666',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: wp('2%'),
    padding: hp('1.5%'),
    fontSize: wp('4%'),
    width: Platform.OS === 'web' ? wp('50%') : wp('90%'),
    alignSelf: 'center',
    marginBottom: hp('2%'),
  },
});

export default ConfirmNumberScreen;