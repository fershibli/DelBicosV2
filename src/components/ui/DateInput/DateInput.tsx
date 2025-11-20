import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { styles } from './styles';
import colors from '@theme/colors';

interface DateInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: boolean;
}

const formatDate = (cleanText: string) => {
  let formatted = cleanText;
  if (cleanText.length > 2) {
    formatted = `${cleanText.slice(0, 2)}/${cleanText.slice(2)}`;
  }
  if (cleanText.length > 4) {
    formatted = `${cleanText.slice(0, 2)}/${cleanText.slice(
      2,
      4,
    )}/${cleanText.slice(4, 8)}`;
  }
  return formatted;
};

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChangeText,
  onBlur,
  error,
}) => {
  const [formattedDate, setFormattedDate] = useState(() =>
    formatDate(value || ''),
  );

  const handleChangeText = (text: string) => {
    const cleanText = text.replace(/[^\d]/g, '').slice(0, 8);

    const formatted = formatDate(cleanText);

    setFormattedDate(formatted);

    onChangeText(cleanText);
  };

  useEffect(() => {
    setFormattedDate(formatDate(value || ''));
  }, [value]);

  return (
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder="DD/MM/AAAA"
      placeholderTextColor={colors.textTertiary}
      value={formattedDate}
      onChangeText={handleChangeText}
      onBlur={onBlur}
      keyboardType="numeric"
      maxLength={10}
    />
  );
};

export default DateInput;
