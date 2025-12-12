import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  Image,
  Alert,
  Animated,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomTextInput from '@components/ui/CustomTextInput';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';
import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types';
import { UserProfileProps } from '../../types';
import { FontAwesome } from '@expo/vector-icons';
import PhoneInput from '@components/ui/PhoneInput';
import { useUserStore } from '@stores/User';

interface DadosContaFormProps {
  user?: UserProfileProps;
}

const formatCPF = (value: string | undefined) => {
  if (!value) return '';
  const cleaned = value.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const StatusModal = ({ visible, status, message, onClose }: any) => {
  const isSuccess = status === 'success';
  const isError = status === 'error';
  const isProgress = status === 'loading';
  const colors = useColors();
  const styles = createStyles(colors);

  const getIcon = () => (isSuccess ? '✔️' : isError ? '❌' : '⏳');
  const getTitle = () =>
    isSuccess ? 'Sucesso!' : isError ? 'Ops...' : 'Salvando...';

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.statusModalContainer}>
          <Text style={styles.statusModalIcon}>{getIcon()}</Text>
          <Text style={styles.statusModalTitle}>{getTitle()}</Text>
          <Text style={styles.statusModalMessage}>{message}</Text>
          {isProgress ? (
            <ActivityIndicator size="small" color={colors.primaryBlue} />
          ) : (
            <TouchableOpacity
              style={styles.statusModalButton}
              onPress={onClose}>
              <Text style={styles.statusModalButtonText}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const AvatarOptionsModal = ({
  visible,
  onClose,
  onTakePhoto,
  onPickFromGallery,
  onRemovePhoto,
  hasPhoto,
  uploading,
}: any) => {
  const colors = useColors();
  const styles = createStyles(colors);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      transparent>
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}>
        <View
          style={styles.optionsContainer}
          onStartShouldSetResponder={() => true}>
          <Text
            style={[
              styles.statusModalTitle,
              { textAlign: 'center', marginBottom: 16 },
            ]}>
            Alterar Foto
          </Text>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={onTakePhoto}
            disabled={uploading}>
            <Text style={styles.optionText}>
              {uploading ? 'Processando...' : 'Tirar Foto'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={onPickFromGallery}
            disabled={uploading}>
            <Text style={styles.optionText}>
              {uploading ? 'Processando...' : 'Escolher da Galeria'}
            </Text>
          </TouchableOpacity>

          {hasPhoto && (
            <TouchableOpacity
              style={[styles.optionButton, styles.removeOption]}
              onPress={onRemovePhoto}
              disabled={uploading}>
              <Text style={[styles.optionText, styles.removeText]}>
                Remover Foto Atual
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.optionButton, styles.cancelOption]}
            onPress={onClose}
            disabled={uploading}>
            <Text style={[styles.optionText, styles.cancelText]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default function DadosContaForm({ user }: DadosContaFormProps) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const [showOptions, setShowOptions] = useState(false);
  const [overlayOpacity] = useState(new Animated.Value(0));
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | 'loading' | null>(
    null,
  );
  const [statusMessage, setStatusMessage] = useState('');
  const [tempAvatarBase64, setTempAvatarBase64] = useState<string | null>(null);
  const [isAvatarRemoved, setIsAvatarRemoved] = useState(false);

  const { updateUserProfile, uploadAvatar, removeAvatar } = useUserStore();
  const { theme } = useThemeStore();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const isHighContrast = theme === ThemeMode.LIGHT_HI_CONTRAST;

  const colors = useColors();
  const styles = createStyles(colors);

  const responsiveStyles = useMemo(
    () =>
      StyleSheet.create({
        contentWrapper: {
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'center' : 'flex-start',
        },
        avatarContainer: {
          marginRight: isMobile ? 0 : 32,
          marginBottom: isMobile ? 32 : 0,
        },
        formGrid: {
          flex: 1,
          width: '100%',
        },
        formRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 16,
        },
        inputWrapper: {
          flexGrow: 1,
          flexBasis: 200,
        },
      }),
    [isMobile],
  );

  useEffect(() => {
    if (Platform.OS !== 'web') {
      (async () => {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permissão necessária',
            'Precisamos de acesso à galeria para alterar a foto.',
          );
        }
      })();
    }

    if (user) {
      const fullNameParts = user.userName.split(' ');
      setNome(fullNameParts[0] || '');
      setSobrenome(fullNameParts.slice(1).join(' ') || '');
      setEmail(user.userEmail || '');
      setTelefone(user.userPhone || '');
      setCpf(formatCPF(user.userCpf));
    }
  }, [user]);

  const handleHoverIn = () => {
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleHoverOut = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleImageSelection = async (asset: ImagePicker.ImagePickerAsset) => {
    if (!asset.base64) return;
    const dataUri = `data:image/jpeg;base64,${asset.base64}`;
    setTempAvatarBase64(dataUri);
    setIsAvatarRemoved(false);
    setShowOptions(false);
  };

  const handlePickFromGallery = async () => {
    if (user?.uploading) return;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });
      if (!result.canceled && result.assets[0]) {
        handleImageSelection(result.assets[0]);
      }
    } catch {
      Alert.alert('Erro', 'Erro ao abrir galeria.');
    } finally {
      setShowOptions(false);
    }
  };

  const handleTakePhoto = async () => {
    // Implementar câmera se necessário
    setShowOptions(false);
  };

  const handleRemovePhoto = () => {
    setIsAvatarRemoved(true);
    setTempAvatarBase64(null);
    setShowOptions(false);
  };

  const handleSaveChanges = async () => {
    setShowStatusModal(true);
    setStatus('loading');
    setStatusMessage('Salvando alterações...');

    try {
      await updateUserProfile({
        name: `${nome} ${sobrenome}`.trim(),
        email,
        phone: telefone.replace(/\D/g, ''),
      });

      if (isAvatarRemoved) {
        await removeAvatar();
      } else if (tempAvatarBase64) {
        await uploadAvatar(tempAvatarBase64);
      }

      setTempAvatarBase64(null);
      setIsAvatarRemoved(false);

      setStatus('success');
      setStatusMessage('Dados atualizados com sucesso!');
    } catch (error: any) {
      setStatus('error');
      setStatusMessage(error.message || 'Erro ao salvar os dados.');
    }
  };

  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
    setStatus(null);
  };

  let avatarUriToDisplay = null;
  if (!isAvatarRemoved) {
    avatarUriToDisplay = tempAvatarBase64 || user?.avatarSource?.uri;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.pageTitle}>Dados da Conta</Text>

      <View
        style={[
          styles.card,
          isHighContrast && {
            borderWidth: 2,
            borderColor: colors.primaryBlack,
          },
        ]}>
        <View style={responsiveStyles.contentWrapper}>
          {/* Avatar Section */}
          <View style={responsiveStyles.avatarContainer}>
            <TouchableOpacity
              style={styles.avatarTouchable}
              onPress={() => setShowOptions(true)}
              // @ts-ignore
              onHoverIn={handleHoverIn}
              onHoverOut={handleHoverOut}
              activeOpacity={0.9}
              disabled={user?.uploading}>
              <Animated.View style={styles.avatarAnimatedWrapper}>
                {avatarUriToDisplay &&
                avatarUriToDisplay !== '[object Object]' ? (
                  <Image
                    source={{ uri: avatarUriToDisplay }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Image
                    source={require('@assets/logo.png')}
                    style={styles.avatarImage}
                    resizeMode="contain"
                  />
                )}

                <Animated.View
                  style={[styles.avatarOverlay, { opacity: overlayOpacity }]}>
                  {user?.uploading ? (
                    <ActivityIndicator
                      size="small"
                      color={colors.primaryWhite}
                    />
                  ) : (
                    <View style={{ alignItems: 'center' }}>
                      <FontAwesome name="camera" size={20} color="white" />
                      <Text style={styles.avatarOverlayText}>Alterar</Text>
                    </View>
                  )}
                </Animated.View>
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* Form Section */}
          <View style={responsiveStyles.formGrid}>
            <View style={responsiveStyles.formRow}>
              <View style={responsiveStyles.inputWrapper}>
                <CustomTextInput
                  label="Nome"
                  value={nome}
                  onChangeText={setNome}
                />
              </View>
              <View style={responsiveStyles.inputWrapper}>
                <CustomTextInput
                  label="Sobrenome"
                  value={sobrenome}
                  onChangeText={setSobrenome}
                />
              </View>
            </View>

            <View style={responsiveStyles.formRow}>
              <View style={responsiveStyles.inputWrapper}>
                <CustomTextInput
                  label="CPF"
                  value={cpf}
                  editable={false}
                  style={{
                    opacity: 0.6,
                    backgroundColor: colors.inputBackground,
                  }}
                />
              </View>
              <View style={responsiveStyles.inputWrapper}>
                <CustomTextInput
                  label="E-mail"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={responsiveStyles.formRow}>
              <View style={responsiveStyles.inputWrapper}>
                <View>
                  <PhoneInput value={telefone} onChangeText={setTelefone} />
                </View>
              </View>
            </View>

            <View style={styles.saveButtonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <AvatarOptionsModal
        visible={showOptions}
        onClose={() => setShowOptions(false)}
        onTakePhoto={handleTakePhoto}
        onPickFromGallery={handlePickFromGallery}
        onRemovePhoto={handleRemovePhoto}
        hasPhoto={
          !!avatarUriToDisplay && avatarUriToDisplay !== '[object Object]'
        }
        uploading={user?.uploading}
      />

      <StatusModal
        visible={showStatusModal}
        status={status}
        message={statusMessage}
        onClose={handleCloseStatusModal}
      />
    </ScrollView>
  );
}
