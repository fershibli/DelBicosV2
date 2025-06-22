import React, { useState } from 'react';
import { View, TextInput, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '@components/Button';
import { useUserStore } from '@stores/User';

// @ts-ignore
import IconPerson from '@assets/person.svg';
import LogoV3 from '@assets/LogoV3.png';

import { styles } from './styles';

export const LoginPassword = () => {
  //navigation
  const navigation = useNavigation();
  const { signInPassword } = useUserStore();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onLoginPress = async (email: string, password: string) => {
    setIsLoading(true);
    if (email && password) {
      await signInPassword(email, password);
      setIsLoading(false);
      navigation.navigate('Feed');
    } else {
      setIsLoading(false);
      console.warn('Please enter both email and password');
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
        </View>
      </ScrollView>
      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
    </View>
  );
};
