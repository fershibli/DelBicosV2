import React, { useRef, useState } from 'react';
import {
  Platform,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { styles as globalStyles } from '../../lib/utils/styles';
import { MapComponentProps } from '../../lib/hooks/types';
import { MapErrorBoundary } from '../MapComponent/MapErrorBoundary';

interface NativeMapRendererProps extends MapComponentProps {
  style?: any;
}

const NativeMapRenderer: React.FC<NativeMapRendererProps> = ({
  region,
  markerCoords,
  address,
  onMapPress,

  style,
}) => {
  const mapRef = useRef<MapView>(null);
  const [mapReady, setMapReady] = useState(false);

  // Só renderiza se não for web
  if (Platform.OS === 'web') {
    return null;
  }

  const handleMapReady = () => {
    setMapReady(true);
  };

  const handleRegionChangeComplete = (newRegion: any) => {
    // Opcional: atualiza região suavemente
  };

  const handlePress = (event: any) => {
    if (onMapPress) {
      onMapPress(event);
    }
  };

  return (
    <MapErrorBoundary>
      <View style={globalStyles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={globalStyles.map}
          region={region ?? undefined}
          onRegionChangeComplete={handleRegionChangeComplete}
          onPress={handlePress}
          onMapReady={handleMapReady}
          showsUserLocation={false}
          showsMyLocationButton={false}
          loadingEnabled={!mapReady}
          loadingIndicatorColor="#3b82f6"
          loadingBackgroundColor="#ffffff"
          toolbarEnabled={false}
          moveOnMarkerPress={false}
          pitchEnabled={false}
          rotateEnabled={false}
          scrollEnabled={true}
          zoomEnabled={true}>
          {markerCoords && mapReady && (
            <Marker
              coordinate={markerCoords}
              title="Localização Selecionada"
              description={
                address?.formatted || 'Clique para selecionar localização'
              }
              pinColor="blue"
            />
          )}
        </MapView>

        {/* Loading overlay */}
        {!mapReady && (
          <View style={localStyles.loadingOverlay}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={localStyles.loadingText}>Carregando mapa...</Text>
          </View>
        )}
      </View>
    </MapErrorBoundary>
  );
};

const localStyles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#6b7280',
  },
});

export default NativeMapRenderer;
