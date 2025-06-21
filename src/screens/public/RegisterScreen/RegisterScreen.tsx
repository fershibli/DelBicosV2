import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
  Image,
} from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import CpfInput from '@components/CpfInput';
import DateInput from '@components/DateInput';
import { useLocation } from '@lib/hooks/LocationContext';
import { styles } from './styles';
import logo from '../../../assets/logo.png'; // Importação tipada de logo

function RegisterScreen() {
  const navigation = useNavigation();
  const { setLocation: updateLocation } = useLocation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cpf, setCpf] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleUseLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Não foi possível acessar sua localização',
      );
      return;
    }

    const locationData = await Location.getCurrentPositionAsync({});
    const geocode = await Location.reverseGeocodeAsync(locationData.coords);

    if (geocode.length > 0) {
      const { city, region } = geocode[0];
      const newLocation = `${city || ''}, ${region || ''}`;
      const [newCity, newState] = newLocation
        .split(', ')
        .map((str) => str.trim());
      setLocation(newLocation);
      updateLocation(newCity || 'Unknown City', newState || 'Unknown State');
    }
  };

  const validateFields = () => {
    if (
      !name ||
      !surname ||
      !birthDate ||
      !cpf ||
      !location ||
      !email ||
      !password
    ) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return false;
    }
    if (!acceptTerms) {
      Alert.alert('Erro', 'Você deve aceitar os termos de uso e condições.');
      return false;
    }

    const [day, month, year] = birthDate.split('/').map(Number);
    if (
      !birthDate.match(/^\d{2}\/\d{2}\/\d{4}$/) ||
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      Alert.alert(
        'Erro',
        'Data de nascimento inválida. Use o formato DD/MM/AAAA e insira uma data válida.',
      );
      return false;
    }

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      Alert.alert('Erro', 'Digite um e-mail válido.');
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    if (validateFields()) {
      const [city, state] = location.split(', ').map((str) => str.trim());
      updateLocation(city, state);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.containerweb}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image source={logo} style={styles.logoImage} />
            <Text style={styles.logoText}>delivery de bicos</Text>
          </View>
        </View>

        <Text style={styles.titleweb}>Cadastre-se</Text>

        <TextInput
          style={styles.inputweb}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.inputweb}
          placeholder="Sobrenome"
          value={surname}
          onChangeText={setSurname}
        />
        <DateInput value={birthDate} onChangeText={setBirthDate} />
        <CpfInput value={cpf} onChangeText={setCpf} />
        <View style={styles.locationContainer}>
          <TextInput
            style={[styles.inputweb, styles.locationInput]}
            placeholder="Localização"
            value={location}
            editable={false}
          />
          <TouchableOpacity
            style={styles.locationButtonweb}
            onPress={handleUseLocation}>
            <Text style={styles.buttonText}>📍</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.inputweb}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.inputweb, styles.passwordInput]}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Text style={styles.eyeIcon}>{passwordVisible ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.termsContainer}>
          <Switch
            value={acceptTerms}
            onValueChange={setAcceptTerms}
            trackColor={{ false: '#767577', true: '#003366' }}
            thumbColor={acceptTerms ? '#ffffff' : '#f4f3f4'}
          />
          <Text style={styles.termsLabel}>
            Aceito os{' '}
            <Text
              style={styles.termsLink}
              onPress={() => Alert.alert('Termos de uso')}>
              termos de uso e condições
            </Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
      <Text style={styles.footerweb}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
    </View>
  );
}

export default RegisterScreen;
