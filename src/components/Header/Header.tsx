import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from './styles';

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
    <Text style={styles.navItem}>Página Inicial</Text>
    <Text style={styles.navItem}>Categorias</Text>
    <Text style={styles.navItem}>Ajuda</Text>
    <Text style={styles.navItem}>Meus Agendamentos</Text>
    <Text style={styles.navItem}>Portal do Parceiro</Text>
  </View>
);

const UnauthenticatedNav = () => (
  <View style={styles.navItems}>
    <Text style={styles.navItem}>Página Inicial</Text>
    <Text style={styles.navItem}>Categorias</Text>
    <Text style={styles.navItem}>Ajuda</Text>
    <Text style={styles.navItem}>Portal do Parceiro</Text>
    
    <View style={styles.authButtons}>
      <Text style={styles.registerText}>Cadastre-se</Text>
      <View style={styles.loginButton}>
        <Text style={styles.loginText}>Fazer login</Text>
      </View>
    </View>
  </View>
);

export default Header;
