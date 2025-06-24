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

  // Estados para mensagens de erro
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [dayError, setDayError] = useState('');
  const [monthError, setMonthError] = useState('');
  const [yearError, setYearError] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [cepError, setCepError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [neighborhoodError, setNeighborhoodError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');

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
          setCepError('');
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
          setCepError('CEP inválido ou não encontrado.');
          console.log('CEP inválido ou não encontrado na API.');
        }
      } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        setCity('');
        setState('');
        setStreet('');
        setNeighborhood('');
        setLocation('', '');
        setCepError('Erro ao consultar o CEP.');
      }
    } else {
      setCity('');
      setState('');
      setStreet('');
      setNeighborhood('');
      setLocation('', '');
      setCepError('CEP inválido. Deve conter 8 dígitos numéricos.');
      console.log('CEP inválido, navegando não realizado.');
    }
  };

  const handleSubmit = () => {
    // Reinicia as mensagens de erro
    setNameError('');
    setSurnameError('');
    setDayError('');
    setMonthError('');
    setYearError('');
    setCpfError('');
    setCepError('');
    setStreetError('');
    setNumberError('');
    setNeighborhoodError('');
    setCityError('');
    setStateError('');
    setPhoneError('');
    setEmailError('');
    setPasswordError('');
    setTermsError('');

    // Validação de Nome
    const nameValid = /^[A-Za-zÀ-ÿ\s]+$/.test(name);
    if (!nameValid || !name.trim()) {
      setNameError('O nome deve conter apenas letras e não pode estar vazio.');
      return;
    }

    // Validação de Sobrenome
    const surnameValid = /^[A-Za-zÀ-ÿ\s]+$/.test(surname);
    if (!surnameValid || !surname.trim()) {
      setSurnameError(
        'O sobrenome deve conter apenas letras e não pode estar vazio.',
      );
      return;
    }

    // Validação de Data de Nascimento
    const birthDateValid =
      day &&
      month &&
      year &&
      !isNaN(new Date(`${year}-${month}-${day}`).getTime()) &&
      parseInt(day) >= 1 &&
      parseInt(day) <= 31 &&
      parseInt(month) >= 1 &&
      parseInt(month) <= 12 &&
      parseInt(year) >= 1900 &&
      parseInt(year) <= new Date().getFullYear();
    if (!birthDateValid) {
      setDayError(
        'Data de aniversário inválida. Use valores válidos para DD (01-31), MM (01-12) e AAAA (1900-atual).',
      );
      setMonthError(
        'Data de aniversário inválida. Use valores válidos para DD (01-31), MM (01-12) e AAAA (1900-atual).',
      );
      setYearError(
        'Data de aniversário inválida. Use valores válidos para DD (01-31), MM (01-12) e AAAA (1900-atual).',
      );
      return;
    }

    // Validação de CPF
    const cleanCpf = cpf.replace(/[^\d]/g, '');
    const cpfValid = cleanCpf.length === 11 && !/(\d)\1{10}/.test(cleanCpf);
    if (!cpfValid || !cpf.trim()) {
      setCpfError(
        'CPF inválido. Deve conter 11 dígitos numéricos e não pode ser uma sequência repetida (ex.: 11111111111).',
      );
      return;
    }

    // Validação de CEP
    const cepValid = validateCep(cep);
    if (!cepValid || !cep.trim()) {
      setCepError(
        'CEP inválido. Deve conter 8 dígitos numéricos (ex.: 12345-678).',
      );
      return;
    }

    // Validação de Rua
    if (!street.trim()) {
      setStreetError('O campo Rua é obrigatório e não pode estar vazio.');
      return;
    }

    // Validação de Número
    const numberValid = /^\d+$/.test(number);
    if (!numberValid || !number.trim()) {
      setNumberError(
        'O número deve conter apenas números e não pode estar vazio.',
      );
      return;
    }

    // Validação de Bairro
    if (!neighborhood.trim()) {
      setNeighborhoodError(
        'O campo Bairro é obrigatório e não pode estar vazio.',
      );
      return;
    }

    // Validação de Cidade
    if (!city.trim()) {
      setCityError('O campo Cidade é obrigatório e não pode estar vazio.');
      return;
    }

    // Validação de Estado
    const states = [
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO',
    ];
    if (!states.includes(state) || !state.trim()) {
      setStateError(
        'O estado deve ser uma UF válida (ex.: SP, RJ) e não pode estar vazio.',
      );
      return;
    }

    // Validação de Telefone
    const phoneValid =
      phone.replace(/[^\d]/g, '').length === 11 &&
      /^\(\d{2}\)\s\d{5}-\d{4}$/.test(phone);
    if (!phoneValid || !phone.trim()) {
      setPhoneError('Telefone inválido. Use o formato (DD) 99999-9999.');
      return;
    }

    // Validação de E-mail
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid || !email.trim()) {
      setEmailError(
        'E-mail inválido. Use um formato válido (ex.: exemplo@dominio.com).',
      );
      return;
    }

    // Validação de Senha
    const passwordValid = isStrongPassword(password);
    if (!passwordValid || !password.trim()) {
      setPasswordError(
        'Senha inválida. Deve ter pelo menos 8 caracteres, incluindo letra maiúscula, número e caractere especial.',
      );
      return;
    }

    // Validação de Termos
    if (!acceptTerms) {
      setTermsError('Você deve aceitar os termos de uso e condições.');
      return;
    }

    // Armazenamento dos dados
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
    setLocation(city, state); // Armazena a localização
    console.log('Dados salvos:', userData); // Simulação de armazenamento

    // Redirecionamento para Feed
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
              <Text style={styles.logoText}>Delivery de bicos</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>Precisamos de Você!</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={(text) => setName(text.replace(/[^A-Za-zÀ-ÿ\s]/g, ''))}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          value={surname}
          onChangeText={(text) =>
            setSurname(text.replace(/[^A-Za-zÀ-ÿ\s]/g, ''))
          }
        />
        {surnameError ? (
          <Text style={styles.errorText}>{surnameError}</Text>
        ) : null}
        <View style={styles.formRow}>
          <View style={styles.dateContainer}>
            <TextInput
              style={styles.inputdd}
              placeholder="DD"
              value={day}
              onChangeText={setDay}
              keyboardType="numeric"
              maxLength={2}
            />
            {dayError ? <Text style={styles.errorText}>{dayError}</Text> : null}
            <TextInput
              style={styles.inputdata}
              placeholder="MM"
              value={month}
              onChangeText={setMonth}
              keyboardType="numeric"
              maxLength={2}
            />
            {monthError ? (
              <Text style={styles.errorText}>{monthError}</Text>
            ) : null}
            <TextInput
              style={styles.inputdata}
              placeholder="AAAA"
              value={year}
              onChangeText={setYear}
              keyboardType="numeric"
              maxLength={4}
            />
            {yearError ? (
              <Text style={styles.errorText}>{yearError}</Text>
            ) : null}
          </View>
        </View>
        <CpfInput value={cpf} onChangeText={setCpf} />
        {cpfError ? <Text style={styles.errorText}>{cpfError}</Text> : null}
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
        {cepError ? <Text style={styles.errorText}>{cepError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Rua"
          value={street}
          onChangeText={setStreet}
        />
        {streetError ? (
          <Text style={styles.errorText}>{streetError}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Número"
          value={number}
          onChangeText={(text) => setNumber(text.replace(/[^\d]/g, ''))}
          keyboardType="numeric"
        />
        {numberError ? (
          <Text style={styles.errorText}>{numberError}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          value={neighborhood}
          onChangeText={setNeighborhood}
        />
        {neighborhoodError ? (
          <Text style={styles.errorText}>{neighborhoodError}</Text>
        ) : null}
        <View style={styles.formRow}>
          <TextInput
            style={styles.inputend}
            placeholder="Cidade"
            value={city}
            onChangeText={setCity}
          />
          {cityError ? <Text style={styles.errorText}>{cityError}</Text> : null}
          <TextInput
            style={styles.inputuf}
            placeholder="UF"
            value={state}
            onChangeText={setState}
          />
          {stateError ? (
            <Text style={styles.errorText}>{stateError}</Text>
          ) : null}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Telefone (DD) 99999-9999"
          value={phone}
          onChangeText={(text) => setPhone(formatPhone(text))}
          keyboardType="phone-pad"
        />
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
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
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

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
        {termsError ? <Text style={styles.errorText}>{termsError}</Text> : null}

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
