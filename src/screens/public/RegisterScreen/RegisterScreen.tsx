import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Switch,
  ActivityIndicator,
  TextInput,
  Image,
} from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useLocation } from '@lib/hooks/LocationContext';
import CustomTextInput from '@components/CustomTextInput';
import CpfInput from '@components/CpfInput';
import DateInput from '@components/DateInput';
import { styles } from './styles';
import { HTTP_DOMAIN } from '@config/varEnvs';
import { isValidCPF } from '../../../utils/validators';
import LogoV3 from '@assets/LogoV3.png';
import { useUserStore } from '@stores/User';
import colors from '@theme/colors';

type FormData = {
  name: string;
  surname: string;
  birthDate: string;
  cpf: string;
  location: string;
  email: string;
  password: string;
  acceptTerms: boolean;
};

function RegisterScreen() {
  const navigation = useNavigation();
  const { setLocation: updateLocationInContext } = useLocation();
  const [isLocationLoading, setLocationLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setVerificationEmail } = useUserStore();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      surname: '',
      birthDate: '',
      cpf: '',
      location: '',
      email: '',
      password: '',
      acceptTerms: false,
    },
  });

  const handleUseLocation = async () => {
    setLocationLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Não foi possível acessar sua localização.',
      );
      setLocationLoading(false);
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
        const { city, state, town, village, municipality } = data.address;
        const cityName = city || town || village || municipality || '';
        const stateName = state || '';
        const newLocation = `${cityName}, ${stateName}`;
        setValue('location', newLocation, { shouldValidate: true });
        updateLocationInContext(cityName, stateName);
      } else {
        Alert.alert('Erro', 'Endereço não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao buscar sua localização.');
    } finally {
      setLocationLoading(false);
    }
  };

  const handleRegister = async (formData: FormData) => {
    try {
      const response = await fetch(`${HTTP_DOMAIN}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert(
          'Quase lá!',
          'Enviamos um código de verificação para o seu e-mail.',
        );
        setVerificationEmail(formData.email);
        navigation.navigate('VerificationScreen');
      } else {
        Alert.alert('Erro no Cadastro', data.error || 'Ocorreu um problema.');
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
      Alert.alert(
        'Erro de Conexão',
        'Não foi possível se conectar ao servidor.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={LogoV3} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.subtitle}>
            Preencha os campos abaixo para começar.
          </Text>

          <View style={styles.row}>
            <View style={styles.col}>
              <Controller
                control={control}
                name="name"
                rules={{ required: 'O nome é obrigatório' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    label="Nome"
                    placeholder="Seu nome"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.name}
                  />
                )}
              />
            </View>
            <View style={styles.col}>
              <Controller
                control={control}
                name="surname"
                rules={{ required: 'O sobrenome é obrigatório' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput
                    label="Sobrenome"
                    placeholder="Seu sobrenome"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.surname}
                  />
                )}
              />
            </View>
          </View>

          <Controller
            control={control}
            name="birthDate"
            rules={{
              required: 'Data de nascimento é obrigatória.',
              pattern: {
                value: /^\d{2}\/\d{2}\/\d{4}$/,
                message: 'Use o formato DD/MM/AAAA.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                label="Data de Nascimento"
                error={errors.birthDate}>
                <DateInput value={value} onChangeText={onChange} />
              </CustomTextInput>
            )}
          />

          <Controller
            control={control}
            name="cpf"
            rules={{
              required: 'O CPF é obrigatório',
              validate: (value) => isValidCPF(value) || 'CPF inválido',
            }}
            render={({ field: { onChange, value } }) => (
              <CustomTextInput label="CPF" error={errors.cpf}>
                <CpfInput
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.cpf}
                />
              </CustomTextInput>
            )}
          />

          <Controller
            control={control}
            name="location"
            rules={{ required: 'A localização é obrigatória' }}
            render={({ field: { value } }) => (
              <CustomTextInput label="Localização" error={errors.location}>
                <View style={styles.locationContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.locationInput,
                      errors.location && styles.inputError,
                    ]}
                    placeholder="Clique no ícone para buscar"
                    value={value}
                    editable={false}
                  />
                  <TouchableOpacity
                    style={styles.locationButton}
                    onPress={handleUseLocation}
                    disabled={isLocationLoading}>
                    {isLocationLoading ? (
                      <ActivityIndicator color={colors.primaryWhite} />
                    ) : (
                      <Text style={styles.locationButtonText}>📍</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </CustomTextInput>
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'O e-mail é obrigatório',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Digite um e-mail válido.',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="E-mail"
                placeholder="seu@email.com"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'A senha é obrigatória',
              minLength: {
                value: 6,
                message: 'A senha deve ter no mínimo 6 caracteres',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput label="Senha" error={errors.password}>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      errors.password && styles.inputError,
                    ]}
                    placeholder="Crie uma senha forte"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={!passwordVisible}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Text style={styles.eyeIcon}>
                      {passwordVisible ? '👁️' : '👁️‍🗨️'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </CustomTextInput>
            )}
          />

          <Controller
            control={control}
            name="acceptTerms"
            rules={{
              validate: (value) =>
                value === true || 'Você deve aceitar os termos de uso.',
            }}
            render={({ field: { onChange, value } }) => (
              <View>
                <View style={styles.termsContainer}>
                  <Switch
                    value={value}
                    onValueChange={onChange}
                    trackColor={{ false: '#767577', true: '#ffbf00' }}
                    thumbColor={value ? '#ff7f00' : '#f4f3f4'}
                  />
                  <Text style={styles.termsText}>
                    Aceito os <Text style={styles.linkText}>termos de uso</Text>{' '}
                    e <Text style={styles.linkText}>condições</Text>
                  </Text>
                </View>
                {errors.acceptTerms && (
                  <Text
                    style={[
                      styles.errorText,
                      { textAlign: 'center', marginBottom: 10 },
                    ]}>
                    {errors.acceptTerms.message}
                  </Text>
                )}
              </View>
            )}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleRegister)}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>
              Já tem uma conta?{' '}
              <Text style={styles.linkTextBold}>Faça login</Text>
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

export default RegisterScreen;
