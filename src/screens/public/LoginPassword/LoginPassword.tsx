//create a login screen with a password input and a login button
// use the same structure as the LocationOptions component
// use the same styles as the LocationOptions component
// provide a callback for the login button press
// create a password input with a placeholder "Enter your password"
// create a login button with the text "Login"
// create a login input with a placeholder "Email Login"
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

interface LoginPasswordProps {
  onLoginPress: (password: string) => void;
  onEmailLoginPress: (email: string) => void;
}

export const LoginPassword: React.FC<LoginPasswordProps> = ({
  onLoginPress,
  onEmailLoginPress,
}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Email Login"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={() => onLoginPress(password)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
