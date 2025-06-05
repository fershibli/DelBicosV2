import React from 'react';
import { View, Image } from 'react-native';
import { styles } from './styles';

const Header = () => {
  const handleBackPress = () => {
    console.log('Voltar');
  };

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

    </View>
  );
};

export default Header;
