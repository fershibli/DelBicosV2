import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';

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
  const [formattedCep, setFormattedCep] = useState('');
  const [isCepValid, setIsCepValid] = useState<boolean | null>(null);

  const formatCep = (text: string) => {
    const cleanText = text.replace(/[^\d]/g, '');
    if (cleanText.length > 8) return formattedCep; // Limita a 8 dígitos
    let formatted = cleanText;
    if (cleanText.length > 5) {
      formatted = `${cleanText.slice(0, 5)}-${cleanText.slice(5, 8)}`;
    }
    return formatted;
  };

  const handleCepChange = (text: string) => {
    const formatted = formatCep(text);
    setFormattedCep(formatted);
    setCep(formatted.replace(/[^\d]/g, '')); // Armazena apenas os dígitos

    if (formatted.length === 9) {
      // Formato XXXXX-XXX
      setIsCepValid(true);
    } else {
      setIsCepValid(formatted.length === 0 ? null : false);
    }
  };

  const handleUseLocation = async () => {
    console.log('Iniciando solicitação de permissão de localização');
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização negada');
      Alert.alert(
        'Permissão negada',
        'Não foi possível acessar sua localização. Por favor, permita o acesso nas configurações.',
      );
      return;
    }

    console.log('Permissão concedida, obtendo localização...');
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000,
      });
      console.log('Localização obtida:', location);
      const geocode = await Location.reverseGeocodeAsync(location.coords);
      console.log('Geocodificação:', geocode);

      if (geocode.length > 0) {
        const { city, region } = geocode[0];
        console.log('Cidade e região obtidas:', city, region);
        onLocationRetrieved(
          city || 'Cidade Desconhecida',
          region || 'Estado Desconhecido',
        );
      } else {
        console.log('Nenhum resultado de geocodificação encontrado');
        onLocationRetrieved('Cidade Desconhecida', 'Estado Desconhecido');
        Alert.alert(
          'Aviso',
          'Localização não identificada. Usando valores padrão.',
        );
      }
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      onLocationRetrieved('Cidade Desconhecida', 'Estado Desconhecido');
      Alert.alert(
        'Erro',
        'Ocorreu um problema ao obter a localização. Usando valores padrão.',
      );
    }
  };

  const handleSearchCep = async () => {
    if (!cep || cep.length !== 8) {
      Alert.alert('CEP inválido', 'Digite um CEP válido com 8 dígitos.');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) throw new Error();
      const { localidade: city, uf: state } = data;
      onCepRetrieved(city, state);
    } catch {
      setIsCepValid(false);
      Alert.alert('CEP inválido', 'Digite um CEP válido.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={handleUseLocation}>
        <Text style={styles.buttonText}>📍 Usar minha localização</Text>
      </TouchableOpacity>

      <View style={styles.cepContainer}>
        <TextInput
          placeholder="Digite seu CEP (XXXXX-XXX)"
          style={styles.input}
          value={formattedCep}
          onChangeText={handleCepChange}
          keyboardType="numeric"
          maxLength={9} // XXXXX-XXX
        />
        {isCepValid !== null && (
          <Text style={isCepValid ? styles.validText : styles.errorText}>
            {isCepValid ? 'CEP válido' : 'CEP inválido'}
          </Text>
        )}
      </View>

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

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
  cepContainer: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
  },
  validText: {
    color: '#003366',
    fontSize: 12,
    marginTop: 5,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#003366',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
