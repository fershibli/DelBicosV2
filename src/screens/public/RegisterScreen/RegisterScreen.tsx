import React, { useEffect, useState } from 'react';
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
  Platform,
} from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useLocation } from '@lib/hooks/LocationContext';
import CustomTextInput from '@components/ui/CustomTextInput';
import CpfInput from '@components/ui/CpfInput';
import DateInput from '@components/ui/DateInput';
import { createStyles } from './styles';
import { createInputBaseStyle } from '@components/ui/CustomTextInput/styles';
import { isValidCPF } from '../../../utils/validators';
import LogoV3 from '@assets/LogoV3.png';
import { useUserStore } from '@stores/User';
import PhoneInput from '@components/ui/PhoneInput';
import { useColors } from '@theme/ThemeProvider';

type FormData = {
  name: string;
  surname: string;
  birthDate: string;
  cpf: string;
  location: string;
  email: string;
  phone: string;
  password: string;
  acceptTerms: boolean;
};

function RegisterScreen() {
  const navigation = useNavigation();
  const { setLocation: updateLocationInContext } = useLocation();
  const [isLocationLoading, setLocationLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTimeoutError, setIsTimeoutError] = useState(false);
  const { setVerificationEmail, registerUser } = useUserStore();

  const colors = useColors();
  const inputBaseStyle = createInputBaseStyle(colors);
  const styles = createStyles(colors);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      surname: '',
      birthDate: '',
      cpf: '',
      location: '',
      email: '',
      phone: '',
      password: '',
      acceptTerms: false,
    },
  });

  const handleUseLocation = async () => {
    setLocationLoading(true);
    setTimeout(() => {
      setIsTimeoutError(true);
    }, 7000);
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
    setIsSubmitting(true);
    try {
      await registerUser(formData);
      Alert.alert(
        'Quase lá!',
        'Enviamos um código de verificação para o seu e-mail.',
      );
      setVerificationEmail(formData.email);
      navigation.navigate('VerificationScreen');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro no Cadastro', error.message);
      } else {
        console.error('Erro ao conectar com o servidor:', error);
        Alert.alert(
          'Erro de Conexão',
          'Não foi possível se conectar ao servidor.',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isTimeoutError && isLocationLoading) {
      setLocationLoading(false);
      Platform.select({
        web: () => {
          alert(
            'Serviço de Localização Indisponível.\n Tente novamente mais tarde.',
          );
        },
        default: () => {
          Alert.alert(
            'Serviço de Localização Indisponível',
            'Tente novamente mais tarde.',
          );
        },
      })();
      setIsTimeoutError(false);
    }
  }, [isTimeoutError, isLocationLoading]);

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
            render={({ field: { value } }) => (
              <CustomTextInput label="Localização" error={errors.location}>
                <View style={styles.locationContainer}>
                  <TextInput
                    style={[
                      inputBaseStyle.input,
                      styles.locationInput,
                      errors.location && inputBaseStyle.inputError,
                    ]}
                    placeholder="Clique no ícone para buscar"
                    placeholderTextColor={colors.textTertiary}
                    value={value}
                    editable={false}
                  />
                  <TouchableOpacity
                    style={styles.locationButton}
                    onPress={handleUseLocation}
                    disabled={isLocationLoading}>
                    {isLocationLoading ? (
                      <ActivityIndicator />
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
            name="phone"
            rules={{
              required: 'O telefone é obrigatório',
              minLength: {
                value: 10,
                message: 'Telefone inválido',
              },
              maxLength: {
                value: 11,
                message: 'Telefone inválido',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput label="Telefone" error={errors.phone}>
                <PhoneInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!errors.phone}
                />
              </CustomTextInput>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'A senha é obrigatória',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput label="Senha" error={errors.password}>
                <View
                  style={[
                    styles.passwordContainer,
                    errors.password && styles.passwordContainerError,
                  ]}>
                  <TextInput
                    style={[inputBaseStyle.input, styles.passwordInput]}
                    placeholder="Crie uma senha forte"
                    placeholderTextColor={colors.textTertiary}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={!passwordVisible}
                    onSubmitEditing={handleSubmit(handleRegister)}
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
            style={[
              styles.button,
              (!isValid || isSubmitting) && styles.buttonDisabled,
            ]}
            onPress={handleSubmit(handleRegister)}
            disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator color={colors.primaryWhite} />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
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
