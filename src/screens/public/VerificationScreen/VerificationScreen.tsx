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
import { styles } from './styles';
import { HTTP_DOMAIN } from '@config/varEnvs';
import { useUserStore } from '@stores/User';
import colors from '@theme/colors';

function VerificationScreen() {
  const navigation = useNavigation();
  const { verificationEmail: email, setVerificationEmail } = useUserStore();

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

    setIsLoading(true);
    try {
      const response = await fetch(`${HTTP_DOMAIN}/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: fullCode }),
      });
      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso!', 'Sua conta foi verificada com sucesso.');
        setVerificationEmail(null);
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Erro na Verificação',
          data.error || 'Ocorreu um problema.',
        );
      }
      if (!email) {
        return (
          <View style={styles.container}>
            <Text>Sessão inválida. Por favor, retorne ao cadastro.</Text>
          </View>
        );
      }
    } catch {
      Alert.alert('Erro de Conexão', 'Não foi possível verificar o código.');
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
