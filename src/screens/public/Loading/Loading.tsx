import React from 'react';
import { ScrollView, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LocationOptions from '@components/LocationOptions';
import { useLocation } from '@lib/util/LocationContext';
import { styles } from './styles';

function Loading() {
  const navigation = useNavigation();
  const { setLocation } = useLocation();

  const handleLocation = (city: string, country: string) => {
    // Assume que 'country' pode ser o estado ou um placeholder
    setLocation(city, country);
    navigation.navigate('Home');
  };

  const handleCep = (city: string, state: string) => {
    setLocation(city, state);
    navigation.navigate('Home');
  };

  const onLoginPress = () => {
    navigation.navigate('PhoneConfirmation');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>DelBicos</Text>
      <Text style={styles.subtitle}>Delivery de Bicos</Text>

      <LocationOptions
        onLocationRetrieved={handleLocation}
        onCepRetrieved={handleCep}
        onLoginPress={onLoginPress}
      />

      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
    </ScrollView>
  );
}

export default Loading;
