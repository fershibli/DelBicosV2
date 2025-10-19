import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@stores/User';
import DelBicosLogo from '@assets/DelBicos_LogoH.png';
import { ButtonNative } from '@components/Button/Button.native';
import { NavigationParams } from '@screens/types';
import { Ionicons } from '@expo/vector-icons';
import { ButtonFontVariantsKeys, ButtonColorVariantsKeys  } from '../Button/variants';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

const Header: React.FC<NativeStackHeaderProps> = (props) => {
  const { user, address } = useUserStore();
  const navigation = useNavigation();

  const navigateTo = (screen?: keyof NavigationParams) => {
    if (!screen) return;
    navigation.navigate(screen as any);
  };

  interface NavbarButtonProps {
    screen?: keyof NavigationParams;
    children: React.ReactNode;
    colorVariant?: ButtonColorVariantsKeys;
  }

  const NavbarButton = ({ screen, children, colorVariant = 'primaryWhite' }: NavbarButtonProps) => (
    <ButtonNative
      onPress={() => navigateTo(screen)}
      sizeVariant="large"
      colorVariant={colorVariant}
      noWrap
    >
      {children}
    </ButtonNative>
  );

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigateTo('Feed')}>
        <Image
          source={DelBicosLogo}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.divider} />

      <View style={styles.navContainer}>
        <View style={styles.navButtonsContainer}>
          <NavbarButton screen={'Feed'}>Página Inicial</NavbarButton>
          <NavbarButton>Categorias</NavbarButton>
          <NavbarButton>Ajuda</NavbarButton>
          {!!user && (
            <>
              <NavbarButton>Meus Agendamentos</NavbarButton>
              <NavbarButton>Portal do Parceiro</NavbarButton>
            </>
          )}
        </View>

        <View style={styles.navButtonsContainer}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Estou em:</Text>
            <ButtonNative
              colorVariant="secondary"
              sizeVariant="smallPill"
              fontVariant="AfacadRegular15"
              onPress={() => {}}
              endIcon={<Ionicons name="chevron-down" size={16} color="white" />}
            >
              {!!address
                ? `${address.street}, ${address.city} - ${address.state}`
                : 'Localização não definida'}
            </ButtonNative>
          </View>
          {!!user ? (
            <TouchableOpacity style={styles.userContainer} activeOpacity={0.7}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.profileImage}
              />
              <Text style={styles.userName}>{user.name}</Text>
            </TouchableOpacity>
          ) : (
            <>
              <NavbarButton screen="Register">Cadastre-se</NavbarButton>
              <NavbarButton screen="Login" colorVariant="secondary">
                Fazer login
              </NavbarButton>
            </>
          )}
        </View>
      </View>

      <View style={styles.blueBar} />
    </View>
  );
};

export default Header;