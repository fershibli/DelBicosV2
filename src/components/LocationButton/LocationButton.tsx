import React, { useState } from 'react';
import {
  Platform,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  Modal as RNModal,
  Dimensions,
} from 'react-native';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styles as globalStyles } from '../../lib/utils/styles';
import { MapComponent } from '../MapComponent/MapComponent';
import { Region } from '../../lib/hooks/types';

const window = Dimensions.get('window');

interface LocationButtonProps {
  onPress: () => Promise<{ latitude: number; longitude: number } | null>;
  loading: boolean;
  disabled?: boolean;
  onConfirm: (coords: { latitude: number; longitude: number }) => void;
}

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

const rnModalStyle = StyleSheet.create({
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
                height: 500,
                width: '100%',
                borderRadius: 8,
                overflow: 'hidden',
                mb: 2,
              }}>
              <MapComponent
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
          <View style={rnModalStyle.modalContainer}>
            <View style={rnModalStyle.modalContent}>
              <Text style={rnModalStyle.title}>Sua Localização Atual</Text>
              <View style={rnModalStyle.mapContainer}>
                <MapComponent
                  region={currentRegion}
                  markerCoords={markerCoords}
                  onMapPress={handleMapPress}
                />
              </View>
              <TouchableOpacity
                style={rnModalStyle.confirmButton}
                onPress={handleConfirm}>
                <Text style={rnModalStyle.confirmButtonText}>
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
