import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {
  Controller,
  Control,
  FieldErrors,
  UseFormSetValue,
} from 'react-hook-form';
import CustomTextInput from '@components/ui/CustomTextInput';
import { useViaCepStore } from '@stores/ViaCep';
import { useColors } from '@theme/ThemeProvider';
export interface AddressFormData {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface AddressFormProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  control,
  errors,
  setValue,
}) => {
  const { fetchCep, loading, error: cepError } = useViaCepStore();
  const colors = useColors();
  const styles = createStyles(colors);

  const handleCepBlur = async (cepValue: string) => {
    const cleanCep = cepValue?.replace(/\D/g, '');

    if (cleanCep?.length === 8) {
      const data = await fetchCep(cleanCep);

      if (data && !data.erro) {
        setValue('street', data.logradouro || '', { shouldValidate: true });
        setValue('neighborhood', data.bairro || '', { shouldValidate: true });
        setValue('city', data.localidade || '', { shouldValidate: true });
        setValue('state', data.uf || '', { shouldValidate: true });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Endereço</Text>

      {/* Campo CEP */}
      <Controller
        control={control}
        name="cep"
        rules={{
          required: 'CEP é obrigatório',
          pattern: { value: /^\d{5}-?\d{3}$/, message: 'CEP inválido' },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <CustomTextInput
              label="CEP"
              placeholder="00000-000"
              value={value}
              onChangeText={(text) => {
                const masked = text
                  .replace(/\D/g, '')
                  .replace(/^(\d{5})(\d)/, '$1-$2')
                  .slice(0, 9);
                onChange(masked);
                if (masked.length === 9) handleCepBlur(masked);
              }}
              onBlur={() => {
                onBlur();
                handleCepBlur(value);
              }}
              keyboardType="numeric"
              maxLength={9}
            />
            {loading && (
              <ActivityIndicator
                size="small"
                color={colors.primaryOrange}
                style={styles.loader}
              />
            )}
            {cepError && <Text style={styles.errorText}>{cepError}</Text>}
          </View>
        )}
      />

      <View style={styles.row}>
        <View style={[styles.col, { flex: 3 }]}>
          <Controller
            control={control}
            name="street"
            rules={{ required: 'Rua é obrigatória' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="Rua"
                placeholder="Nome da rua"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        <View style={[styles.col, { flex: 1 }]}>
          <Controller
            control={control}
            name="number"
            rules={{ required: 'Nº obrigatório' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="Número"
                placeholder="123"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
              />
            )}
          />
        </View>
      </View>

      <Controller
        control={control}
        name="complement"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            label="Complemento (Opcional)"
            placeholder="Apto, Bloco, Casa 2..."
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <Controller
        control={control}
        name="neighborhood"
        rules={{ required: 'Bairro é obrigatório' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            label="Bairro"
            placeholder="Ex: Bairro da Liberdade"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />

      <View style={styles.row}>
        <View style={[styles.col, { flex: 2 }]}>
          <Controller
            control={control}
            name="city"
            rules={{ required: 'Cidade obrigatória' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="Cidade"
                placeholder="Ex: São Paulo"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        <View style={[styles.col, { flex: 1 }]}>
          <Controller
            control={control}
            name="state"
            rules={{
              required: 'UF obrigatória',
              maxLength: { value: 2, message: 'Max 2 letras' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="UF"
                placeholder="SP"
                value={value}
                onChangeText={(text) => onChange(text.toUpperCase())}
                onBlur={onBlur}
                maxLength={2}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginTop: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlue,
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      gap: 12,
    },
    col: {
      // Flex é controlado inline para layout fluido
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: -8,
      marginBottom: 8,
    },
    loader: {
      position: 'absolute',
      right: 10,
      top: 40,
    },
  });
