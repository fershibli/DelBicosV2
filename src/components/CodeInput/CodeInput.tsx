import React, { useEffect, useRef } from 'react';
import { View, TextInput } from 'react-native';
import { styles } from './styles';

interface CodeInputProps {
  verificationCode: string[];
  setVerificationCode: React.Dispatch<React.SetStateAction<string[]>>;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({
  verificationCode,
  setVerificationCode,
  focusedIndex,
  setFocusedIndex,
}) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...verificationCode];
    newCode[index] = text.slice(0, 1);
    setVerificationCode(newCode);
    if (text && index < 3) setFocusedIndex(index + 1);
  };

  const handleKeyPress = (e: any, index: number) => {
    if (
      e.nativeEvent.key === 'Backspace' &&
      !verificationCode[index] &&
      index > 0
    ) {
      setFocusedIndex(index - 1);
    }
  };

  useEffect(() => {
    if (inputRefs.current[focusedIndex]) {
      inputRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  return (
    <View style={styles.codeContainer}>
      {verificationCode.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          style={styles.codeInput}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="numeric"
          maxLength={1}
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
};

export default CodeInput;
