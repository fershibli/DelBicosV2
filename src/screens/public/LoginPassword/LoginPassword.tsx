import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

import { useUserStore } from '@stores/User';
import CustomTextInput from '@components/CustomTextInput';

// @ts-ignore
import IconPerson from '@assets/person.svg';
// @ts-ignore
import IconPhone from '@assets/phone.svg';
import LogoV3 from '@assets/LogoV3.png';

import { styles } from './styles';
import colors from '@theme/colors';

type FormData = {
  email: string;
  password: string;
};

export const LoginPassword = () => {
  const navigation = useNavigation();
  const { signInPassword } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  });

  const onLoginPress = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorModalVisible(false);
    try {
      await signInPassword(data.email, data.password);
      navigation.navigate('Feed');
    } catch (error: any) {
      setErrorMessage(
        error.message || 'Ocorreu um erro ao tentar fazer login.',
      );
      setErrorModalVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={LogoV3} style={styles.logo} />
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.subtitle}>Acesse sua conta para continuar.</Text>

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'O e-mail é obrigatório.',
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
              required: 'A senha é obrigatória.',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="Senha"
                placeholder="Sua senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.password}
                secureTextEntry
              />
            )}
          />

          <TouchableOpacity
            style={[
              styles.button,
              (!isValid || isSubmitting) && styles.buttonDisabled,
            ]}
            onPress={handleSubmit(onLoginPress)}
            disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator color={colors.primaryWhite} />
            ) : (
              <Text style={styles.buttonText}>
                <IconPerson
                  width={16}
                  height={16}
                  color={colors.primaryWhite}
                  style={{ marginRight: 8 }}
                />{' '}
                Login
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => navigation.navigate('PhoneConfirmation')}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
              <IconPhone
                width={16}
                height={16}
                stroke="#003366"
                style={{ marginRight: 8 }}
              />{' '}
              Login por Telefone
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>
              Não tem uma conta?{' '}
              <Text style={styles.linkTextBold}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>

      <Modal
        animationType="fade"
        visible={errorModalVisible}
        onRequestClose={() => setErrorModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Erro no Login</Text>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableOpacity
              style={[styles.button, styles.modalButton]}
              onPress={() => setErrorModalVisible(false)}>
              <Text style={styles.buttonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
