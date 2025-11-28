import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  Controller,
  Control,
  FieldErrors,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import CustomTextInput from '@components/ui/CustomTextInput';
import CustomSelect, { Option } from '@components/ui/CustomSelect/CustomSelect';
import Autocomplete from '@components/ui/Autocomplete/Autocomplete';
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
  onSubmit?: () => void;
}

const fetchStates = async (): Promise<Option[]> => {
  try {
    const res = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
    );
    const data = await res.json();
    return data.map((uf: any) => ({ label: uf.sigla, value: uf.sigla }));
  } catch (e) {
    console.error(e);
    return [];
  }
};

const fetchCities = async (uf: string): Promise<Option[]> => {
  try {
    if (!uf) return [];
    const res = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
    );
    const data = await res.json();
    return data.map((city: any) => ({ label: city.nome, value: city.nome }));
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const AddressForm: React.FC<AddressFormProps> = ({
  control,
  errors,
  setValue,
  onSubmit,
}) => {
  const { fetchCep, loading: cepLoading, error: cepError } = useViaCepStore();
  const colors = useColors();
  const styles = createStyles(colors);

  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const selectedState = useWatch({ control, name: 'state' });

  useEffect(() => {
    fetchStates().then(setStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      setLoadingCities(true);
      fetchCities(selectedState).then((data) => {
        setCities(data);
        setLoadingCities(false);
      });
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleCepBlur = async (cepValue: string) => {
    const cleanCep = cepValue?.replace(/\D/g, '');

    if (cleanCep?.length === 8) {
      const data = await fetchCep(cleanCep);
      if (data && !data.erro) {
        setValue('state', data.uf, { shouldValidate: true });
        setValue('street', data.logradouro || '', { shouldValidate: true });
        setValue('neighborhood', data.bairro || '', { shouldValidate: true });
        setValue('city', data.localidade, { shouldValidate: true });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="cep"
        rules={{
          required: 'CEP é obrigatório',
          pattern: { value: /^\d{5}-?\d{3}$/, message: 'CEP inválido' },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ zIndex: 1, marginBottom: 0 }}>
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
              error={errors.cep as any}
              keyboardType="numeric"
              maxLength={9}
            />
            {cepLoading && (
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
                placeholder="Ex: Rua das Flores"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.street as any}
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
                error={errors.number as any}
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
            placeholder="Ex: Apto 101"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.complement as any}
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
            placeholder="Ex: Centro"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.neighborhood as any}
          />
        )}
      />

      <View style={[styles.row, styles.cityRow]}>
        <View style={[styles.col, { flex: 1 }]}>
          <Controller
            control={control}
            name="state"
            rules={{ required: 'UF obrigatória' }}
            render={({ field: { onChange, value } }) => (
              <CustomSelect
                label="Estado"
                placeholder="UF"
                options={states}
                value={value}
                onChange={(val) => {
                  onChange(val);
                  setValue('city', '');
                }}
                error={errors.state}
                loading={states.length === 0}
              />
            )}
          />
        </View>
        <View style={[styles.col, { flex: 2 }]}>
          <Controller
            control={control}
            name="city"
            rules={{ required: 'Cidade obrigatória' }}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                label="Cidade"
                placeholder={
                  selectedState ? 'Digite para buscar...' : 'Selecione o estado'
                }
                data={cities}
                value={value}
                onChange={onChange}
                error={errors.city}
                loading={loadingCities}
                disabled={!selectedState || loadingCities}
              />
            )}
          />
        </View>
      </View>

      {onSubmit && <View style={styles.footer}></View>}
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
      marginBottom: 16,
      alignItems: 'flex-start',
    },
    cityRow: {
      zIndex: 2000,
      elevation: 2000,
      ...Platform.select({
        web: { zIndex: 2000, position: 'relative' },
      }),
    },
    footer: {
      zIndex: 1,
      elevation: 1,
      marginTop: 8,
      ...Platform.select({
        web: { position: 'relative', zIndex: 1 },
      }),
    },
    col: {},
    errorText: {
      color: '#D32F2F',
      fontSize: 12,
      marginTop: 4,
      marginBottom: 4,
    },
    loader: {
      position: 'absolute',
      right: 10,
      top: 40,
    },
  });
