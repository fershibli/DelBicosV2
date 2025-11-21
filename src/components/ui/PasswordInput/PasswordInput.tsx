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
import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types';

interface PasswordInputProps extends TextInputProps {
  error?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ error, ...props }) => {
  const [visible, setVisible] = useState(false);
  const { theme } = useThemeStore();
  const isHighContrast = theme === ThemeMode.LIGHT_HI_CONTRAST;

  return (
    <View
      style={[
        styles.container,
        error && styles.inputError,
        isHighContrast && {
          borderWidth: 2,
          borderColor: colors.primaryBlack,
        },
      ]}>
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
