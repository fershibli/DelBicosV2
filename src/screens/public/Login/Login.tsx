import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useLocation } from '@lib/hooks/LocationContext';
import CustomTextInput from '@components/ui/CustomTextInput';
import LogoV3 from '@assets/LogoV3.png';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';

function LoginScreen() {
  const navigation = useNavigation();
  const { setLocation } = useLocation();
  const [cep, setCep] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const colors = useColors();
  const styles = createStyles(colors);

  const handleUseLocation = async () => {
    setIsLoadingLocation(true);
    try {
      console.log('[Location] Solicitando permissão...');
      // checa permissões sem disparar diálogo
      // @ts-ignore
      const currentPerm = await Location.getForegroundPermissionsAsync();
      let status = currentPerm?.status;
      console.log('[Location] Permissão atual:', status);

      if (status !== 'granted') {
        // tenta solicitar permissão, mas com timeout para evitar bloqueio
        try {
          // @ts-ignore
          const reqPromise = Location.requestForegroundPermissionsAsync();
          // 5s timeout
          // @ts-ignore
          const res = await Promise.race([
            reqPromise,
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('perm-timeout')), 5000),
            ),
          ]);
          status = res?.status;
          console.log('[Location] Permissão após request:', status);
        } catch (e) {
          console.warn('[Location] Falha ao solicitar permissão:', e);
        }
      }

      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Não foi possível acessar sua localização.',
        );
        return;
      }

      // 1) Tenta getLastKnownPositionAsync (instantâneo)
      console.log('[Location] Tentando getLastKnownPositionAsync...');
      let locationData = await Location.getLastKnownPositionAsync();
      console.log('[Location] lastKnown:', locationData ? 'ok' : 'null');

      // 2) Se não tiver, usa watchPositionAsync que força o provider a iniciar
      //    (resolve problema conhecido em emuladores onde getCurrentPositionAsync trava)
      if (!locationData) {
        console.log('[Location] Tentando watchPositionAsync (10s timeout)...');
        try {
          locationData = await new Promise<Location.LocationObject | null>(
            (resolve, reject) => {
              let resolved = false;
              let sub: Location.LocationSubscription | null = null;
              const timer = setTimeout(() => {
                if (!resolved) {
                  resolved = true;
                  sub?.remove();
                  console.warn('[Location] watchPosition timeout');
                  resolve(null);
                }
              }, 10000);

              Location.watchPositionAsync(
                {
                  accuracy: Location.Accuracy.Balanced,
                  distanceInterval: 0,
                  timeInterval: 1000,
                },
                (loc) => {
                  if (!resolved) {
                    resolved = true;
                    clearTimeout(timer);
                    sub?.remove();
                    console.log('[Location] watchPosition recebeu fix!');
                    resolve(loc);
                  }
                },
              )
                .then((subscription) => {
                  sub = subscription;
                  if (resolved) sub.remove();
                })
                .catch((err) => {
                  if (!resolved) {
                    resolved = true;
                    clearTimeout(timer);
                    console.warn('[Location] watchPosition erro:', err);
                    resolve(null);
                  }
                });
            },
          );
        } catch (err) {
          console.warn('[Location] watchPosition falhou:', err);
        }
      }

      // 3) Fallback: geolocalização por IP (útil quando GPS do emulador não funciona)
      let latitude: number | undefined;
      let longitude: number | undefined;

      if (locationData?.coords) {
        latitude = locationData.coords.latitude;
        longitude = locationData.coords.longitude;
        console.log('[Location] Coordenadas (GPS):', latitude, longitude);
      } else {
        console.log('[Location] GPS falhou, tentando geolocalização por IP...');
        try {
          const ipRes = await fetch('https://ipapi.co/json/', {
            signal: AbortSignal.timeout(5000),
          });
          if (ipRes.ok) {
            const ipData = await ipRes.json();
            if (ipData?.latitude && ipData?.longitude) {
              latitude = ipData.latitude;
              longitude = ipData.longitude;
              console.log('[Location] Coordenadas (IP):', latitude, longitude);
            }
          }
        } catch (e) {
          console.warn('[Location] IP geolocation falhou:', e);
        }
      }

      if (latitude == null || longitude == null) {
        Alert.alert(
          'Localização indisponível',
          'Não conseguimos obter sua localização. Verifique se o GPS está ativo ou use o CEP abaixo.',
        );
        return;
      }

      // Reverse geocoding via LocationIQ (mais confiável que Nominatim)
      const LOCATIONIQ_KEY = process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY || '';
      let cityName = '';
      let stateName = '';

      if (LOCATIONIQ_KEY) {
        console.log('[Location] Reverse geocoding via LocationIQ...');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        try {
          const response = await fetch(
            `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_KEY}&lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            { signal: controller.signal },
          );
          clearTimeout(timeoutId);
          if (response.ok) {
            const data = await response.json();
            if (data?.address) {
              const addr = data.address;
              cityName =
                addr.city ||
                addr.town ||
                addr.village ||
                addr.municipality ||
                '';
              stateName = addr.state || '';
            }
          }
        } catch (e) {
          clearTimeout(timeoutId);
          console.warn('[Location] LocationIQ falhou, tentando Nominatim:', e);
        }
      }

      // Fallback: Nominatim
      if (!cityName) {
        console.log('[Location] Reverse geocoding via Nominatim...');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            {
              headers: { 'User-Agent': 'DelBicosApp/1.0' },
              signal: controller.signal,
            },
          );
          clearTimeout(timeoutId);
          if (response.ok) {
            const data = await response.json();
            if (data?.address) {
              cityName =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.county ||
                '';
              stateName = data.address.state || '';
            }
          }
        } catch (e) {
          clearTimeout(timeoutId);
          console.warn('[Location] Nominatim falhou:', e);
        }
      }

      if (!cityName) {
        Alert.alert(
          'Erro',
          'Obtivemos sua localização mas não conseguimos identificar a cidade. Tente usar o CEP.',
        );
        return;
      }

      console.log('[Location] Cidade:', cityName, '| Estado:', stateName);
      setLocation(cityName, stateName);
      // @ts-ignore
      navigation.navigate('Feed');
    } catch (error) {
      console.error('[Location] Erro geral:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao buscar sua localização.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleCepSearch = async () => {
    const cleanCep = cep.replace(/\D/g, '');

    if (cleanCep.length !== 8) {
      Alert.alert('CEP Inválido', 'Por favor, digite um CEP com 8 dígitos.');
      return;
    }

    setIsLoadingCep(true);
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`,
      );
      const data = await response.json();

      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
      } else {
        setLocation(data.localidade, data.uf);
        // @ts-ignore
        navigation.navigate('Feed');
      }
    } catch {
      Alert.alert(
        'Erro',
        'Não foi possível buscar o CEP. Verifique sua conexão.',
      );
    } finally {
      setIsLoadingCep(false);
    }
  };

  const onLoginPress = () => {
    // @ts-ignore
    navigation.navigate('LoginPassword');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home' as never)}
          activeOpacity={0.8}>
          <Image source={LogoV3} style={styles.logo} />
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.title}>Onde você está?</Text>
          <Text style={styles.subtitle}>
            Use sua localização ou CEP para encontrarmos os melhores serviços
            perto de você.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleUseLocation}
            disabled={isLoadingLocation}
            activeOpacity={0.8}>
            {isLoadingLocation ? (
              <ActivityIndicator color={colors.primaryWhite} />
            ) : (
              <Text style={styles.buttonText}>Usar minha localização</Text>
            )}
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <CustomTextInput
              label="Ou digite seu CEP"
              placeholder="00000-000"
              value={cep}
              onChangeText={(text) => {
                const masked = text
                  .replace(/\D/g, '')
                  .replace(/^(\d{5})(\d)/, '$1-$2')
                  .slice(0, 9);
                setCep(masked);
              }}
              keyboardType="numeric"
              maxLength={9}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleCepSearch}
            disabled={isLoadingCep}
            activeOpacity={0.8}>
            {isLoadingCep ? (
              <ActivityIndicator color={colors.primaryWhite} />
            ) : (
              <Text style={styles.buttonText}>Buscar CEP</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>já tem conta?</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={onLoginPress}
            activeOpacity={0.8}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
              Fazer Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Text style={styles.footer}>
        © DelBicos - {new Date().getFullYear()} – Todos os direitos reservados.
      </Text>
    </View>
  );
}

export default LoginScreen;
