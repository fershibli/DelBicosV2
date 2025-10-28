import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  Platform,
  Pressable,
} from 'react-native';
import { styles } from './styles';
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

const Header: React.FC<NativeStackHeaderProps> = (props) => {
  const { width } = useWindowDimensions();
  const isWebOrLargeScreen = Platform.OS === 'web' || width > 768;

  const { user, signOut } = useUserStore();
  const { address } = useLocation();
  const city = address?.city;
  const state = address?.state;
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const [loginHovered, setLoginHovered] = useState(false);
  const [registerHovered, setRegisterHovered] = useState(false);

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
              <MenuItem>Meus Agendamentos</MenuItem>
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
              colorVariant="secondary" // Laranja
              sizeVariant="smallPill"
              fontVariant="AfacadRegular15"
              onClick={() => {
                /* Abrir modal de localização */
              }}
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
              <Pressable
                style={({ pressed }) => [
                  styles.authButton,
                  loginHovered && styles.authButtonHovered,
                  pressed && styles.authButtonPressed,
                ]}
                onPress={() => navigateTo('Login')}
                onHoverIn={() => setLoginHovered(true)}
                onHoverOut={() => setLoginHovered(false)}>
                <Text
                  style={[
                    styles.authButtonText,
                    loginHovered && styles.authButtonTextHovered,
                  ]}>
                  Fazer login
                </Text>
              </Pressable>

              {/* Botão Cadastre-se */}
              <Pressable
                style={({ pressed }) => [
                  styles.authButton,
                  styles.authButtonSecondary,
                  registerHovered && styles.authButtonSecondaryHovered,
                  pressed && styles.authButtonPressed,
                ]}
                onPress={() => navigateTo('Register')}
                onHoverIn={() => setRegisterHovered(true)}
                onHoverOut={() => setRegisterHovered(false)}>
                <Text
                  style={[
                    styles.authButtonText,
                    styles.authButtonTextSecondary,
                  ]}>
                  Cadastre-se
                </Text>
              </Pressable>
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
    </View>
  );
};

export default Header;
