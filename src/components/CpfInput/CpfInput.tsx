import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Alert } from 'react-native';
import { styles } from './styles';

interface CpfInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const CpfInput: React.FC<CpfInputProps> = ({ value, onChangeText }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [formattedCpf, setFormattedCpf] = useState(value);

  const isValidCPF = (cpfValue: string) => {
    const cleanCpf = cpfValue.replace(/[^\d]/g, '');
    if (cleanCpf.length !== 11 || /^(\d)\1{10}$/.test(cleanCpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCpf.substring(10, 11))) return false;

    return true;
  };

  const formatCpf = (text: string) => {
    const cleanText = text.replace(/[^\d]/g, '');
    if (cleanText.length > 11) return formattedCpf;
    let formatted = cleanText.replace(/(\d{3})(\d)/, '$1.$2');
    formatted = formatted.replace(/(\d{3})(\d)/, '$1.$2');
    formatted = formatted.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return formatted;
  };

  const handleChangeText = (text: string) => {
    const formatted = formatCpf(text);
    setFormattedCpf(formatted);
    onChangeText(formatted);

    if (formatted.length === 14) {
      const isValidResult = isValidCPF(formatted);
      setIsValid(isValidResult);
      if (!isValidResult) {
        Alert.alert('Erro', 'CPF inválido. Verifique os dígitos.');
      }
    } else {
      setIsValid(null);
    }
  };

  useEffect(() => {
    setFormattedCpf(formatCpf(value));
  }, [value]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="CPF (XXX.XXX.XXX-XX)"
        value={formattedCpf}
        onChangeText={handleChangeText}
        keyboardType="numeric"
        maxLength={14}
      />
      {isValid === false && <Text style={styles.errorText}>CPF inválido</Text>}
    </View>
  );
};

export default CpfInput;
