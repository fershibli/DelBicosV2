import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { styles } from './styles';

interface CpfInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
}

const CpfInput: React.FC<CpfInputProps> = ({ value, onChangeText, error }) => {
  const [formattedCpf, setFormattedCpf] = useState(value);

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
  };

  useEffect(() => {
    setFormattedCpf(formatCpf(value));
  }, [value]);

  return (
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder="000.000.000-00"
      placeholderTextColor="#999"
      value={formattedCpf}
      onChangeText={handleChangeText}
      keyboardType="numeric"
      maxLength={14}
    />
  );
};

export default CpfInput;
