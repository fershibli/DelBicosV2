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
import { LocationButton } from '../LocationButton/LocationButton';
import { styles } from './styles';
// @ts-ignore
import IconSearch from '@assets/Search.svg';
// @ts-ignore
import IconPerson from '@assets/person.svg';

interface Props {
  onLocationRetrieved: (latitude: number, longitude: number) => void;
  onCepRetrieved: (city: string, state: string) => void;
  onLoginPress: () => void;
}

const LocationOptions: React.FC<Props> = ({
  onLocationRetrieved,
  onCepRetrieved,
  onLoginPress,
}) => {
  const [cep, setCep] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleUseLocation = async () => {
    setLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Não foi possível acessar sua localização',
        );
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a localização');
      console.error('Erro ao obter localização:', error);
      return null;
    } finally {
      setLoadingLocation(false);
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
      <LocationButton
        onPress={handleUseLocation}
        loading={loadingLocation}
        onConfirm={({ latitude, longitude }) => onLocationRetrieved(latitude, longitude)}
      />

      <TextInput
        placeholder="Digite seu CEP"
        style={styles.input}
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSearchCep}>
        <Image source={IconSearch} width={21} height={29} />
        <Text style={styles.buttonText}>Buscar CEP ou Ruas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonLogin} onPress={onLoginPress}>
        <Image source={IconPerson} width={21} height={29} />
        <Text style={styles.buttonLoginText}>Fazer Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationOptions;