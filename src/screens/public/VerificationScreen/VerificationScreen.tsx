// src/screens/public/VerificationScreen/VerificationScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './styles';

function VerificationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  // Recebendo o e-mail que foi passado como parâmetro da tela de registro
  const { email } = route.params as { email: string };

  const [code, setCode] = useState('');

  const handleVerify = async () => {
    if (code.length !== 6) {
      Alert.alert(
        'Código Inválido',
        'Por favor, insira o código de 6 dígitos.',
      );
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }), // Envia e-mail e código
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso!', 'Sua conta foi verificada com sucesso.');
        // Navega para a tela Home (ou Login) após o sucesso
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Erro na Verificação',
          data.error || 'Ocorreu um problema.',
        );
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
      Alert.alert('Erro de Conexão', 'Não foi possível verificar o código.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifique seu E-mail</Text>
      <Text style={styles.subtitle}>
        Enviamos um código de 6 dígitos para{' '}
        <Text style={styles.email}>{email}</Text>.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="______"
        placeholderTextColor="#888"
        keyboardType="number-pad"
        maxLength={6}
        value={code}
        onChangeText={setCode}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verificar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default VerificationScreen;
