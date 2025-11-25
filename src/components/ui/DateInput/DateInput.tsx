import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';

interface DateInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: any;
}

const cleanString = (text: string) => text.replace(/[^\d]/g, '').slice(0, 8);

const formatDate = (text: string) => {
  const cleanText = cleanString(text);
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
  const colors = useColors();
  const styles = createStyles(colors);
  const [formattedDate, setFormattedDate] = useState('');

  const handleChangeText = (text: string) => {
    const formatted = formatDate(text);

    setFormattedDate(formatted);

    onChangeText(formatted);
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
