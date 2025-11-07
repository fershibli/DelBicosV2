import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  Image,
  Alert,
  Animated,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomTextInput from '@components/ui/CustomTextInput';
import { styles } from './styles';
import colors from '@theme/colors';

interface UserProfileProps {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  avatarSource: { uri: string | null };
  onAvatarChange: (base64: string | null) => Promise<void>;
  uploading?: boolean;
}

interface DadosContaFormProps {
  user?: UserProfileProps;
}

type ModalStatus = 'success' | 'error' | 'loading' | null;

interface StatusModalProps {
  visible: boolean;
  status: ModalStatus;
  message: string;
  onClose: () => void;
}

const StatusModal = ({
  visible,
  status,
  message,
  onClose,
}: StatusModalProps) => {
  const isSuccess = status === 'success';
  const isError = status === 'error';
  const isProgress = status === 'loading';

  const getIcon = () => {
    if (isSuccess) {
      return '✔️';
    } else if (isError) {
      return '❌';
    }
    return '⏳';
  };

  const getTitle = () => {
    if (isSuccess) {
      return 'Sucesso!';
    } else if (isError) {
      return 'Ops...';
    }
    return 'Salvando...';
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      transparent>
      <View style={statusModalStyles.overlay}>
        <View style={statusModalStyles.container}>
          <Text style={statusModalStyles.icon}>{getIcon()}</Text>
          <Text style={statusModalStyles.title}>{getTitle()}</Text>
          <Text style={statusModalStyles.message}>{message}</Text>
          {isProgress && (
            <ActivityIndicator
              size="small"
              color={colors.primaryBlue}
              style={statusModalStyles.activityIndicator}
            />
          )}
          {!isProgress && (
            <TouchableOpacity
              style={statusModalStyles.button}
              onPress={onClose}>
              <Text style={statusModalStyles.buttonText}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default function DadosContaForm({ user }: DadosContaFormProps) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('001.112.223-45');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const [showOptions, setShowOptions] = useState(false);
  const [overlayOpacity] = useState(new Animated.Value(0));

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [status, setStatus] = useState<ModalStatus>(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    requestPermissions();

    if (user) {
      const fullNameParts = user.userName.split(' ');
      setNome(fullNameParts[0] || '');
      setSobrenome(fullNameParts.slice(1).join(' ') || '');
      setEmail(user.userEmail || '');
      setTelefone(user.userPhone || '');
    }
  }, [user]);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
        Alert.alert(
          'Permissões necessárias',
          'Precisamos de acesso à câmera e galeria para esta funcionalidade.',
        );
      }
    }
  };

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
    if (!asset.base64) {
      Alert.alert('Erro', 'Imagem não contém dados base64.');
      return;
    }
    const dataUri = `data:image/jpeg;base64,${asset.base64}`;

    try {
      if (user?.onAvatarChange) {
        await user.onAvatarChange(dataUri);
      }
    } catch (error) {
      console.error('Erro ao processar a imagem:', error);
      Alert.alert('Erro', 'Não foi possível processar a imagem para upload.');
    }
  };

  const handleTakePhoto = async () => {
    if (user?.uploading) return;
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });
      if (!result.canceled && result.assets?.length > 0) {
        handleImageSelection(result.assets[0]);
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível acessar a câmera.');
    } finally {
      setShowOptions(false);
    }
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
      if (!result.canceled && result.assets?.length > 0) {
        handleImageSelection(result.assets[0]);
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível acessar a galeria.');
    } finally {
      setShowOptions(false);
    }
  };

  const removePhoto = () => {
    if (user?.uploading) return;
    Alert.alert(
      'Remover foto',
      'Tem certeza que deseja remover a foto de perfil?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            if (user?.onAvatarChange) {
              user.onAvatarChange(null);
            }
          },
        },
      ],
    );
    setShowOptions(false);
  };

  const handleSaveChanges = async () => {
    setShowStatusModal(true);
    setStatus('loading');
    setStatusMessage('Estamos salvando suas alterações...');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const success = Math.random() > 0.2;

      if (success) {
        setStatus('success');
        setStatusMessage('Suas informações foram salvas com sucesso!');
      } else {
        throw new Error('Falha ao salvar os dados. Tente novamente.');
      }
    } catch (error: any) {
      setStatus('error');
      setStatusMessage(
        error.message ||
          'Ocorreu um erro inesperado. Tente novamente mais tarde.',
      );
      console.error('Erro ao salvar:', error);
    }
  };

  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
    setStatus(null);
  };

  const avatarUriToDisplay = user?.avatarSource?.uri;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Dados da Conta</Text>
      <View style={styles.card}>
        <View style={styles.contentWrapper}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              style={styles.avatarTouchable}
              onPress={() => setShowOptions(true)}
              onPressIn={handleHoverIn}
              onPressOut={handleHoverOut}
              activeOpacity={0.9}
              disabled={user?.uploading}>
              <Animated.View style={styles.avatarAnimatedWrapper}>
                {avatarUriToDisplay ? (
                  <Image
                    source={{ uri: avatarUriToDisplay }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Text style={styles.avatarInitials}>{nome[0] || ''}</Text>
                )}
                <Animated.View
                  style={[styles.avatarOverlay, { opacity: overlayOpacity }]}>
                  {user?.uploading ? (
                    <ActivityIndicator
                      size="small"
                      color={colors.primaryWhite}
                    />
                  ) : (
                    <Text style={styles.avatarOverlayText}>Alterar Foto</Text>
                  )}
                </Animated.View>
              </Animated.View>
            </TouchableOpacity>
          </View>

          <View style={styles.formGrid}>
            <View style={styles.formRow}>
              <View style={styles.formCol}>
                <CustomTextInput
                  label="Nome"
                  value={nome}
                  onChangeText={setNome}
                />
              </View>
              <View style={styles.formCol}>
                <CustomTextInput
                  label="Sobrenome"
                  value={sobrenome}
                  onChangeText={setSobrenome}
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={styles.formCol}>
                <CustomTextInput
                  label="CPF"
                  value={cpf}
                  onChangeText={setCpf}
                  editable={false}
                />
              </View>
              <View style={styles.formCol}>
                <CustomTextInput
                  label="E-mail"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.formRow}>
              <View style={styles.formCol}>
                <CustomTextInput
                  label="Telefone"
                  value={telefone}
                  onChangeText={setTelefone}
                  keyboardType="phone-pad"
                />
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
      </View>

      <AvatarOptionsModal
        visible={showOptions}
        onClose={() => setShowOptions(false)}
        onTakePhoto={handleTakePhoto}
        onPickFromGallery={handlePickFromGallery}
        onRemovePhoto={removePhoto}
        hasPhoto={!!avatarUriToDisplay}
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

interface AvatarOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onPickFromGallery: () => void;
  onRemovePhoto: () => void;
  hasPhoto: boolean;
  uploading?: boolean;
}

const AvatarOptionsModal = ({
  visible,
  onClose,
  onTakePhoto,
  onPickFromGallery,
  onRemovePhoto,
  hasPhoto,
  uploading,
}: AvatarOptionsModalProps) => (
  <Modal
    visible={visible}
    animationType="fade"
    onRequestClose={onClose}
    transparent>
    <TouchableOpacity
      style={styles.modalOverlay}
      activeOpacity={1}
      onPress={onClose}>
      <View style={styles.optionsContainer}>
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
              Remover Foto
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

const statusModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
    maxWidth: 350,
    ...Platform.select({
      ios: {
        shadowColor: colors.primaryBlack,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  icon: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1d2b36',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  activityIndicator: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: colors.primaryBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.primaryWhite,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
