import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavItem from './styles';

type Props = {
  isAuthenticated: boolean;
};

const Header = ({ isAuthenticated }: Props) => {

  return (
    <View style={styles.container}>

      <View style={styles.topSection}>
        <Image 
          source={require('../../assets/DelBicos_LogoH.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.navbar}>
        {isAuthenticated ? <AuthenticatedNav /> : <UnauthenticatedNav />}
      </View>

      <View style={styles.blueBar} />

    </View>
  );
};

const AuthenticatedNav = () => (
  <View style={styles.navItems}>
    <NavItem>Página Inicial</NavItem>
    <NavItem>Categorias</NavItem>
    <NavItem>Ajuda</NavItem>
    <NavItem>Meus Agendamentos</NavItem>
    <NavItem>Portal do Parceiro</NavItem>
    <View style={styles.locationContainer}>
      <Text style={styles.locationLabel}>Estou em:</Text>
        <TouchableOpacity style={styles.locationBox}>
          <Text style={styles.locationText}>Sorocaba, São Paulo</Text>
          <Icon name="keyboard-arrow-down" size={18} color="#FFF" style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.userContainer}
        activeOpacity={0.7}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Douglas</Text>
      </TouchableOpacity>
    </View>
);

const UnauthenticatedNav = () => (
  <View style={styles.navItems}>
    <NavItem>Página Inicial</NavItem>
    <NavItem>Categorias</NavItem>
    <NavItem>Ajuda</NavItem>
    <NavItem>Portal do Parceiro</NavItem>
    
    <View style={styles.authButtons}>
      <Text style={styles.registerText}>Cadastre-se</Text>
      <View style={styles.loginButton}>
        <Text style={styles.loginText}>Fazer login</Text>
      </View>
    </View>
  </View>
);

export default Header;
