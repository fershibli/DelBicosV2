import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@stores/User';
import DelBicosLogo from '@assets/DelBicos_LogoH.png';
import { Button, ButtonProps } from '@components/Button';
import { NavigationParams } from '@screens/types';

const Header = () => {
  const { user } = useUserStore();
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
      size="large"
      variant="primaryWhite"
      {...props}>
      {children}
    </Button>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.topSection}
        onPress={() => navigateTo('Feed')}>
        <Image source={DelBicosLogo} style={styles.logo} resizeMode="contain" />
      </TouchableOpacity>

      <View style={styles.divider} />

      <View style={styles.navbar}>
        <View style={styles.navItems}>
          <View style={styles.authButtons}>
            <NavbarButton screen={'Feed'}>Página Inicial</NavbarButton>
            <NavbarButton>Categorias</NavbarButton>
            <NavbarButton>Ajuda</NavbarButton>
            <NavbarButton>Meus Agendamentos</NavbarButton>
            <NavbarButton>Portal do Parceiro</NavbarButton>
          </View>
          {!!user ? (
            <AuthenticatedNav />
          ) : (
            <View style={styles.authButtons}>
              <NavbarButton screen="Register">Cadastre-se</NavbarButton>
              <NavbarButton screen="Home" variant="secondary">
                Fazer login
              </NavbarButton>
            </View>
          )}
        </View>
      </View>

      <View style={styles.blueBar} />
    </View>
  );
};

const AuthenticatedNav = () => {
  const user = useUserStore((state) => state.user);

  return (
    <>
      <View style={styles.locationContainer}>
        <Text style={styles.locationLabel}>Estou em:</Text>
        <TouchableOpacity style={styles.locationBox}>
          {user?.location ?? 'Localização não definida'}
          <Icon
            name="keyboard-arrow-down"
            size={18}
            color="#FFF"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.userContainer} activeOpacity={0.7}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Douglas</Text>
      </TouchableOpacity>
    </>
  );
};

const UnauthenticatedNav = () => (
  <>
    <View style={styles.authButtons}>
      <TouchableOpacity style={styles.navItemOutlined}>
        <Text style={styles.navItemText}>Cadastre-se</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItemFilled}>
        <Text style={styles.navItemTextFilled}>Fazer login</Text>
      </TouchableOpacity>
    </View>
  </>
);

export default Header;
