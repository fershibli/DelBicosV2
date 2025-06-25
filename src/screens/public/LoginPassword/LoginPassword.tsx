import React, { useState } from 'react';
import { View, TextInput, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal } from '@mui/material';

import { Button } from '@components/Button';
import { useUserStore } from '@stores/User';

// @ts-ignore
import IconPerson from '@assets/person.svg';
// @ts-ignore
import IconPhone from '@assets/phone.svg';
import LogoV3 from '@assets/LogoV3.png';

import { styles } from './styles';
import VLibrasComponent from '@components/Vlibras/VLibrasComponent';

export const LoginPassword = () => {
  //navigation
  const navigation = useNavigation();
  const { signInPassword } = useUserStore();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLoginPress = async (email: string, password: string) => {
    setIsLoading(true);
    if (email && password) {
      await signInPassword(email, password)
        .then(() => {
          setEmail('');
          setPassword('');
          setError(null);
          navigation.navigate('Feed');
        })
        .catch((error) => {
          setError(error.message);
        });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError('Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.wrapper}>
          <Image source={LogoV3} style={styles.logo} />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button
            colorVariant="primary"
            sizeVariant="largePill"
            fontVariant="AfacadRegular20"
            onClick={() => onLoginPress(email, password)}
            style={styles.buttonLogin}
            loading={isLoading}
            startIcon={<IconPerson width={21} height={29} color="#ffffff" />}>
            Login
          </Button>
          <Button
            colorVariant="primaryWhite"
            sizeVariant="largePill"
            fontVariant="AfacadRegular20"
            onClick={() => navigation.navigate('PhoneConfirmation')}
            style={styles.buttonLogin}
            startIcon={<IconPhone width={21} height={29} stroke="#000000" />}>
            Login por Telefone
          </Button>
        </View>
      </ScrollView>
      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
      <VLibrasComponent />
      <Modal
        open={!!error}
        onClose={() => setError(null)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text id="modal-title" style={styles.modalTitle}>
            Erro
          </Text>
          <Text id="modal-description" style={styles.modalText}>
            {error || 'Ocorreu um erro ao tentar fazer login.'}
          </Text>
          <View style={styles.modalActions}>
            <Button
              colorVariant="primary"
              sizeVariant="medium"
              onClick={() => setError(null)}>
              Fechar
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};
