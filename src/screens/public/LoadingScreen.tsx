import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../config/navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import Button from '../../components/Button';
import { useLocation } from '../../lib/hooks/useLocation';
import { useAuthStore } from '../../stores/authStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Loading'>;

const LoadingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getDeviceLocation, errorMsg } = useLocation();
  const { location, setLocation, setIsLoggedIn } = useAuthStore();
  const [cep, setCep] = useState<string>('');

  const handleUseDeviceLocation = async () => {
    await getDeviceLocation();
    if (location) {
      Alert.alert('Localização Obtida', `Você está em ${location.city}, ${location.state}`);
      navigation.navigate('Home');
    } else if (errorMsg) {
      Alert.alert('Erro', errorMsg);
    }
  };

  const handleCepSubmit = async () => {
    if (!cep || cep.length !== 8) {
      Alert.alert('Erro', 'Por favor, insira um CEP válido (8 dígitos).');
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { localidade, uf } = response.data;
      if (localidade && uf) {
        setLocation({ city: localidade, state: uf });
        Alert.alert('Localização Obtida', `Você está em ${localidade}, ${uf}`);
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'CEP não encontrado.');
      }
    } catch (error) {
      let errorMessage = 'Erro ao buscar CEP.';
      if (error instanceof Error) {
        errorMessage += ' ' + error.message;
      }
      Alert.alert('Erro', errorMessage);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigation.navigate('ConfirmNumber');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>Bem-vindo ao DelBicos</Text>
      <Text style={styles.subtitle}>Escolha como deseja prosseguir:</Text>

      <Button
        title="Usar Localização do Aparelho"
        onPress={handleUseDeviceLocation}
        style={styles.optionButton}
      />
      <View style={styles.cepContainer}>
        <TextInput
          style={styles.cepInput}
          placeholder="Digite seu CEP (ex.: 12345678)"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
          maxLength={8}
        />
        <Button
          title="Confirmar CEP"
          onPress={handleCepSubmit}
          style={styles.cepButton}
        />
      </View>
      <Button
        title="Fazer Login no Aplicativo"
        onPress={handleLogin}
        style={styles.optionButton}
      />
      <Text style={styles.footer}>© DelBicos - 2025 - Todos os direitos reservados</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5A623',
    paddingHorizontal: wp('5%'),
  },
  logoImage: {
    width: wp('40%'),
    height: wp('40%'),
    marginBottom: hp('3%'),
  },
  title: {
    fontSize: Platform.OS === 'web' ? wp('7%') : wp('6%'),
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  optionButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('6%'),
    width: wp('80%'),
    marginBottom: hp('2%'),
  },
  cepContainer: {
    width: wp('80%'),
    marginBottom: hp('2%'),
    alignItems: 'center',
  },
  cepInput: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: wp('2%'),
    padding: hp('1.5%'),
    fontSize: wp('4%'),
    width: '100%',
    marginBottom: hp('1%'),
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  cepButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('6%'),
    width: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: hp('2%'),
    color: '#FFFFFF',
    fontSize: wp('3%'),
  },
});

export default LoadingScreen;