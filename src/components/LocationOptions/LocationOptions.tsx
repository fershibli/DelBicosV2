import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from 'react-native';
import * as Location from 'expo-location';
import { styles } from './styles';
// @ts-ignore
import IconPin from '@assets/Local.svg';

interface Props {
  onLocationRetrieved: (city: string, country: string) => void;
  onCepRetrieved: (city: string, state: string) => void;
  onLoginPress: () => void;
}

const LocationOptions: React.FC<Props> = ({
  onLocationRetrieved,
  onCepRetrieved,
  onLoginPress,
}) => {
  const [cep, setCep] = useState('');

  const handleUseLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Não foi possível acessar sua localização',
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const geocode = await Location.reverseGeocodeAsync(location.coords);

    if (geocode.length > 0) {
      const { city, region } = geocode[0];
      onLocationRetrieved(city || '', region || '');
    }
  };

  const handleSearchCep = async () => {
    if (!cep) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) throw new Error();
      const { localidade: city, uf: state } = data;
      onCepRetrieved(city, state);
    } catch (error) {
      Alert.alert('CEP inválido', 'Digite um CEP válido.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={handleUseLocation}>
        <Image source={IconPin} width={21} height={29} />
        <Text style={styles.buttonText}>Usar minha localização</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Digite seu CEP"
        style={styles.input}
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSearchCep}>
        <Text style={styles.buttonText}>🔍 Buscar CEP ou ruas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onLoginPress}>
        <Text style={styles.buttonText}>🔐 Fazer Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationOptions;
