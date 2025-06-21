import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { styles } from './styles';

// @ts-ignore
import IconPerson from '@assets/person.svg';
import { useUserStore } from '@stores/User';

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

      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={() => onLoginPress(email, password)}>
        <Image source={IconPerson} width={21} height={29} />
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
