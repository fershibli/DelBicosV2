import React from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LocationOptions from '@components/LocationOptions';
import { useLocation } from '@lib/hooks/LocationContext';
import { styles } from './styles';

function LoginScreen() {
  const navigation = useNavigation();
  const { setLocation, lookupByCoordinates } = useLocation();

  const handleLocation = async (latitude: number, longitude: number) => {
    console.log('handleLocation chamado com:', { latitude, longitude });
    try {
      await lookupByCoordinates(latitude, longitude);
      console.log('Localização definida, navegando para Feed');
      navigation.navigate('Feed');
    } catch (error) {
      console.log('Falha ao definir localização, navegando não realizado:', error);
    }
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

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Image source={require('@assets/LogoV3.png')} style={styles.logo} />

        <LocationOptions
          onLocationRetrieved={handleLocation}
          onCepRetrieved={handleCep}
          onLoginPress={onLoginPress}
        />
      </ScrollView>
      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
    </View>
  );
}

export default LoginScreen;