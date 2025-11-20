import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  TextInputProps,
} from 'react-native';
import EyeOpen from '@assets/eye-open.png';
import EyeOff from '@assets/eye-off.png';
import { styles } from './styles';
import colors from '@theme/colors';

interface PasswordInputProps extends TextInputProps {
  error?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ error, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.container, error && styles.inputError]}>
      <TextInput
        style={styles.input}
        secureTextEntry={!visible}
        placeholderTextColor={colors.textTertiary}
        {...props}
      />
      <TouchableOpacity
        style={styles.eyeButton}
        onPress={() => setVisible(!visible)}>
        <Image source={visible ? EyeOpen : EyeOff} style={styles.eyeIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
