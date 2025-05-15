import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import styles from '../styles';

const LocationMap = () => {
  const initialRegion = {
    latitude: -23.5017,
    longitude: -47.4581,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        scrollEnabled={false}
        zoomEnabled={false}
      >
        <MapView.Marker
          coordinate={{
            latitude: -23.5017,
            longitude: -47.4581,
          }}
          title="Local do Serviço"
          description="Rua Mascarenhas Camelo, 571"
        />
      </MapView>
    </View>
  );
};

export default LocationMap;