import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { RouteProp } from '@react-navigation/native';

type VerificationResultRouteProps = {
  params: {
    isSuccess: boolean;
  };
};

export function VerificationResult({
  route,
}: {
  route: RouteProp<VerificationResultRouteProps, 'params'>;
}) {
  const { isSuccess } = route.params || { isSuccess: false };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          { backgroundColor: isSuccess ? '#003366' : '#ff4444' },
        ]}>
        <Text style={styles.message}>
          {isSuccess
            ? 'Código enviado com sucesso!'
            : 'Erro na verificação do código.'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('Continuar após resultado')}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  messageBox: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ff7f00',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    fontSize: 12,
    color: '#003366',
  },
});
