import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  Image,
  Alert,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={statusModalStyles.overlay}>
        <View style={statusModalStyles.container}>
          <Text style={statusModalStyles.icon}>{getIcon()}</Text>
          <Text style={statusModalStyles.title}>{getTitle()}</Text>
          <Text style={statusModalStyles.message}>{message}</Text>
          {isProgress && (
            <ActivityIndicator
              size="small"
              color="#005A93"
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
  const [scaleAnim] = useState(new Animated.Value(1));
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

  const handleAvatarPress = () => setShowOptions(true);
  const handleAvatarLongPress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => setShowOptions(true));
  };
  const handleHoverIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const handleHoverOut = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
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
    } catch (error) {
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
    } catch (error) {
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
        console.log('Dados Salvos:', { nome, sobrenome, cpf, email, telefone });
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
    <View style={styles.formWrapper}>
      <Text style={styles.headerTitle}>Dados da Conta</Text>
      <View style={styles.card}>
        <View style={styles.contentWrapper}>
          <View style={styles.profileImageContainer}>
            <TouchableOpacity
              style={styles.profileImagePlaceholder}
              onPress={handleAvatarPress}
              onLongPress={handleAvatarLongPress}
              onPressIn={handleHoverIn}
              onPressOut={handleHoverOut}
              activeOpacity={0.9}
              disabled={user?.uploading}>
              <Animated.View
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 60,
                  overflow: 'hidden',
                  backgroundColor: 'orange',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [{ scale: scaleAnim }],
                }}>
                {avatarUriToDisplay ? (
                  <Image
                    source={{ uri: avatarUriToDisplay }}
                    style={{ width: '100%', height: '100%', borderRadius: 60 }}
                    resizeMode="cover"
                  />
                ) : (
                  <Text
                    style={{ fontSize: 36, fontWeight: 'bold', color: '#fff' }}>
                    {nome[0]}
                    {sobrenome[0]}
                  </Text>
                )}
                <Animated.View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: overlayOpacity,
                  }}>
                  {user?.uploading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: '600',
                        textAlign: 'center',
                      }}>
                      Alterar Foto
                    </Text>
                  )}
                </Animated.View>
              </Animated.View>
            </TouchableOpacity>
            <Modal
              visible={showOptions}
              transparent
              animationType="fade"
              onRequestClose={() => setShowOptions(false)}>
              <View style={modalStyles.modalOverlay}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                  activeOpacity={1}
                  onPress={() => setShowOptions(false)}
                />
                <View style={modalStyles.optionsContainer}>
                  <TouchableOpacity
                    style={modalStyles.optionButton}
                    onPress={handleTakePhoto}
                    disabled={user?.uploading}>
                    <Text style={modalStyles.optionText}>
                      {user?.uploading ? 'Processando...' : 'Tirar Foto'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={modalStyles.optionButton}
                    onPress={handlePickFromGallery}
                    disabled={user?.uploading}>
                    <Text style={modalStyles.optionText}>
                      {user?.uploading
                        ? 'Processando...'
                        : 'Escolher da Galeria'}
                    </Text>
                  </TouchableOpacity>
                  {avatarUriToDisplay && (
                    <TouchableOpacity
                      style={[
                        modalStyles.optionButton,
                        modalStyles.removeOption,
                      ]}
                      onPress={removePhoto}
                      disabled={user?.uploading}>
                      <Text
                        style={[
                          modalStyles.optionText,
                          modalStyles.removeText,
                        ]}>
                        Remover Foto
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[modalStyles.optionButton, modalStyles.cancelOption]}
                    onPress={() => setShowOptions(false)}
                    disabled={user?.uploading}>
                    <Text style={modalStyles.optionText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <View style={styles.formGrid}>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Sobrenome</Text>
                <TextInput
                  style={styles.input}
                  value={sobrenome}
                  onChangeText={setSobrenome}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>CPF</Text>
                <TextInput
                  style={styles.input}
                  value={cpf}
                  onChangeText={setCpf}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                  style={[styles.input, styles.telefoneInput]}
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
      <View style={{ flexGrow: 1 }} />
      <Text
        style={{
          fontSize: 13,
          color: '#1877c9',
          marginTop: 30,
          alignSelf: 'center',
          fontWeight: '500',
        }}>
        © DelBicos - 2025 - Todos os direitos reservados.
      </Text>
      <StatusModal
        visible={showStatusModal}
        status={status}
        message={statusMessage}
        onClose={handleCloseStatusModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formWrapper: {},
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d2b36',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f8fafd',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(51, 153, 255, 0.19)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
    padding: 24,
  },
  contentWrapper: {
    flexDirection: 'row',
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  formGrid: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputGroup: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  telefoneInput: {
    borderWidth: 2,
    width: '50%',
  },
  saveButtonContainer: {
    width: '48%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#005A93',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  optionButton: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.12)',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  removeOption: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  removeText: {
    color: '#FF3B30',
  },
  cancelOption: {
    borderBottomWidth: 0,
    marginTop: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
});

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
        shadowColor: '#000',
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
    backgroundColor: '#005A93',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
