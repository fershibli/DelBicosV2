import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomTextInput from '@components/ui/CustomTextInput';
import { useViaCepStore } from '@stores/ViaCep';
import { Button } from '@components/ui/Button';
import { useColors } from '@theme/ThemeProvider';

interface AddressFormProps {
  onSubmit: (data: any) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { fetchCep, loading } = useViaCepStore();
  const colors = useColors();
  const styles = createStyles(colors);

  const handleCepChange = async (value: string) => {
    setCep(value);
    if (value.replace(/\D/g, '').length === 8) {
      const data = await fetchCep(value);
      if (data) {
        setStreet(data.logradouro || '');
        setCity(data.localidade || '');
        setStateValue(data.uf || '');
        setNeighborhood(data.bairro || '');
        setError(null);
      } else {
        setError('CEP não encontrado ou inválido.');
      }
    }
  };

  const handleSubmit = () => {
    onSubmit({
      cep,
      street,
      city,
      state: stateValue,
      neighborhood,
      number,
    });
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        label="CEP"
        value={cep}
        onChangeText={handleCepChange}
        maxLength={9}
        keyboardType="numeric"
      />
      <CustomTextInput label="Rua" value={street} onChangeText={setStreet} />
      <CustomTextInput label="Cidade" value={city} onChangeText={setCity} />
      <CustomTextInput
        label="Estado"
        value={stateValue}
        onChangeText={setStateValue}
      />
      <CustomTextInput
        label="Bairro"
        value={neighborhood}
        onChangeText={setNeighborhood}
      />
      <CustomTextInput label="Número" value={number} onChangeText={setNumber} />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button onPress={handleSubmit} loading={loading} style={styles.button}>
        Salvar
      </Button>
    </View>
  );
};
const createStyles = (colors: any) =>
  StyleSheet.create({
    container: { padding: 8 },
    errorText: { color: colors.danger || 'red', marginVertical: 8 },
    button: { marginTop: 12 },
  });
