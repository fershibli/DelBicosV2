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
import { useLocation } from '@lib/hooks/LocationContext';
import { styles } from './styles';
import logo from '../../../assets/logo.png'; // Importação tipada de logo

function RegisterScreen() {
  const navigation = useNavigation();
  const { setLocation } = useLocation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const isStrongPassword = (pass: string) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    return hasUpperCase && hasNumber && hasSpecial && pass.length >= 8;
  };

  const formatPhone = (text: string) => {
    const cleanText = text.replace(/[^\d]/g, '').slice(0, 11);
    if (cleanText.length <= 2) return `(${cleanText}`;
    if (cleanText.length <= 7)
      return `(${cleanText.slice(0, 2)}) ${cleanText.slice(2)}`;
    if (cleanText.length <= 11)
      return `(${cleanText.slice(0, 2)}) ${cleanText.slice(2, 7)}-${cleanText.slice(7, 11)}`;
    return phone;
  };

  const formatCep = (text: string) => {
    const cleanText = text.replace(/[^\d]/g, '').slice(0, 8); // Limita a 8 dígitos
    if (cleanText.length <= 5) return cleanText;
    if (cleanText.length <= 8)
      return `${cleanText.slice(0, 5)}-${cleanText.slice(5, 8)}`;
    return cep; // Retorna o valor atual se exceder 8 dígitos
  };

  const validateCep = (cepValue: string) => {
    const cleanCep = cepValue.replace(/[^\d]/g, '');
    return cleanCep.length === 8 && /^\d+$/.test(cleanCep); // Valida 8 dígitos numéricos
  };

  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Não foi possível acessar sua localização.',
      );
      return;
    }
    const locationData = await Location.getCurrentPositionAsync({});
    const geocode = await Location.reverseGeocodeAsync(locationData.coords);
    if (geocode.length > 0) {
      const { street: s, subregion, postalCode, city: c, region } = geocode[0];
      setStreet(s || '');
      setNeighborhood(subregion || '');
      setCep(postalCode || '');
      setCity(c || '');
      setState(region || '');
    }
  };

  const handleCepChange = async (cepValue: string) => {
    const formattedCep = formatCep(cepValue);
    setCep(formattedCep);

    if (validateCep(formattedCep)) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${formattedCep.replace('-', '')}/json/`,
        );
        const data = await response.json();
        if (!data.erro && data.localidade && data.uf) {
          setCity(data.localidade);
          setState(data.uf);
          setStreet(data.logradouro || '');
          setNeighborhood(data.bairro || '');
          setLocation(data.localidade, data.uf);
          console.log(
            'Localização via CEP definida:',
            data.localidade,
            data.uf,
          );
          console.log(
            'Rua e bairro preenchidos:',
            data.logradouro,
            data.bairro,
          );
        } else {
          setCity('');
          setState('');
          setStreet('');
          setNeighborhood('');
          setLocation('', '');
          console.log('CEP inválido ou não encontrado na API.');
        }
      } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        setCity('');
        setState('');
        setStreet('');
        setNeighborhood('');
        setLocation('', '');
        Alert.alert('Erro', 'Não foi possível consultar o CEP.');
      }
    } else {
      setCity('');
      setState('');
      setStreet('');
      setNeighborhood('');
      setLocation('', '');
      console.log('CEP inválido, navegando não realizado.');
    }
  };

  const handleSubmit = () => {
    const nameValid = /^[A-Za-zÀ-ÿ\s]+$/.test(name);
    const surnameValid = /^[A-Za-zÀ-ÿ\s]+$/.test(surname);
    const birthDateValid =
      day &&
      month &&
      year &&
      !isNaN(new Date(`${year}-${month}-${day}`).getTime());
    const numberValid = /^\d+$/.test(number);
    const phoneValid =
      phone.replace(/[^\d]/g, '').length === 11 &&
      /^\(\d{2}\)\s\d{5}-\d{4}$/.test(phone);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid = isStrongPassword(password);
    const cleanCpf = cpf.replace(/[^\d]/g, '');
    const cpfValid = cleanCpf.length === 11 && !/(\d)\1{10}/.test(cleanCpf);
    const cepValid = validateCep(cep);

    if (!nameValid) {
      Alert.alert('Erro', 'Nome deve conter apenas letras.');
      return;
    }
    if (!surnameValid) {
      Alert.alert('Erro', 'Sobrenome deve conter apenas letras.');
      return;
    }
    if (!birthDateValid) {
      Alert.alert(
        'Erro',
        'Data de aniversário inválida. Use o formato DD/MM/AAAA.',
      );
      return;
    }
    if (!numberValid) {
      Alert.alert('Erro', 'Número deve conter apenas números.');
      return;
    }
    if (!phoneValid) {
      Alert.alert('Erro', 'Telefone deve estar no formato (DD) 99999-9999.');
      return;
    }
    if (!emailValid) {
      Alert.alert('Erro', 'E-mail inválido.');
      return;
    }
    if (!passwordValid) {
      Alert.alert(
        'Erro',
        'Senha deve conter letra maiúscula, número, caractere especial e ter no mínimo 8 caracteres.',
      );
      return;
    }
    if (!cpfValid) {
      Alert.alert('Erro', 'CPF inválido.');
      return;
    }
    if (!cepValid) {
      Alert.alert(
        'Erro',
        'CEP inválido. Deve conter 8 dígitos numéricos (ex.: 12345-678).',
      );
      return;
    }
    if (!acceptTerms) {
      Alert.alert('Erro', 'Você deve aceitar os termos de uso e condições.');
      return;
    }

    const userData = {
      name,
      surname,
      day,
      month,
      year,
      cpf,
      cep,
      street,
      number,
      neighborhood,
      city,
      state,
      phone,
      email,
      password,
      acceptTerms,
    };
    setLocation(city, state);
    console.log('Dados salvos:', userData);
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.navigate('Feed');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image source={logo} style={styles.logoImage} />
            <View>
              <Text style={styles.logoText}>delivery de bicos</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>Cadastre-se</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={(text) => setName(text.replace(/[^A-Za-zÀ-ÿ\s]/g, ''))}
        />
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          value={surname}
          onChangeText={(text) =>
            setSurname(text.replace(/[^A-Za-zÀ-ÿ\s]/g, ''))
          }
        />
        <View style={styles.formRow}>
          <View style={styles.dateContainer}>
            <TextInput
              style={[styles.inputdd]}
              placeholder="DD"
              value={day}
              onChangeText={setDay}
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={[styles.inputdata]}
              placeholder="MM"
              value={month}
              onChangeText={setMonth}
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={[styles.inputdata]}
              placeholder="AAAA"
              value={year}
              onChangeText={setYear}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
        </View>
        <CpfInput value={cpf} onChangeText={setCpf} />
        <View style={styles.locationContainer}>
          <TextInput
            style={[styles.input, styles.locationInput]}
            placeholder="CEP (99999-999)"
            value={cep}
            onChangeText={handleCepChange}
          />
          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleGetLocation}>
            <Text style={styles.buttonText}>📍</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Rua"
          value={street}
          onChangeText={setStreet}
        />
        <TextInput
          style={styles.input}
          placeholder="Número"
          value={number}
          onChangeText={(text) => setNumber(text.replace(/[^\d]/g, ''))}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          value={neighborhood}
          onChangeText={setNeighborhood}
        />
        <View style={styles.formRow}>
          <TextInput
            style={styles.inputend}
            placeholder="Cidade"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={styles.inputuf}
            placeholder="UF"
            value={state}
            onChangeText={setState}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Telefone (DD) 99999-9999"
          value={phone}
          onChangeText={(text) => setPhone(formatPhone(text))}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          © DelBicos - 2025 – Todos os direitos reservados.
        </Text>
      </ScrollView>
    </View>
  );
}

export default RegisterScreen;
