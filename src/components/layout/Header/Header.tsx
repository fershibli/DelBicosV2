import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  Pressable,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { createStyles } from './styles';
import * as Location from 'expo-location';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useUserStore } from '@stores/User';
import { useLocation } from '@lib/hooks/LocationContext';
import DelBicosLogo from '@assets/DelBicos_LogoH.png';
import DelBicosLogoDark from '../../../../assets/DelBicos_git.png';
import { Button } from '@components/ui/Button';
import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types';
import { NavigationParams } from '@screens/types';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { MapComponent } from '@components/ui/MapComponent/MapComponent';
import { Region } from '@lib/hooks/types';
import { useColors } from '@theme/ThemeProvider';
import { ThemeToggle } from '@components/ui/ThemeToggle';

const Header: React.FC<NativeStackHeaderProps> = (props) => {
  const { width } = useWindowDimensions();
  const { theme } = useThemeStore();
  const isDark = theme === ThemeMode.DARK;
  const colors = useColors();
  const styles = createStyles(colors);

  const isWebOrLargeScreen = width > 768;
  const logo = isDark ? DelBicosLogoDark : DelBicosLogo;
  const headerIconColor = isDark ? colors.primaryWhite : colors.primaryBlue;

  const { user, signOut, address: userAddress } = useUserStore();

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

  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [tempMarker, setTempMarker] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [tempRegion, setTempRegion] = useState<Region | null>(null);

  const navigateTo = (screen?: keyof NavigationParams) => {
    if (!screen) return;
    // @ts-ignore
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
        throw new Error('Permissão negada');
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
      console.warn('Usando fallback de localização:', error);

      // Lógica de Fallback
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
        setTempRegion({
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      }
    }
  };

  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    setTempMarker(coordinate);
    setTempRegion((prev) => ({
      ...prev!,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    }));
  };

  const handleConfirmLocation = async () => {
    if (!tempMarker) {
      setIsMapModalVisible(false);
      return;
    }
    try {
      await lookupByCoordinates(tempMarker.latitude, tempMarker.longitude);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    } finally {
      setIsMapModalVisible(false);
    }
  };

  useEffect(() => {
    if (user && userAddress?.city && !city) {
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
        style={[styles.menuItemPressable, isHovered && styles.menuItemHovered]}>
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

  // --- MODAL DE MAPA (Reutilizável) ---
  const MapModal = () => (
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
              <FontAwesome
                name="close"
                size={24}
                color={colors.textSecondary}
              />
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
                <ActivityIndicator size="large" color={colors.primaryBlue} />
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
              (isLocationLoading || !tempMarker) && styles.modalButtonDisabled,
            ]}
            onPress={handleConfirmLocation}
            disabled={isLocationLoading || !tempMarker}>
            {isLocationLoading ? (
              <ActivityIndicator color={colors.primaryWhite} />
            ) : (
              <Text style={styles.modalButtonText}>Confirmar Localização</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // --- RENDERIZAÇÃO MOBILE ---
  if (!isWebOrLargeScreen) {
    return (
      <View style={styles.mobileHeader}>
        <TouchableOpacity onPress={() => navigateTo('Feed')}>
          <Image source={logo} style={styles.mobileLogo} />
        </TouchableOpacity>

        <Menu>
          <MenuTrigger style={styles.mobileMenuTrigger}>
            <FontAwesome name="bars" size={24} color={headerIconColor} />
          </MenuTrigger>

          <MenuOptions
            customStyles={{ optionsContainer: styles.menuOptionsContainer }}>
            <MenuOption onSelect={() => navigateTo('Feed')}>
              <View style={styles.menuOption}>
                <FontAwesome
                  name="home"
                  size={18}
                  color={headerIconColor}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuOptionText}>Página Inicial</Text>
              </View>
            </MenuOption>

            <MenuOption onSelect={() => navigateTo('Category')}>
              <View style={styles.menuOption}>
                <FontAwesome
                  name="th-large"
                  size={18}
                  color={headerIconColor}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuOptionText}>Categorias</Text>
              </View>
            </MenuOption>

            <MenuOption onSelect={() => navigateTo('Help')}>
              <View style={styles.menuOption}>
                <FontAwesome
                  name="question-circle-o"
                  size={18}
                  color={headerIconColor}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuOptionText}>FAQ</Text>
              </View>
            </MenuOption>

            {!!user && (
              <>
                <MenuOption onSelect={() => navigateTo('MySchedules')}>
                  <View style={styles.menuOption}>
                    <FontAwesome
                      name="calendar-check-o"
                      size={18}
                      color={headerIconColor}
                      style={styles.menuIcon}
                    />
                    <Text style={styles.menuOptionText}>Meus Agendamentos</Text>
                  </View>
                </MenuOption>
                <MenuOption
                  onSelect={() => {
                    /* Adicionar navegação do Parceiro */
                  }}>
                  <View style={styles.menuOption}>
                    <FontAwesome
                      name="briefcase"
                      size={18}
                      color={headerIconColor}
                      style={styles.menuIcon}
                    />
                    <Text style={styles.menuOptionText}>
                      Portal do Parceiro
                    </Text>
                  </View>
                </MenuOption>
                {user?.admin && (
                  <MenuOption onSelect={() => navigateTo('AdminAnalytics')}>
                    <View style={styles.menuOption}>
                      <FontAwesome
                        name="bar-chart"
                        size={18}
                        color={headerIconColor}
                        style={styles.menuIcon}
                      />
                      <Text style={styles.menuOptionText}>Analytics</Text>
                    </View>
                  </MenuOption>
                )}
              </>
            )}

            <View style={styles.menuDivider} />

            {/* Configurações */}
            <View style={styles.menuOption}>
              <FontAwesome
                name="paint-brush"
                size={18}
                color={headerIconColor}
                style={styles.menuIcon}
              />
              <Text style={[styles.menuOptionText, { marginRight: 10 }]}>
                Tema:
              </Text>
              <ThemeToggle />
            </View>

            <View style={styles.menuDivider} />

            {!!user ? (
              <>
                <MenuOption
                  onSelect={() =>
                    navigation.navigate('ClientProfile' as never)
                  }>
                  <View style={styles.menuOption}>
                    <FontAwesome
                      name="user-circle-o"
                      size={18}
                      color={headerIconColor}
                      style={styles.menuIcon}
                    />
                    <Text style={styles.menuOptionText}>Meu Perfil</Text>
                  </View>
                </MenuOption>
                <MenuOption onSelect={handleSignOut}>
                  <View style={styles.menuOption}>
                    <FontAwesome
                      name="sign-out"
                      size={18}
                      color={colors.errorText}
                      style={styles.menuIcon}
                    />
                    <Text
                      style={[
                        styles.menuOptionText,
                        { color: colors.errorText },
                      ]}>
                      Sair
                    </Text>
                  </View>
                </MenuOption>
              </>
            ) : (
              <MenuOption onSelect={() => navigateTo('Login')}>
                <View style={styles.menuOption}>
                  <FontAwesome
                    name="sign-in"
                    size={18}
                    color={headerIconColor}
                    style={styles.menuIcon}
                  />
                  <Text style={styles.menuOptionText}>Entrar / Cadastrar</Text>
                </View>
              </MenuOption>
            )}
          </MenuOptions>
        </Menu>
        <MapModal />
      </View>
    );
  }

  // --- RENDERIZAÇÃO DESKTOP ---
  return (
    <View style={styles.headerContainer}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigateTo('Feed')}>
          <Image source={logo} style={styles.logoImage} />
        </TouchableOpacity>

        <View style={styles.menu}>
          <MenuItem screen={'Feed'}>Página Inicial</MenuItem>
          <MenuItem screen={'Category'}>Categorias</MenuItem>
          <MenuItem screen={'Help'}>FAQ</MenuItem>
          {!!user && (
            <>
              <MenuItem screen={'MySchedules'}>Meus Agendamentos</MenuItem>
              {user?.admin && (
                <MenuItem screen={'AdminAnalytics'}>Analytics</MenuItem>
              )}
            </>
          )}
        </View>

        <View style={styles.rightSection}>
          <ThemeToggle />

          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Estou em:</Text>
            <Button
              colorVariant="secondary"
              sizeVariant="smallPill"
              fontVariant="AfacadRegular15"
              onPress={openMapModal}
              endIcon={
                <FontAwesome
                  name="chevron-down"
                  size={12}
                  color={colors.primaryWhite}
                />
              }>
              {city && state ? `${city} - ${state}` : 'Definir Local'}
            </Button>
          </View>

          {!!user ? (
            <Menu>
              <MenuTrigger>
                <View style={styles.userContainer}>
                  <Image
                    source={
                      user.avatar_uri
                        ? { uri: user.avatar_uri }
                        : require('@assets/logo.png')
                    }
                    style={styles.profileImage}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: styles.menuOptionsContainer,
                }}>
                <MenuOption
                  onSelect={() =>
                    navigation.navigate('ClientProfile' as never)
                  }>
                  <View style={styles.menuOption}>
                    <FontAwesome
                      name="user-circle-o"
                      size={18}
                      color={headerIconColor}
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
                      color={colors.errorText}
                      style={styles.menuIcon}
                    />
                    <Text
                      style={[
                        styles.menuOptionText,
                        { color: colors.errorText },
                      ]}>
                      Sair
                    </Text>
                  </View>
                </MenuOption>
              </MenuOptions>
            </Menu>
          ) : (
            <View style={styles.authButtons}>
              <Button
                colorVariant="primaryOrange"
                sizeVariant="default"
                fontVariant="AfacadBold16"
                variant="outlined"
                onPress={() => navigateTo('Login')}>
                Entrar
              </Button>
              <Button
                colorVariant="primaryOrange"
                sizeVariant="default"
                variant="contained"
                fontVariant="AfacadBold16"
                onPress={() => navigateTo('Register')}>
                Cadastre-se
              </Button>
            </View>
          )}
        </View>
      </View>

      <View style={styles.searchBar}>
        {user && (
          <Text style={styles.searchText}>
            Olá, {user.name.split(' ')[0]}! Como podemos te ajudar hoje?
          </Text>
        )}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="O que você precisa?"
            placeholderTextColor={colors.textTertiary}
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.searchButton}>
            <FontAwesome name="search" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <MapModal />
    </View>
  );
};

export default Header;
