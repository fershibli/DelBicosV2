import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavItem from './styles';
import { useNavigation } from '@react-navigation/native';
import useUserStore from '@stores/User';

type Props = {
  isAuthenticated: boolean;
};

const Header = ({ isAuthenticated }: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.topSection}
        onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../../assets/DelBicos_LogoH.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={styles.divider} />

      <View style={styles.navbar}>
        {isAuthenticated ? <AuthenticatedNav /> : <UnauthenticatedNav />}
      </View>

      <View style={styles.blueBar} />
    </View>
  );
};

const AuthenticatedNav = () => {
  const user = useUserStore((state) => state.user);

  return (
    <View style={styles.navItems}>
      <NavItem>Página Inicial</NavItem>
      <NavItem>Categorias</NavItem>
      <NavItem>Ajuda</NavItem>
      <NavItem>Meus Agendamentos</NavItem>
      <NavItem>Portal do Parceiro</NavItem>
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
    </View>
  );
};

const UnauthenticatedNav = () => (
  <View style={styles.navItems}>
    <NavItem>Página Inicial</NavItem>
    <NavItem>Categorias</NavItem>
    <NavItem>Ajuda</NavItem>
    <NavItem>Portal do Parceiro</NavItem>

    <View style={styles.authButtons}>
      <TouchableOpacity style={styles.navItemOutlined}>
        <Text style={styles.navItemText}>Cadastre-se</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItemFilled}>
        <Text style={styles.navItemTextFilled}>Fazer login</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Header;
