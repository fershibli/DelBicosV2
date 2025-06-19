import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useLocation } from '../../../lib/hooks/LocationContext';
import { styles } from './styles';
const logo = require('./../../../assets/logo.png'); // Resolves the image path to a string URL

const RegisterScreen: React.FC = () => {
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

  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, '0'),
  );
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, '0'),
  );
  const years = Array.from({ length: 100 }, (_, i) =>
    String(new Date().getFullYear() - i).padStart(4, '0'),
  );

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
    const cleanText = text.replace(/[^\d]/g, '').slice(0, 8);
    if (cleanText.length <= 5) return cleanText;
    if (cleanText.length <= 8)
      return `${cleanText.slice(0, 5)}-${cleanText.slice(5, 8)}`;
    return cep;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    navigation.navigate('Home');
  };

  const formatCpfInput = (text: string) => {
    const cleanText = text.replace(/[^\d]/g, '');
    if (cleanText.length > 11) return cpf;
    let formatted = cleanText.replace(/(\d{3})(\d)/, '$1.$2');
    formatted = formatted.replace(/(\d{3})(\d)/, '$1.$2');
    formatted = formatted.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return formatted;
  };

  return (
    <View style={styles.containerweb}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src={logo} style={styles.logoImage} alt="delBicos" />
          <span style={styles.logoText}>delivery de bicos</span>
        </div>
        <nav style={styles.nav}>
          <a
            href="#"
            style={styles.navLink}
            onClick={() => navigation.navigate('Home')}>
            Página Inicial
          </a>
          <a href="#" style={styles.navLink}>
            Categorias
          </a>
          <a href="#" style={styles.navLink}>
            Ajuda
          </a>
          <a href="#" style={styles.navLink}>
            Portal do parceiro
          </a>
          <a
            href="#"
            style={styles.navLink}
            onClick={() => navigation.navigate('Register')}>
            Cadastre-se
          </a>
          <a
            href="#"
            style={styles.navButton}
            onClick={() => navigation.navigate('PhoneConfirmation')}>
            Fazer login
          </a>
        </nav>
      </header>

      <main style={styles.main}>
        <h1 style={styles.titleweb}>Precisamos saber mais sobre você!</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formRow}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) =>
                setName(e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, ''))
              }
              style={styles.inputweb}
              placeholder="Nome"
              required
            />
            <label htmlFor="surname">Sobrenome</label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) =>
                setSurname(e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, ''))
              }
              style={styles.inputweb}
              placeholder="Sobrenome"
              required
            />
          </div>
          <div style={styles.formRow}>
            <label htmlFor="birthday">Data de aniversário</label>
            <select
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              style={styles.select}
              required>
              <option value="">DD</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              style={styles.select}
              required>
              <option value="">MM</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={styles.select}
              required>
              <option value="">AAAA</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formRow}>
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(formatCpfInput(e.target.value))}
              style={styles.inputweb}
              placeholder="XXX.XXX.XXX-XX"
              maxLength={14}
              required
            />
          </div>
          <div style={styles.formRow}>
            <label htmlFor="location">Localização</label>
            <button
              type="button"
              style={styles.locationButtonweb}
              onClick={handleGetLocation}>
              📍
            </button>
            <input
              type="text"
              id="cep"
              value={cep}
              onChange={(e) => setCep(formatCep(e.target.value))}
              style={styles.inputweb}
              placeholder="99999-999"
              required
            />
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              style={styles.inputweb}
              placeholder="Rua"
              required
            />
            <input
              type="text"
              id="number"
              value={number}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d]/g, '');
                setNumber(value);
              }}
              style={styles.inputweb}
              placeholder="Número"
              required
            />
            <input
              type="text"
              id="neighborhood"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              style={styles.inputweb}
              placeholder="Bairro"
              required
            />
          </div>
          <div style={styles.formRow}>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={styles.inputweb}
              placeholder="Cidade"
              required
            />
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              style={styles.select}
              required>
              <option value="">UF</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => {
                const formatted = formatPhone(e.target.value);
                setPhone(formatted);
              }}
              style={styles.inputweb}
              placeholder="(DD) 99999-9999"
              required
            />
          </div>
          <div style={styles.formRow}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.inputweb}
              placeholder="E-mail"
              required
            />
          </div>
          <div style={styles.formRow}>
            <label htmlFor="password">Senha</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.inputweb}
                placeholder="Senha"
                required
              />
              <span
                style={styles.eyeIconweb}
                onClick={() => setShowPassword(!showPassword)}>
                👁️
              </span>
            </div>
            <span style={styles.passwordFeedback}>
              {password
                ? isStrongPassword(password)
                  ? 'Senha forte'
                  : 'Senha fraca'
                : ''}
            </span>
          </div>
          <div style={styles.formRow}>
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              style={styles.checkbox}
              required
            />
            <label htmlFor="terms" style={styles.termsLabel}>
              Aceito os{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Termos de uso');
                }}>
                termos de uso e condições
              </a>
            </label>
          </div>
          <button type="submit" style={styles.button}>
            Cadastrar
          </button>
        </form>
      </main>

      <footer style={styles.footerweb}>
        <p>© DelBicos - 2025 - Todos os direitos reservados.</p>
      </footer>
    </View>
  );
};

export default RegisterScreen;
