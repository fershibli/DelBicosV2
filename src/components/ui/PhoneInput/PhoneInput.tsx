import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  onBlur,
  error,
}) => {
  const [formattedPhone, setFormattedPhone] = useState(value);
  const colors = useColors();
  const styles = createStyles(colors);

  const formatPhone = (text: string) => {
    const cleanText = text.replace(/[^\d]/g, '');

    if (!cleanText) {
      return '';
    }

    const limitedText = cleanText.slice(0, 11);

    let formatted = limitedText;

    if (limitedText.length > 2) {
      formatted = `(${limitedText.slice(0, 2)}) ${limitedText.slice(2)}`;
    }

    if (limitedText.length > 7) {
      formatted = `(${limitedText.slice(0, 2)}) ${limitedText.slice(
        2,
        7,
      )}-${limitedText.slice(7, 11)}`;
    } else if (limitedText.length > 6) {
      formatted = `(${limitedText.slice(0, 2)}) ${limitedText.slice(
        2,
        6,
      )}-${limitedText.slice(6, 10)}`;
    }

    return formatted;
  };

  const handleChangeText = (text: string) => {
    const cleanText = text.replace(/[^\d]/g, '');

    if (cleanText.length > 11) {
      return;
    }
    const newlyFormatted = formatPhone(cleanText);

    setFormattedPhone(newlyFormatted);

    onChangeText(cleanText);
  };

  useEffect(() => {
    setFormattedPhone(formatPhone(value || ''));
  }, [value]);

  return (
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder="(00) 00000-0000"
      placeholderTextColor={colors.textTertiary}
      value={formattedPhone}
      onChangeText={handleChangeText}
      onBlur={onBlur}
      keyboardType="numeric"
      maxLength={15}
    />
  );
};

export default PhoneInput;
