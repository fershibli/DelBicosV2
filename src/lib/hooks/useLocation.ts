import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { useAuthStore } from '../../stores/authStore';

export const useLocation = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { setLocation } = useAuthStore();

  const getDeviceLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar localização negada.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Usar reverse geocoding para obter cidade e estado
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (address.length > 0) {
        const { city, region } = address[0];
        setLocation({ city: city || 'Cidade Desconhecida', state: region || 'Estado Desconhecido' });
      } else {
        setErrorMsg('Não foi possível obter a localização.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg('Erro ao obter localização: ' + error.message);
      } else {
        setErrorMsg('Erro ao obter localização.');
      }
    }
  };

  return { getDeviceLocation, errorMsg };
};