import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  Modal,
  Dimensions,
} from 'react-native';
import { MapComponent } from '../../ui/MapComponent/MapComponent';
import { Region } from '@lib/hooks/types';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from '@components/features/LocationButton/styles';

const window = Dimensions.get('window');

interface LocationButtonProps {
  onPress: () => Promise<{ latitude: number; longitude: number } | null>;
  loading: boolean;
  disabled?: boolean;
  onConfirm: (coords: { latitude: number; longitude: number }) => void;
}

export const LocationButton: React.FC<LocationButtonProps> = ({
  onPress,
  loading,
  disabled = false,
  onConfirm,
}) => {
  const colors = useColors();
  const styles = createStyles(colors);
  const [open, setOpen] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const [markerCoords, setMarkerCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [mapLoading, setMapLoading] = useState(false);

  const handleOpen = async () => {
    setMapLoading(true);
    try {
      const coords = await onPress();
      if (coords) {
        setCurrentRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: (0.01 * window.width) / window.height,
        });
        setMarkerCoords(coords);
        setOpen(true);
      }
    } catch (error) {
      console.error('Erro ao obter localização:', error);
    } finally {
      setMapLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerCoords({ latitude, longitude });
    setCurrentRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: (0.01 * window.width) / window.height,
    });
  };

  const handleConfirm = () => {
    if (markerCoords) {
      onConfirm(markerCoords);
    }
    handleClose();
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          (loading || disabled || mapLoading) && { opacity: 0.6 },
        ]}
        onPress={handleOpen}
        disabled={loading || disabled || mapLoading}>
        {loading || mapLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>📍Obter Localização Atual</Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent={true}
        animationType="fade"
        onRequestClose={handleClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Sua Localização Atual</Text>
            <View style={styles.mapContainer}>
              <MapComponent
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
      </Modal>
    </View>
  );
};
