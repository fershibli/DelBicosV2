import React from 'react';
import { ScrollView, Text, StyleSheet, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LocationOptions from '../lib/utils/LocationOptions';
import { useLocation } from '../lib/utils/LocationContext';

export function Loading() {
  const navigation = useNavigation();
  const { setLocation } = useLocation();

  const handleLocation = (city: string, country: string) => {
    console.log('handleLocation chamado com:', city, country);
    setLocation(city, country);
    if (city && country) {
      console.log('Localização definida, navegando para Home');
      navigation.navigate('Home');
    } else {
      console.log('Falha ao definir localização, navegando não realizado');
    }
  };

  const handleCep = (city: string, state: string) => {
    console.log('handleCep chamado com:', city, state);
    setLocation(city, state);
    if (city && state) {
      console.log('Localização via CEP definida, navegando para Home');
      navigation.navigate('Home');
    } else {
      console.log(
        'Falha ao definir localização via CEP, navegando não realizado',
      );
    }
  };

  const onLoginPress = () => {
    console.log('Navegando para PhoneConfirmation');
    navigation.navigate('PhoneConfirmation');
  };

  return (
    <View style={styles.container}>
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
      </ScrollView>
      <Text style={styles.footer}>
        © DelBicos - 2025 – Todos os direitos reservados.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff7f00',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    fontSize: 12,
    alignSelf: 'center',
    color: '#ffffff',
  },
});
