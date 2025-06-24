import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import { styles } from './styles';

interface Props {
  onLocationRetrieved: (city: string, country: string) => void;
  onCepRetrieved: (city: string, state: string) => void;
  onLoginPress: () => void;
  onNavigateToFeed: () => void; // Verificada
}

const LocationOptions: React.FC<Props> = ({
  onLocationRetrieved,
  onCepRetrieved,
  onLoginPress,
  onNavigateToFeed,
}) => {
  const [cep, setCep] = useState('');

  const handleUseLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log('Permissão solicitada, status:', status);
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Não foi possível acessar sua localização',
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const geocode = await Location.reverseGeocodeAsync(location.coords);
    console.log('Geocode retornado:', geocode);

    if (geocode.length > 0) {
      const { city, region, postalCode } = geocode[0];
      console.log('Dados obtidos:', {
        city,
        region,
        postalCode,
      });
      onLocationRetrieved(city || '', region || '');
      console.log('Chamando onNavigateToFeed');
      if (typeof onNavigateToFeed === 'function') {
        onNavigateToFeed();
        console.log('Navegação para Feed iniciada');
      } else {
        console.error('onNavigateToFeed não é uma função:', onNavigateToFeed);
        Alert.alert('Erro', 'Falha na navegação. Contate o suporte.');
      }

      if (postalCode) {
        try {
          const response = await fetch(
            `https://viacep.com.br/ws/${postalCode.replace('-', '')}/json/`,
          );
          const data = await response.json();
          if (!data.erro) {
            const { localidade: foundCity, uf: foundState } = data;
            onCepRetrieved(foundCity, foundState);
            console.log('CEP validado:', postalCode, foundCity, foundState);
          } else {
            console.log('CEP inválido na geolocalização:', postalCode);
          }
        } catch (error) {
          console.error('Erro ao consultar ViaCEP:', error);
          console.log('Falha ao validar CEP com postalCode:', postalCode);
        }
      } else {
        console.log('Nenhum postalCode encontrado. Coordenadas:');
      }
    } else {
      console.log('Nenhum geocode retornado para as coordenadas.');
      Alert.alert(
        'Erro',
        'Não foi possível obter a localização. Por favor, preencha o CEP manualmente.',
      );
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
    } catch {
      Alert.alert('CEP inválido', 'Digite um CEP válido.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={handleUseLocation}>
        <Text style={styles.buttonText}>📍 Usar minha localização</Text>
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
