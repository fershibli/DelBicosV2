import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useUserStore } from '@stores/User';
import CustomTextInput from '@components/ui/CustomTextInput';
import PasswordInput from '@components/ui/PasswordInput';
import { styles } from './styles';
import colors from '@theme/colors';

type MessageType = 'success' | 'error' | null;

const TrocarSenhaForm: React.FC = () => {
  const [message, setMessage] = useState<{
    type: MessageType;
    text: string;
  } | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      senhaAtual: '',
      novaSenha: '',
      confirmarSenha: '',
    },
  });

  // Observa o valor do campo 'novaSenha' para usar na validação de confirmação
  const novaSenha = watch('novaSenha');

  const { changePassword } = useUserStore();

  const handleSalvar = async (data: any) => {
    // Limpa mensagens anteriores
    setMessage(null);

    // proteção adicional: alerta se as senhas não coincidirem (caso a validação não bloqueie)
    if (data.novaSenha !== data.confirmarSenha) {
      setMessage({ type: 'error', text: 'As senhas não coincidem.' });
      return;
    }

    try {
      // chama a store para alterar a senha
      await changePassword(data.senhaAtual, data.novaSenha);
      setMessage({
        type: 'success',
        text: 'Sua senha foi alterada com sucesso!',
      });

      // Limpa o formulário após sucesso
      reset();

      // Remove a mensagem após 5 segundos
      setTimeout(() => setMessage(null), 5000);
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error?.message || 'Erro ao alterar a senha. Tente novamente.',
      });

      // Remove a mensagem de erro após 7 segundos
      setTimeout(() => setMessage(null), 7000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Trocar Senha</Text>

      {/* Banner de Mensagem */}
      {message && (
        <View
          style={[
            styles.messageBanner,
            message.type === 'success'
              ? styles.successBanner
              : styles.errorBanner,
          ]}>
          <Text
            style={[
              styles.messageText,
              message.type === 'success'
                ? styles.successText
                : styles.errorText,
            ]}>
            {message.text}
          </Text>
        </View>
      )}

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
