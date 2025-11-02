import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  Platform,
  Pressable,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { styles } from './styles';
import * as Location from 'expo-location';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useUserStore } from '@stores/User';
import { useLocation } from '@lib/hooks/LocationContext';
import DelBicosLogo from '@assets/DelBicos_LogoH.png';
import { Button } from '@components/Button';
import { NavigationParams } from '@screens/types';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { MapComponent } from '@components/MapComponent/MapComponent';
import { Region } from '@lib/hooks/types';

const Header: React.FC<NativeStackHeaderProps> = (props) => {
  const { width } = useWindowDimensions();
  const isWebOrLargeScreen = Platform.OS === 'web' || width > 768;

  const { user, signOut } = useUserStore();
  const { address: userAddress } = useUserStore();

  const {
    address: locationAddress,
    city,
    state,
    setLocation,
    lookupByCoordinates,
    loading: isLocationLoading,
  } = useLocation();

  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const [loginHovered, setLoginHovered] = useState(false);
  const [registerHovered, setRegisterHovered] = useState(false);

  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [tempMarker, setTempMarker] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [tempRegion, setTempRegion] = useState<Region | null>(null);

  const navigateTo = (screen?: keyof NavigationParams) => {
    if (!screen) return;
    navigation.navigate(screen);
  };

  const handleSignOut = () => {
    signOut();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }),
    );
  };

  const openMapModal = async () => {
    setIsMapModalVisible(true);
    setTempRegion(null);
    setTempMarker(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Para vermos sua localização, precisamos da sua permissão.',
        );
        // Se a permissão for negada, caia para o fallback (endereço salvo)
        throw new Error('Permissão de localização negada');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const currentCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setTempRegion({
        ...currentCoords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setTempMarker(currentCoords);
    } catch (error) {
      console.error(
        '[Header] Erro ao pegar localização atual, usando fallback:',
        error,
      );
      // 3.3. FALLBACK 1: Usar o endereço de contexto (salvo/logado)
      if (locationAddress?.lat && locationAddress?.lon) {
        const savedCoords = {
          latitude: parseFloat(locationAddress.lat),
          longitude: parseFloat(locationAddress.lon),
        };
        setTempRegion({
          ...savedCoords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setTempMarker(savedCoords);
      } else {
        // 3.4. FALLBACK 2: Usar São Paulo
        setTempRegion({
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
        setTempMarker(null);
      }
    }
  };

  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;

    // 4.1. Atualiza o pino
    setTempMarker(coordinate);

    // 4.2. ATUALIZA A REGIÃO (o centro do mapa) para seguir o pino
    // Mantém o zoom (delta) anterior, se existir
    setTempRegion((prevRegion) => ({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: prevRegion?.latitudeDelta || 0.01,
      longitudeDelta: prevRegion?.longitudeDelta || 0.01,
    }));
  };

  // Chamada quando o usuário clica em "Confirmar"
  const handleConfirmLocation = async () => {
    if (!tempMarker) {
      setIsMapModalVisible(false);
      return;
    }

    try {
      // O hook 'useLocation' já define o estado de loading
      await lookupByCoordinates(tempMarker.latitude, tempMarker.longitude);
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error);
      // Trate o erro se necessário (ex: Alert.alert)
    } finally {
      setIsMapModalVisible(false);
    }
  };

  useEffect(() => {
    if (user && userAddress && userAddress.city && !city) {
      setLocation(userAddress.city, userAddress.state);
    }
  }, [user, userAddress, city, setLocation]);

  const MenuItem: React.FC<{
    screen?: keyof NavigationParams;
    children: React.ReactNode;
  }> = ({ screen, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Pressable
        onPress={() => navigateTo(screen)}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        style={({ pressed }) => [
          styles.menuItemPressable,
          isHovered && styles.menuItemHovered,
        ]}>
        <Text
          style={[
            styles.menuItemText,
            isHovered && styles.menuItemTextHovered,
          ]}>
          {children}
        </Text>
      </Pressable>
    );
  };

  // --- RENDERIZAÇÃO PARA MOBILE (SIMPLES) ---
  if (!isWebOrLargeScreen) {
    return (
      <View style={styles.mobileHeader}>
        <Image source={DelBicosLogo} style={styles.mobileLogo} />
        {/* Adicionar um ícone de menu hambúrguer aqui seria o ideal no futuro */}
      </View>
    );
  }

  // --- RENDERIZAÇÃO PARA WEB/TELAS GRANDES ---
  return (
    <View style={styles.headerContainer}>
      {/* Topo com Logo, Menu, Localização, Usuário */}
      <View style={styles.topBar}>
        {/* Logo */}
        <TouchableOpacity onPress={() => navigateTo('Feed')}>
          <Image
            source={DelBicosLogo}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Menu Centralizado (Adaptado) */}
        <View style={styles.menu}>
          <MenuItem screen={'Feed'}>Página Inicial</MenuItem>
          <MenuItem screen={'Category'}>Categorias</MenuItem>
          <MenuItem>Ajuda</MenuItem>
          {!!user && (
            <>
              <MenuItem screen={'MySchedules'}>Meus Agendamentos</MenuItem>
              <MenuItem>Portal do Parceiro</MenuItem>
            </>
          )}
        </View>

        {/* Localização + Usuário */}
        <View style={styles.rightSection}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Estou em:</Text>
            {/* Usando o seu componente Button adaptado */}
            <Button
              colorVariant="secondary"
              sizeVariant="smallPill"
              fontVariant="AfacadRegular15"
              onPress={openMapModal}
              endIcon={
                <FontAwesome name="chevron-down" size={12} color="#FFFFFF" />
              }>
              {/* Usa a localização do useLocation */}
              {!!city && !!state ? `${city} - ${state}` : 'Localização'}
            </Button>
          </View>

          {/* Lógica de Usuário Logado/Deslogado */}
          {!!user ? (
            <Menu>
              <MenuTrigger>
                <View style={styles.userContainer}>
                  {/* Idealmente, usar user.avatar_uri aqui */}
                  <Image
                    source={require('../../assets/logo.png')}
                    style={styles.profileImage}
                  />
                  {/* <Text style={styles.userName}>{user.name}</Text> // Nome pode ser removido se só a imagem for usada */}
                </View>
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: styles.menuOptionsContainer,
                }}>
                <MenuOption
                  onSelect={() => navigation.navigate('ClientProfile')}>
                  <View style={styles.menuOption}>
                    <FontAwesome
                      name="user-circle-o"
                      size={18}
                      color="#333"
                      style={styles.menuIcon}
                    />
                    <Text style={styles.menuOptionText}>Meu Perfil</Text>
                  </View>
                </MenuOption>
                <View style={styles.menuDivider} />
                <MenuOption onSelect={handleSignOut}>
                  <View style={styles.menuOption}>
                    <FontAwesome
                      name="sign-out"
                      size={18}
                      color="#D32F2F"
                      style={styles.menuIcon}
                    />
                    <Text style={[styles.menuOptionText, { color: '#D32F2F' }]}>
                      Deslogar
                    </Text>
                  </View>
                </MenuOption>
              </MenuOptions>
            </Menu>
          ) : (
            <View style={styles.authButtons}>
              <Button
                colorVariant="primaryWhite"
                sizeVariant="default"
                fontVariant="AfacadSemiBold14"
                variant="contained" 
                onPress={() => navigateTo('Login')}>
                Fazer login
              </Button>

              {/* Botão Cadastre-se */}
              <Button
                colorVariant="primaryOrange"
                sizeVariant="default"
                variant="contained"
                fontVariant="AfacadSemiBold14"
                onPress={() => navigateTo('Register')}>
                Cadastre-se
              </Button>
            </View>
          )}
        </View>
      </View>

      {/* Barra Azul de busca */}
      <View style={styles.searchBar}>
        <Text style={styles.searchText}>
          Olá, {user ? user.name.split(' ')[0] : ''}! Como podemos te ajudar
          hoje?
        </Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Eletricista, Encanador, Diarista..."
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.searchButton}>
            <FontAwesome name="search" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isMapModalVisible}
        onRequestClose={() => setIsMapModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione sua localização</Text>
              <TouchableOpacity onPress={() => setIsMapModalVisible(false)}>
                <FontAwesome name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.mapWrapper}>
              {!tempRegion ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" color="#003366" />
                </View>
              ) : (
                <MapComponent
                  region={tempRegion}
                  markerCoords={tempMarker}
                  onMapPress={handleMapPress}
                />
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.modalButton,
                (isLocationLoading || !tempMarker) &&
                  styles.modalButtonDisabled,
              ]}
              onPress={handleConfirmLocation}
              disabled={isLocationLoading || !tempMarker}>
              {isLocationLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.modalButtonText}>
                  Confirmar Localização
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;
