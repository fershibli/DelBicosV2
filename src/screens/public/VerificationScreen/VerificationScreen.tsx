import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoV3 from '@assets/LogoV3.png';
import { createStyles } from './styles';
import { HTTP_DOMAIN } from '@config/varEnvs';
import { useUserStore } from '@stores/User';
import { backendHttpClient } from '@lib/helpers/httpClient';
import { Address } from '@stores/User/types';
import { useColors } from '@theme/ThemeProvider';
import { checkForNewNotifications } from '@utils/usePushNotifications';
import { FeedbackModal } from '@components/ui/FeedbackModal/FeedbackModal';
import { AuthService } from '@services/AuthService';

function VerificationScreen() {
  const navigation = useNavigation();
  const {
    verificationEmail: email,
    setVerificationEmail,
    setLoggedInUser,
    lastCodeSentAt,
    recordCodeSent,
  } = useUserStore();

  const colors = useColors();
  const styles = createStyles(colors);

  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const COOLDOWN_SECONDS = 60;

  const calculateRemainingTime = useCallback(() => {
    if (!lastCodeSentAt) return 0;
    const now = Date.now();
    const diffSeconds = Math.floor((now - lastCodeSentAt) / 1000);
    const remaining = COOLDOWN_SECONDS - diffSeconds;
    return remaining > 0 ? remaining : 0;
  }, [lastCodeSentAt]);

  const [timer, setTimer] = useState(calculateRemainingTime());

  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    type: 'info' as 'success' | 'error' | 'info',
    title: '',
    message: '',
    onClose: () => setFeedbackVisible(false),
  });

  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      const remaining = calculateRemainingTime();
      setTimer(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastCodeSentAt, timer, calculateRemainingTime]);

  const handleTextChange = (text: string, index: number) => {
    if (text.length > 1) {
      const pastedCode = text.slice(0, 6).split('');
      const newCode = [...code];

      pastedCode.forEach((char, i) => {
        if (index + i < 6) {
          newCode[index + i] = char;
        }
      });

      setCode(newCode);

      const nextIndex = Math.min(index + pastedCode.length, 5);
      inputs.current[nextIndex]?.focus();

      if (newCode.every((digit) => digit !== '')) {
        Keyboard.dismiss();
      }
      return;
    }

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

  const showFeedback = (
    type: 'success' | 'error',
    title: string,
    message: string,
    action?: () => void,
  ) => {
    setFeedbackData({
      type,
      title,
      message,
      onClose: () => {
        setFeedbackVisible(false);
        if (action) action();
      },
    });
    setFeedbackVisible(true);
  };

  const handleResendCode = async () => {
    if (timer > 0) return;

    if (!email) {
      showFeedback('error', 'Erro', 'Sessão expirada.', () =>
        navigation.navigate('Register'),
      );
      return;
    }

    setIsResending(true);

    try {
      await AuthService.resendCode(email);

      recordCodeSent();
      setTimer(60);
      showFeedback(
        'success',
        'Código Reenviado',
        `Um novo código foi enviado para ${email}. Verifique sua caixa de entrada e spam.`,
      );

      setCode(Array(6).fill(''));
      inputs.current[0]?.focus();
    } catch (error: any) {
      console.error('Erro no reenvio:', error);

      if (error.response?.status === 404) {
        showFeedback(
          'error',
          'Sessão Expirada',
          'Seu cadastro temporário expirou. Por favor, preencha seus dados novamente.',
          () => navigation.navigate('Register'),
        );
      } else {
        const msg =
          error.response?.data?.error || 'Não foi possível reenviar o código.';
        showFeedback('error', 'Erro', msg);
      }
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      showFeedback(
        'error',
        'Código Inválido',
        'Por favor, insira o código de 6 dígitos.',
      );
      return;
    }

    if (!email) {
      showFeedback(
        'error',
        'Sessão Expirada',
        'Por favor, inicie o cadastro novamente.',
        () => navigation.navigate('Register'),
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await backendHttpClient.post(
        `${HTTP_DOMAIN}/auth/verify`,
        { email, code: fullCode },
      );
      const data = response.data;

      if (response.status === 200) {
        const { token, user } = data;
        if (!token || !user) throw new Error('Resposta inválida do servidor.');

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

        setVerificationEmail(null);

        setTimeout(() => {
          checkForNewNotifications(
            user.id.toString(),
            new Date(Date.now() - 60000),
            false,
          ).catch(() => {});
        }, 2000);

        showFeedback(
          'success',
          'Sucesso!',
          'Sua conta foi verificada com sucesso.',
          () => navigation.navigate('Home'),
        );
      }
    } catch (error: any) {
      console.error('Erro ao verificar:', error);
      const msg =
        error.response?.data?.error || 'Não foi possível verificar o código.';
      showFeedback('error', 'Erro na Verificação', msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!email) {
      navigation.navigate('Register');
    }
  }, [email, navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={LogoV3} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.title}>Verifique seu E-mail</Text>
          <Text style={styles.subtitle}>
            Enviamos um código para{' '}
            <Text style={styles.emailText}>{email}</Text>.
          </Text>

          <View style={styles.codeInputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                style={[
                  styles.codeInput,
                  digit ? styles.codeInputFilled : null,
                ]}
                keyboardType="number-pad"
                maxLength={index === 0 ? 6 : 1}
                value={digit}
                onChangeText={(text) => handleTextChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                selectTextOnFocus
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

          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendCode}
            disabled={timer > 0 || isResending}>
            <Text
              style={[
                styles.resendText,
                timer > 0 && styles.resendTextDisabled,
              ]}>
              {isResending
                ? 'Reenviando...'
                : timer > 0
                  ? `Reenviar código em ${timer}s`
                  : 'Reenviar código'}
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
    </View>
  );
}

export default VerificationScreen;
