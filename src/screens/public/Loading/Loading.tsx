import React from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LocationOptions from '@components/LocationOptions';
import { useLocation } from '@lib/util/LocationContext';
import { styles } from './styles';

function Loading() {
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
        <Image source={require('@assets/logo.png')} style={styles.logo} />
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

export default Loading;
