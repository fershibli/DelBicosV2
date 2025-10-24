import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CustomTextInput from '@components/CustomTextInput';
import PasswordInput from '@components/PasswordInput';
import { styles } from './styles';
import colors from '@theme/colors';

const TrocarSenhaForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      senhaAtual: '',
      novaSenha: '',
      confirmarSenha: '',
    },
  });

  // Observa o valor do campo 'novaSenha' para usar na validação de confirmação
  const novaSenha = watch('novaSenha');

  const handleSalvar = async (data: any) => {
    // Simula uma chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Dados enviados:', data);
    Alert.alert('Sucesso', 'Sua senha foi alterada.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Trocar Senha</Text>
      <View style={styles.card}>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="senhaAtual"
            rules={{ required: 'A senha atual é obrigatória.' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput label="Senha Atual" error={errors.senhaAtual}>
                <PasswordInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.senhaAtual}
                />
              </CustomTextInput>
            )}
          />

          <Controller
            control={control}
            name="novaSenha"
            rules={{
              required: 'A nova senha é obrigatória.',
              minLength: {
                value: 8,
                message: 'Deve ter no mínimo 8 caracteres.',
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: 'Deve conter letra, número e caractere especial.',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput label="Nova Senha" error={errors.novaSenha}>
                <PasswordInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.novaSenha}
                />
              </CustomTextInput>
            )}
          />
          <Text style={styles.passwordRules}>
            A senha deve conter no mínimo 8 caracteres, com letra, número e
            caractere especial (@$!%*#?&).
          </Text>

          <Controller
            control={control}
            name="confirmarSenha"
            rules={{
              required: 'A confirmação da senha é obrigatória.',
              validate: (value) =>
                value === novaSenha || 'As senhas não coincidem.',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="Confirmar Senha"
                error={errors.confirmarSenha}>
                <PasswordInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.confirmarSenha}
                />
              </CustomTextInput>
            )}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                (!isValid || isSubmitting) && styles.buttonDisabled,
              ]}
              onPress={handleSubmit(handleSalvar)}
              disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator color={colors.primaryWhite} />
              ) : (
                <Text style={styles.buttonText}>Salvar Alterações</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TrocarSenhaForm;
