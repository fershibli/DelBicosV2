import React from 'react';
import { Platform } from 'react-native';
import MapRenderer from '../MapRenderer';
import { MapComponentProps } from '@lib/hooks/types';
import { styles as globalStyles } from '@lib/utils/styles';

export const MapComponent: React.FC<MapComponentProps> = ({
  region,
  markerCoords,
  address,
  onMapPress,
}) => {
  return (
    <MapRenderer
      region={region}
      markerCoords={markerCoords}
      address={address}
      onMapPress={onMapPress}
      style={Platform.OS === 'web' ? globalStyles.mapContainer : undefined}
    />
  );
};
