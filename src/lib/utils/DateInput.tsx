import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface DateInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChangeText,
}) => {
  const [formattedDate, setFormattedDate] = useState(value);

  const formatDate = (text: string) => {
    const cleanText = text.replace(/[^\d]/g, '');
    let formatted = cleanText;
    if (cleanText.length > 2) {
      formatted = `${cleanText.slice(0, 2)}/${cleanText.slice(2)}`;
    }
    if (cleanText.length > 4) {
      formatted = `${cleanText.slice(0, 2)}/${cleanText.slice(2, 4)}/${cleanText.slice(4, 8)}`;
    }
    return formatted;
  };

  const handleChangeText = (text: string) => {
    const formatted = formatDate(text);
    setFormattedDate(formatted);
    onChangeText(formatted);
  };

  useEffect(() => {
    setFormattedDate(formatDate(value));
  }, [value]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Data de nascimento (DD/MM/AAAA)"
        value={formattedDate}
        onChangeText={handleChangeText}
        keyboardType="numeric"
        maxLength={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
  },
});
