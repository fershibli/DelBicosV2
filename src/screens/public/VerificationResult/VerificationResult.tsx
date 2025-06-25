import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { styles } from './styles';
import VLibrasComponent from '@components/Vlibras/VLibrasComponent';

type VerificationResultRouteProps = {
  params: {
    isSuccess: boolean;
  };
};

function VerificationResult({
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
      <VLibrasComponent />
    </View>
  );
}

export default VerificationResult;
