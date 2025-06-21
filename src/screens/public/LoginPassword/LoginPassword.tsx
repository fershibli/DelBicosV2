import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { styles } from './styles';

// @ts-ignore
import IconPerson from '@assets/person.svg';
import { useUserStore } from '@stores/User';
import LogoV3 from '@assets/LogoV3.png';
import { Button } from '@components/Button';

export const LoginPassword = () => {
  //navigation
  const navigation = useNavigation();
  const { signIn } = useUserStore();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onLoginPress = (email: string, password: string) => {
    signIn();
    navigation.navigate('Feed');
    // if (email && password) {
    //   signIn(email, password);
    // } else {
    //   console.warn('Please enter both email and password');
    // }
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
            startIcon={<Image source={IconPerson} width={21} height={29} />}>
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
