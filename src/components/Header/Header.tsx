import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useUserStore } from '@stores/User';
import DelBicosLogo from '@assets/DelBicos_LogoH.png';
import { Button, ButtonProps } from '@components/Button';
import { NavigationParams } from '@screens/types';
import SouthIcon from '@mui/icons-material/South';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const Header: React.FC<NativeStackHeaderProps> = (props) => {
  const { user, address, signOut } = useUserStore();
  const navigation = useNavigation();

  const navigateTo = (screen?: keyof NavigationParams) => {
    if (!screen) return; // remove this later, when all screens are defined
    navigation.navigate(screen);
  };

  interface NavbarButtonProps extends Partial<ButtonProps> {
    screen?: keyof NavigationParams;
    children: React.ReactNode;
  }

  const NavbarButton = ({ screen, children, ...props }: NavbarButtonProps) => (
    <Button
      onClick={() => navigateTo(screen)}
      sizeVariant="large"
      colorVariant="primaryWhite"
      noWrap
      {...props}>
      {children}
    </Button>
  );

  const handleSignOut = () => {
    signOut();

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }),
    );
  };

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
          <NavbarButton screen={'Category'}>Categorias</NavbarButton>
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
            <Button
              colorVariant="secondary"
              sizeVariant="smallPill"
              fontVariant="AfacadRegular15"
              onClick={() => {}}
              endIcon={<SouthIcon />}>
              {!!address
                ? `${address.street}, ${address.city} - ${address.state}`
                : 'Localização não definida'}
            </Button>
          </View>
          {!!user ? (
            <Menu>
              <MenuTrigger>
                <View style={styles.userContainer}>
                  <Image
                    source={require('../../assets/logo.png')}
                    style={styles.profileImage}
                  />
                  <Text style={styles.userName}>{user.name}</Text>
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
                      size={20}
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
                      size={20}
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
            <>
              <NavbarButton screen="Login">Fazer login</NavbarButton>
              <NavbarButton screen="Register" colorVariant="secondary">
                Cadastre-se
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
