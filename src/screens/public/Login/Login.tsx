import React from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LocationOptions from '@components/LocationOptions';
import { useLocation } from '@lib/hooks/LocationContext';
import { styles } from './styles';

function LoginScreen() {
  const navigation = useNavigation();
  const { setLocation } = useLocation();

  const handleLocation = (city: string, country: string) => {
    console.log('handleLocation chamado com:', city, country);
    setLocation(city, country);
    // Removida condição para alinhar com onNavigateToFeed
    console.log('Navegando para Feed via handleLocation');
    navigation.navigate('Feed');
  };

  const handleCep = (city: string, state: string) => {
    console.log('handleCep chamado com:', city, state);
    setLocation(city, state);
    if (city && state) {
      console.log('Localização via CEP definida, navegando para Feed');
      navigation.navigate('Feed');
    } else {
      console.log(
        'Falha ao definir localização via CEP, navegando não realizado',
      );
    }
  };

  const onLoginPress = () => {
    console.log('Navegando para PhoneConfirmation');
    navigation.navigate('LoginPassword');
  };

  const navigateToFeed = () => {
    console.log('navigateToFeed chamado');
    navigation.navigate('Feed');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Image source={require('@assets/LogoV3.png')} style={styles.logo} />

        <LocationOptions
          onLocationRetrieved={handleLocation}
          onCepRetrieved={handleCep}
          onLoginPress={onLoginPress} // Corrigido
          onNavigateToFeed={navigateToFeed}
        />
      </ScrollView>
      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
    </View>
  );
}

export default LoginScreen;
