import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import CpfInput from '@components/CpfInput';
import DateInput from '@components/DateInput';
import { useLocation } from '@lib/hooks/LocationContext';
import { styles } from './styles';

function RegisterScreen() {
  const navigation = useNavigation();
  // const { setLocation: updateLocation } = useLocation();
  const { setLocation: updateLocationInContext } = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    birthDate: '',
    cpf: '',
    location: '',
    email: '',
    password: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Função para atualizar o estado do formulário de forma centralizada
  // Para poder comprimir código e deixá-lo mais enxuto, tendo o mesmo resultado.
  const handleInputChange = (field: string | number, value: any) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    }
  };

  const handleUseLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Não foi possível acessar sua localização',
      );
      return;
    }

    try {
      const locationData = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationData.coords;

      // --- API do OpenStreetMap (Nominatim) alternativa para o GeoCoding API (precisa de cartão de crédito cadastrado) ---
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      );

      const data = await response.json();

      if (data && data.address) {
        // A estrutura da resposta do Nominatim é diferente da do Google
        // Verificar documentação caso necessário
        const { city, state, town, village } = data.address;

        // A cidade pode vir em campos diferentes dependendo da localidade
        const cityName = city || town || village || '';
        const stateName = state || '';

        const newLocation = `${cityName}, ${stateName}`;

        // Atualiza o estado do formulário e o contexto
        handleInputChange('location', newLocation);
        updateLocationInContext(cityName, stateName);
      } else {
        Alert.alert('Erro', 'Endereço não encontrado para esta localização.');
      }
    } catch (error) {
      console.error('Erro ao obter localização ou endereço:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao buscar sua localização.');
    }
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    const {
      name,
      surname,
      birthDate,
      cpf,
      location,
      email,
      password,
      acceptTerms,
    } = formData;

    // Validação de campos obrigatórios
    if (!name.trim()) newErrors.name = 'O nome é obrigatório';
    if (!surname.trim()) newErrors.surname = 'O sobrenome é obrigatório';
    if (!birthDate.trim())
      newErrors.birthDate = 'A data de nascimento é obrigatória';
    if (!cpf.trim()) newErrors.cpf = 'O CPF é obrigatório';
    if (!location.trim()) newErrors.location = 'A localização é obrigatória';
    if (!email.trim()) newErrors.email = 'O e-mail é obrigatório';
    if (!password) newErrors.password = 'A senha é obrigatória';

    // Validação de formato de e-mail
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Digite um e-mail válido.';
    }

    // Validação da data de nascimento (exemplo simples)
    if (birthDate && !/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate)) {
      newErrors.birthDate = 'Use o formato DD/MM/AAAA.';
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos de uso.';
    }

    setErrors(newErrors);
    // Retorna true se o objeto de erros estiver vazio
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateFields()) {
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Cadastre-se</Text>

        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Nome"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <TextInput
          style={[styles.input, errors.surname && styles.inputError]}
          placeholder="Sobrenome"
          value={formData.surname}
          onChangeText={(value) => handleInputChange('surname', value)}
        />
        {errors.surname && (
          <Text style={styles.errorText}>{errors.surname}</Text>
        )}

        <DateInput
          value={formData.birthDate}
          onChangeText={(value) => handleInputChange('birthDate', value)}
        />
        {errors.birthDate && (
          <Text style={styles.errorText}>{errors.birthDate}</Text>
        )}

        <CpfInput
          value={formData.cpf}
          onChangeText={(value) => handleInputChange('cpf', value)}
        />
        {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}

        <View style={styles.locationContainer}>
          <TextInput
            style={[
              styles.input,
              styles.locationInput,
              errors.location && styles.inputError,
            ]}
            placeholder="Localização"
            value={formData.location}
            editable={false}
          />
          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleUseLocation}>
            <Text style={styles.buttonText}>📍</Text>
          </TouchableOpacity>
        </View>
        {errors.location && (
          <Text style={styles.errorText}>{errors.location}</Text>
        )}

        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="E-mail"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              styles.passwordInput,
              errors.password && styles.inputError,
            ]}
            placeholder="Senha"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Text style={styles.eyeIcon}>{passwordVisible ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <View style={styles.termsContainer}>
          <Switch
            value={formData.acceptTerms}
            onValueChange={(value) => handleInputChange('acceptTerms', value)}
            // ... trackColor e thumbColor
          />
          <Text style={styles.termsText}>
            Aceito os termos de uso e condições
          </Text>
        </View>
        {errors.acceptTerms && (
          <Text style={styles.errorText}>{errors.acceptTerms}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
    </View>
  );
}

export default RegisterScreen;
