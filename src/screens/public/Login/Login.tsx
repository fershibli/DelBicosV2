import React from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LocationOptions from '@components/LocationOptions';
import { useLocation } from '@lib/hooks/LocationContext';
import { styles } from './styles';
import * as Location from 'expo-location';

function LoginScreen() {
  const navigation = useNavigation();
  const { setLocation } = useLocation();

  const handleLocation = async (coords: {
    latitude: number;
    longitude: number;
  }) => {
    try {
      console.log('handleLocation chamado com coords:', coords);
      const results = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      const place = results?.[0];
      const city = place?.city || place?.subregion || '';
      const state = place?.region || '';
      console.log('Reverse geocoded para:', { city, state });
      setLocation(city, state);
      if (city && state) {
        console.log('Localização definida, navegando para Feed');
        navigation.navigate('Feed');
      } else {
        console.log('Falha ao definir localização; navegação não realizada');
      }
    } catch (error) {
      console.error('Erro no reverse geocode:', error);
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
