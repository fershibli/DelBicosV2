import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useUserStore } from '@stores/User';
import CustomTextInput from '@components/ui/CustomTextInput';
import PasswordInput from '@components/ui/PasswordInput';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';
import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types';
import { FontAwesome } from '@expo/vector-icons';

type MessageType = 'success' | 'error' | null;

const TrocarSenhaForm: React.FC = () => {
  const [message, setMessage] = useState<{
    type: MessageType;
    text: string;
  } | null>(null);

  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

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

  const novaSenha = watch('novaSenha');
  const { changePassword } = useUserStore();
  const { theme } = useThemeStore();
  const isHighContrast = theme === ThemeMode.LIGHT_HI_CONTRAST;
  const colors = useColors();
  const styles = createStyles(colors);

  const responsiveStyles = useMemo(
    () =>
      StyleSheet.create({
        formRow: {
          flexDirection: isDesktop ? 'row' : 'column',
          gap: 16,
          marginBottom: 16,
        },
        inputHalf: {
          flex: isDesktop ? 1 : undefined,
          width: isDesktop ? undefined : '100%',
        },
      }),
    [isDesktop],
  );

  const handleSalvar = async (data: any) => {
    setMessage(null);

    if (data.novaSenha !== data.confirmarSenha) {
      setMessage({ type: 'error', text: 'As senhas não coincidem.' });
      return;
    }

    try {
      await changePassword(data.senhaAtual, data.novaSenha);
      setMessage({
        type: 'success',
        text: 'Sua senha foi alterada com sucesso!',
      });
      reset();
      setTimeout(() => setMessage(null), 5000);
    } catch (error: any) {
      setMessage({
        type: 'error',
        text:
          error?.message ||
          'Erro ao alterar a senha. Verifique sua senha atual.',
      });
      setTimeout(() => setMessage(null), 7000);
    }
  };

  const PasswordRequirement = ({
    regex,
    text,
  }: {
    regex: RegExp;
    text: string;
  }) => {
    const isMet = regex.test(novaSenha || '');
    const iconColor = isMet ? colors.successText : colors.textTertiary;
    const textColor = isMet ? colors.textSecondary : colors.textTertiary;

    return (
      <View style={styles.reqItem}>
        <FontAwesome
          name={isMet ? 'check-circle' : 'circle-o'}
          size={14}
          color={iconColor}
        />
        <Text style={[styles.reqText, { color: textColor }]}>{text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Segurança</Text>

      {/* Banner de Mensagem */}
      {message && (
        <View
          style={[
            styles.messageBanner,
            message.type === 'success'
              ? styles.successBanner
              : styles.errorBanner,
          ]}>
          <FontAwesome
            name={
              message.type === 'success' ? 'check-circle' : 'exclamation-circle'
            }
            size={20}
            color={
              message.type === 'success' ? colors.successText : colors.errorText
            }
            style={{ marginRight: 12 }}
          />
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

      <View
        style={[
          styles.card,
          isHighContrast && {
            borderWidth: 2,
            borderColor: colors.primaryBlack,
          },
        ]}>
        <View style={styles.formContainer}>
          {/* Senha Atual */}
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
                  placeholder="Digite sua senha atual"
                />
              </CustomTextInput>
            )}
          />

          <View style={responsiveStyles.formRow}>
            {/* Nova Senha */}
            <View style={responsiveStyles.inputHalf}>
              <Controller
                control={control}
                name="novaSenha"
                rules={{
                  required: 'A nova senha é obrigatória.',
                  minLength: { value: 8, message: 'Mínimo 8 caracteres.' },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message: 'Senha fraca.',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextInput label="Nova Senha" error={errors.novaSenha}>
                    <PasswordInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={!!errors.novaSenha}
                      placeholder="Crie uma nova senha"
                    />
                  </CustomTextInput>
                )}
              />
            </View>

            {/* Confirmar Senha */}
            <View style={responsiveStyles.inputHalf}>
              <Controller
                control={control}
                name="confirmarSenha"
                rules={{
                  required: 'Confirme a senha.',
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
                      placeholder="Repita a nova senha"
                    />
                  </CustomTextInput>
                )}
              />
            </View>
          </View>

          {/* Checklist de Requisitos */}
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsTitle}>Sua senha deve conter:</Text>
            <PasswordRequirement
              regex={/.{8,}/}
              text="Pelo menos 8 caracteres"
            />
            <PasswordRequirement
              regex={/[A-Za-z]/}
              text="Pelo menos uma letra"
            />
            <PasswordRequirement regex={/\d/} text="Pelo menos um número" />
            <PasswordRequirement
              regex={/[@$!%*#?&]/}
              text="Pelo menos um caractere especial (@$!%*#?&)"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                (!isValid || isSubmitting) && styles.buttonDisabled,
              ]}
              onPress={handleSubmit(handleSalvar)}
              disabled={!isValid || isSubmitting}
              activeOpacity={0.8}>
              {isSubmitting ? (
                <ActivityIndicator color={colors.primaryWhite} />
              ) : (
                <Text style={styles.buttonText}>Atualizar Senha</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TrocarSenhaForm;
