import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@stores/User';
import DelBicosLogo from '@assets/DelBicos_LogoH.png';
import { Button, ButtonProps } from '@components/Button';
import { NavigationParams } from '@screens/types';
import SouthIcon from '@mui/icons-material/South';

const Header: React.FC<NativeStackHeaderProps> = (props) => {
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
      sizeVariant="large"
      colorVariant="primaryWhite"
      noWrap
      {...props}>
      {children}
    </Button>
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
            <Button
              colorVariant="secondary"
              sizeVariant="smallPill"
              fontVariant="AfacadRegular15"
              onClick={() => {}}
              endIcon={<SouthIcon />}>
              {user?.location ?? 'Localização não definida'}
            </Button>
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
              <NavbarButton screen="Home" colorVariant="secondary">
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
