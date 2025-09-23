import React, { useState, useEffect } from 'react';
import {
  Platform,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  Modal as RNModal,
  TextInput,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MapRenderer from '@components/MapRenderer';
import { Region, AddressData } from '../../lib/types/types';
import * as Location from 'expo-location';

// Estilos combinados com base no styles.ts fornecido e utils/styles.ts
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 60,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#3b82f6', // Cor do projeto original
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 60,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginLeft: 8,
  },
  buttonLogin: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 60,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  buttonLoginText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '90%',
    maxWidth: 400,
    height: 400,
  },
  mapContainer: {
    height: 300,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  confirmButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 12,
};

interface LocationOptionsProps {
  onLocationRetrieved: (coords: {
    latitude: number;
    longitude: number;
  }) => void;
  onCepRetrieved: (city: string, state: string) => void;
  onLoginPress: () => void;
}

const LocationOptions: React.FC<LocationOptionsProps> = ({
  onLocationRetrieved,
  onCepRetrieved,
  onLoginPress,
}) => {
  const [cep, setCep] = useState('');
  const [open, setOpen] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const [markerCoords, setMarkerCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [mapLoading, setMapLoading] = useState(false);

  const handleUseLocation = async () => {
    setMapLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Não foi possível acessar sua localização',
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta:
          (0.01 * Dimensions.get('window').width) /
          Dimensions.get('window').height,
      });
      setMarkerCoords(coords);
      setOpen(true);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      Alert.alert('Erro', 'Falha ao obter localização');
    } finally {
      setMapLoading(false);
    }
  };

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerCoords({ latitude, longitude });
    setCurrentRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta:
        (0.01 * Dimensions.get('window').width) /
        Dimensions.get('window').height,
    });
    console.log('🗺️ Mini mapa pressionado:', {
      latitude: latitude.toFixed(6),
      longitude: longitude.toFixed(6),
    });
  };

  const handleConfirm = () => {
    if (markerCoords) {
      onLocationRetrieved(markerCoords);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchCep = async () => {
    if (!cep) {
      Alert.alert('Erro', 'Digite um CEP válido');
      return;
    }
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) throw new Error();
      const { localidade: city, uf: state } = data;
      onCepRetrieved(city, state);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      Alert.alert('CEP inválido', 'Digite um CEP válido.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleUseLocation}
        disabled={mapLoading}>
        {mapLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <>
            <Image
              source={require('@assets/Local.svg')}
              style={{ width: 21, height: 29 }}
            />
            <Text style={styles.buttonText}>Usar minha localização</Text>
          </>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Digite seu CEP"
        style={styles.input}
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSearchCep}>
        <Image
          source={require('@assets/Search.svg')}
          style={{ width: 21, height: 29 }}
        />
        <Text style={styles.buttonText}>Buscar CEP ou Ruas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonLogin} onPress={onLoginPress}>
        <Image
          source={require('@assets/person.svg')}
          style={{ width: 21, height: 29 }}
        />
        <Text style={styles.buttonLoginText}>Fazer Login</Text>
      </TouchableOpacity>

      {Platform.OS === 'web' ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Sua Localização Atual
            </Typography>
            <Box
              sx={{
                height: 300,
                width: '100%',
                borderRadius: 8,
                overflow: 'hidden',
                mb: 2,
              }}>
              <MapRenderer
                region={currentRegion}
                markerCoords={markerCoords}
                onMapPress={handleMapPress}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleConfirm}
              sx={{
                width: '100%',
                bgcolor: '#3b82f6',
                '&:hover': { bgcolor: '#2563eb' },
              }}>
              Confirmar Localização
            </Button>
          </Box>
        </Modal>
      ) : (
        <RNModal
          visible={open}
          transparent={true}
          animationType="fade"
          onRequestClose={handleClose}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Sua Localização Atual</Text>
              <View style={styles.mapContainer}>
                <MapRenderer
                  region={currentRegion}
                  markerCoords={markerCoords}
                  onMapPress={handleMapPress}
                />
              </View>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>
                  Confirmar Localização
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RNModal>
      )}
    </View>
  );
};

export default LocationOptions;
