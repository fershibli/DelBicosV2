import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Region, AddressData } from '../../lib/hooks/types';

interface WebMapWrapperProps {
  region: Region | null;
  markerCoords: { latitude: number; longitude: number } | null;
  address?: AddressData;
  onMapPress?: (event: any) => void;
  style?: any;
}

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
};

const defaultCenter = { lat: -23.5505, lng: -46.6333 }; // São Paulo

const mapOptions = {
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  zoomControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text',
      stylers: [{ visibility: 'on' }],
    },
  ],
};

const WebMapWrapper: React.FC<WebMapWrapperProps> = ({
  region,
  markerCoords,
  address,
  onMapPress,
  style,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carrega a API Key direto do .env
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  useEffect(() => {
    if (region && mapRef.current && mapLoaded) {
      const newCenter = { lat: region.latitude, lng: region.longitude };
      mapRef.current.setCenter(newCenter);
      mapRef.current.setZoom(15);
    }
  }, [region, mapLoaded]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // dispara callback para o App.tsx (mantém padrão mobile)
      onMapPress?.({
        nativeEvent: { coordinate: { latitude: lat, longitude: lng } },
      });
    }
  };

  const handleLoadError = (err: any) => {
    console.error('Erro ao carregar Google Maps:', err);
    setError('Falha ao carregar o mapa. Verifique a API Key.');
  };

  if (!apiKey) {
    return (
      <View style={[styles.mapContainer, style]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            🔑 Google Maps API Key não configurada
          </Text>
          <Text style={styles.errorSubtext}>
            Defina{' '}
            <Text style={{ fontWeight: '700' }}>GOOGLE_MAPS_API_KEY</Text> no
            arquivo .env
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.mapContainer, style]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ {error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.mapContainer, style]}>
      <LoadScript
        googleMapsApiKey={apiKey}
        onError={handleLoadError}
        onLoad={() => setMapLoaded(true)}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            region
              ? { lat: region.latitude, lng: region.longitude }
              : defaultCenter
          }
          zoom={region ? 15 : 10}
          onLoad={(map) => {
            mapRef.current = map;
            setMapLoaded(true);
          }}
          onClick={handleMapClick}
          options={mapOptions}>
          {markerCoords && mapLoaded && (
            <Marker
              position={{
                lat: markerCoords.latitude,
                lng: markerCoords.longitude,
              }}
              title="Localização Selecionada"
              label={
                address?.formatted
                  ? address.formatted.substring(0, 25) +
                    (address.formatted.length > 25 ? '...' : '')
                  : 'Clique no mapa'
              }
            />
          )}
        </GoogleMap>
      </LoadScript>

      {!mapLoaded && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Carregando mapa...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 300,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 20,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 4,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 12,
    color: '#991b1b',
    textAlign: 'center',
  },
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

export default WebMapWrapper;
