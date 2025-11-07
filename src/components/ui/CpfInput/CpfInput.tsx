import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { styles } from './styles';

interface CpfInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: boolean;
}

const formatCpf = (cleanText: string) => {
  let formatted = cleanText.replace(/(\d{3})(\d)/, '$1.$2');
  formatted = formatted.replace(/(\d{3})(\d)/, '$1.$2');
  formatted = formatted.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return formatted;
};

const CpfInput: React.FC<CpfInputProps> = ({
  value,
  onChangeText,
  onBlur,
  error,
}) => {
  const [formattedCpf, setFormattedCpf] = useState(value);

  const handleChangeText = (text: string) => {
    const cleanText = text.replace(/[^\d]/g, '').slice(0, 11);
    const formatted = formatCpf(cleanText);
    setFormattedCpf(formatted);
    onChangeText(cleanText);
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
      onBlur={onBlur}
      keyboardType="numeric"
      maxLength={14}
    />
  );
};

export default CpfInput;
