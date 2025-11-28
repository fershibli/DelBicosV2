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
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
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
import { AddressForm, AddressFormData } from '@components/features/AddressForm';
import { HTTP_DOMAIN } from '@config/varEnvs';
import { FeedbackModal } from '@components/ui/FeedbackModal/FeedbackModal';

type RegisterFormData = {
  name: string;
  surname: string;
  birthDate: string;
  cpf: string;
  location: string;
  email: string;
  phone: string;
  password: string;
  acceptTerms: boolean;
} & AddressFormData;

function RegisterScreen() {
  const navigation = useNavigation();
  const [isLocationLoading, setLocationLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTimeoutError, setIsTimeoutError] = useState(false);
  const { setVerificationEmail } = useUserStore();
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    type: 'info' as 'success' | 'error' | 'info',
    title: '',
    message: '',
    onClose: () => setFeedbackVisible(false),
  });

  const colors = useColors();
  const inputBaseStyle = createInputBaseStyle(colors);
  const styles = createStyles(colors);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    mode: 'onChange',
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
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  });

  const handleRegister = async (formData: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        cpf: formData.cpf,
        birthDate: formData.birthDate,
        address: {
          postal_code: formData.cep,
          street: formData.street,
          number: formData.number,
          complement: formData.complement,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
          country_iso: 'BR',
        },
      };

      const response = await fetch(`${HTTP_DOMAIN}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationEmail(formData.email);

        setFeedbackData({
          type: 'success',
          title: 'Quase lá!',
          message: `Enviamos um código de verificação para ${formData.email}. Verifique sua caixa de entrada.`,
          onClose: () => {
            setFeedbackVisible(false);
            navigation.navigate('VerificationScreen');
          },
        });
        setFeedbackVisible(true);
      } else {
        const errorMessage =
          data.error || 'Ocorreu um problema ao realizar o cadastro.';

        setFeedbackData({
          type: 'error',
          title: 'Erro no Cadastro',
          message: errorMessage,
          onClose: () => setFeedbackVisible(false),
        });
        setFeedbackVisible(true);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      setFeedbackData({
        type: 'error',
        title: 'Erro de Conexão',
        message:
          'Não foi possível se conectar ao servidor. Verifique sua internet.',
        onClose: () => setFeedbackVisible(false),
      });
      setFeedbackVisible(true);
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

          {/* --- Campos Pessoais --- */}
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
              minLength: { value: 10, message: 'Data incompleta' },
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

          <AddressForm control={control} errors={errors} setValue={setValue} />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'A senha é obrigatória',
              minLength: { value: 6, message: 'Mínimo 6 caracteres' },
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

      <FeedbackModal
        visible={feedbackVisible}
        type={feedbackData.type}
        title={feedbackData.title}
        message={feedbackData.message}
        onClose={feedbackData.onClose}
      />

      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
    </View>
  );
}

export default RegisterScreen;
