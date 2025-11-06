import React, { useState } from 'react';
import {
  Platform,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { styles as globalStyles } from '../../lib/utils/styles';
import { MapComponent } from '../MapComponent/MapComponent';
import { Region } from '../../lib/hooks/types';
import colors from '@theme/colors';

const window = Dimensions.get('window');

interface LocationButtonProps {
  onPress: () => Promise<{ latitude: number; longitude: number } | null>;
  loading: boolean;
  disabled?: boolean;
  onConfirm: (coords: { latitude: number; longitude: number }) => void;
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.primaryWhite,
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
    color: colors.primaryWhite,
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

export const LocationButton: React.FC<LocationButtonProps> = ({
  onPress,
  loading,
  disabled = false,
  onConfirm,
}) => {
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
          globalStyles.button,
          (loading || disabled || mapLoading) && { opacity: 0.6 },
        ]}
        onPress={handleOpen}
        disabled={loading || disabled || mapLoading}>
        {loading || mapLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={globalStyles.buttonText}>📍Obter Localização Atual</Text>
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