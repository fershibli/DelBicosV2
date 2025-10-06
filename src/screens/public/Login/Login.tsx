import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useLocation } from '@lib/hooks/LocationContext';
import CustomTextInput from '@components/CustomTextInput';
import LogoV3 from '@assets/LogoV3.png';
import { styles } from './styles';

function LoginScreen() {
  const navigation = useNavigation();
  const { setLocation } = useLocation();
  const [cep, setCep] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  // Função para buscar localização automática
  const handleUseLocation = async () => {
    setIsLoadingLocation(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Não foi possível acessar sua localização.',
      );
      setIsLoadingLocation(false);
      return;
    }

    try {
      const locationData = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationData.coords;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      );
      const data = await response.json();

      if (data && data.address) {
        const { city, state, town, village } = data.address;
        const cityName = city || town || village || 'Cidade não encontrada';
        const stateName = state || 'Estado não encontrado';
        setLocation(cityName, stateName);
        navigation.navigate('Feed');
      } else {
        Alert.alert('Erro', 'Endereço não encontrado para esta localização.');
      }
    } catch {
      Alert.alert('Erro', 'Ocorreu um problema ao buscar sua localização.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Função para buscar localização via CEP
  const handleCepSearch = async () => {
    setIsLoadingCep(true);
    if (cep.replace(/\D/g, '').length !== 8) {
      Alert.alert('CEP Inválido', 'Por favor, digite um CEP com 8 dígitos.');
      setIsLoadingCep(false);
      return;
    }
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
      } else {
        setLocation(data.localidade, data.uf);
        navigation.navigate('Feed');
      }
    } catch {
      Alert.alert(
        'Erro',
        'Não foi possível buscar o CEP. Verifique sua conexão.',
      );
    } finally {
      setIsLoadingCep(false);
    }
  };

  const onLoginPress = () => {
    navigation.navigate('LoginPassword');
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
          <Text style={styles.title}>Onde você está?</Text>
          <Text style={styles.subtitle}>
            Use sua localização ou CEP para encontrarmos os melhores serviços
            perto de você.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleUseLocation}
            disabled={isLoadingLocation}>
            {isLoadingLocation ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Usar minha localização</Text>
            )}
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <CustomTextInput
              label="Digite seu CEP"
              placeholder="00000-000"
              value={cep}
              onChangeText={setCep}
              keyboardType="numeric"
              maxLength={9}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleCepSearch}
            disabled={isLoadingCep}>
            {isLoadingCep ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Buscar CEP</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={onLoginPress}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
              Fazer Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
    </View>
  );
}

export default LoginScreen;
