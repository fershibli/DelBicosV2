import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoV3 from '@assets/LogoV3.png';
import { createStyles } from './styles';
import { HTTP_DOMAIN } from '@config/varEnvs';
import { useUserStore } from '@stores/User';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { Address } from '@stores/User/types';
import { useColors } from '@theme/ThemeProvider';
import {
  checkForNewNotifications,
  setupNotifications,
} from '@utils/usePushNotifications';

function VerificationScreen() {
  const navigation = useNavigation();
  const {
    verificationEmail: email,
    setVerificationEmail,
    setLoggedInUser,
  } = useUserStore();

  const colors = useColors();
  const styles = createStyles(colors);
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleTextChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    if (newCode.every((digit) => digit !== '')) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      Alert.alert(
        'Código Inválido',
        'Por favor, insira o código de 6 dígitos.',
      );
      return;
    }

    if (!email) {
      Alert.alert('Erro', 'Sessão inválida. Por favor, retorne ao cadastro.');
      navigation.navigate('Register');
      return;
    }

    setIsLoading(true);
    try {
      const response = await backendHttpClient.post(
        `${HTTP_DOMAIN}/auth/verify`,
        {
          email,
          code: fullCode,
        },
      );
      const data = response.data;

      if (response.status === 200) {
        const { token, user } = data;
        if (!token || !user) {
          throw new Error('Resposta de verificação inválida do servidor.');
        }

        const addressData: Address | null = user.address
          ? {
              id: user.address.id,
              lat: user.address.lat,
              lng: user.address.lng,
              street: user.address.street,
              number: user.address.number,
              complement: user.address.complement,
              neighborhood: user.address.neighborhood,
              city: user.address.city,
              state: user.address.state,
              country_iso: user.address.country_iso,
              postal_code: user.address.postal_code,
            }
          : null;

        setLoggedInUser({
          token,
          user: {
            id: user.id,
            client_id: user.client_id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            cpf: user.cpf,
            avatar_uri: user.avatar_uri,
          },
          address: addressData,
        });

        Alert.alert('Sucesso!', 'Sua conta foi verificada com sucesso.');
        setVerificationEmail(null);

        // Verificar imediatamente por notificações de boas-vindas (sem logs)
        setTimeout(async () => {
          try {
            await checkForNewNotifications(
              user.id.toString(),
              new Date(Date.now() - 60000), // Últimos 60 segundos
              false, // Sem logs
            );
          } catch {
            // Silencioso
          }
        }, 2000);

        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Erro na Verificação',
          data.error || 'Ocorreu um problema.',
        );
      }
    } catch (error: any) {
      console.error('Erro ao verificar código:', error);
      if (error.response) {
        Alert.alert(
          'Erro na Verificação',
          error.response.data.error || 'Ocorreu um problema.',
        );
      } else {
        Alert.alert('Erro de Conexão', 'Não foi possível verificar o código.');
      }
    } finally {
      setIsLoading(false);
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

        <View style={styles.card}>
          <Text style={styles.title}>Verifique seu E-mail</Text>
          <Text style={styles.subtitle}>
            Enviamos um código de 6 dígitos para{' '}
            <Text style={styles.emailText}>{email}</Text>.
          </Text>

          <View style={styles.codeInputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                style={styles.codeInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleTextChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleVerify}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color={colors.primaryWhite} />
            ) : (
              <Text style={styles.buttonText}>Verificar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default VerificationScreen;
