import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useUserStore } from '@stores/User';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';
import { Button } from '@components/ui/Button';
import CustomTextInput from '@components/ui/CustomTextInput';
import { useNavigation } from '@react-navigation/native';

const TornarParceiroForm: React.FC = () => {
  const { user } = useUserStore();
  const colors = useColors();
  const styles = createStyles(colors);
  const navigation = useNavigation();

  const [cpf, setCpf] = useState(user?.cpf || '');
  const [cnpj, setCnpj] = useState('');
  const [description, setDescription] = useState('');
  const [serviceRadiusKm, setServiceRadiusKm] = useState<string>('10');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.cpf) {
      setCpf(user.cpf);
    }
  }, [user]);

  const handleSubmit = async () => {
    // Basic validation
    if (!cpf && !cnpj) {
      Alert.alert('Erro', 'Por favor, informe seu CPF ou CNPJ.');
      return;
    }
    if (!description) {
      Alert.alert(
        'Erro',
        'Por favor, insira uma breve descrição sobre você ou seu serviço.',
      );
      return;
    }

    setIsLoading(true);

    // Simulate API Call to create professional
    try {
      await useUserStore.getState().becomeProfessional({
        cpf: cpf.replace(/\D/g, ''),
        cnpj: cnpj ? cnpj.replace(/\D/g, '') : undefined,
        description,
        service_radius_km: Number(serviceRadiusKm) || 0,
      });

      setIsLoading(false);
      Alert.alert(
        'Sucesso!',
        'Seu cadastro como colaborador foi efetuado. Você agora é um parceiro!',
        [
          {
            text: 'OK',
            onPress: () => {
              // @ts-ignore
              navigation.navigate('ProfessionalTabs');
            },
          },
        ],
      );
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert(
        'Erro',
        error.message ||
          'Ocorreu um erro ao enviar sua solicitação. Tente novamente.',
      );
    }
  };

  const isAlreadyProfessional = !!user?.professional_id;

  if (isAlreadyProfessional) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.title}>Você já é Colaborador</Text>
            <Text style={styles.subtitle}>
              Seu usuário já está registrado como colaborador. Acesse seu perfil
              de parceiro para gerenciar seus serviços.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              colorVariant="primaryOrange"
              sizeVariant="default"
              fontVariant="AfacadBold16"
              onPress={() => {
                // @ts-ignore
                navigation.navigate('ProfessionalTabs');
              }}>
              Ir para Perfil de Colaborador
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  const handleCpfChange = (text: string) => {
    const masked = text
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
    setCpf(masked);
  };

  const handleCnpjChange = (text: string) => {
    const masked = text
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
    setCnpj(masked);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Tornar-se Colaborador</Text>
          <Text style={styles.subtitle}>
            Preencha os dados abaixo para se tornar um parceiro do DelBicos e
            oferecer seus serviços.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <CustomTextInput
              label="CPF"
              placeholder="000.000.000-00"
              value={cpf}
              onChangeText={handleCpfChange}
              keyboardType="numeric"
              maxLength={14}
              editable={!user?.cpf} // Se o usuário já tiver CPF, não deixa editar
            />
            {!!user?.cpf && (
              <Text style={styles.helperText}>
                Este CPF está vinculado à sua conta de usuário.
              </Text>
            )}
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              label="CNPJ (Opcional)"
              placeholder="00.000.000/0000-00"
              value={cnpj}
              onChangeText={handleCnpjChange}
              keyboardType="numeric"
              maxLength={18}
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              label="Descrição do Perfil"
              placeholder="Conte um pouco sobre os serviços que você oferece, sua experiência, etc."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
            />
          </View>

          <View style={styles.inputWrapper}>
            <CustomTextInput
              label="Raio de atendimento (km)"
              placeholder="Ex: 10"
              value={serviceRadiusKm}
              onChangeText={(v) => setServiceRadiusKm(v.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>

          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color={colors.primaryOrange} />
            ) : (
              <Button
                colorVariant="primaryOrange"
                sizeVariant="default"
                fontVariant="AfacadBold16"
                onPress={handleSubmit}>
                Cadastrar
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TornarParceiroForm;
