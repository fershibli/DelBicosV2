import React from 'react';
import { Platform } from 'react-native';
import MapRenderer from '../MapRenderer';
import { MapComponentProps } from '@lib/hooks/types';
import { createStyles } from '@lib/utils/styles';
import { useColors } from '@theme/ThemeProvider';

export const MapComponent: React.FC<MapComponentProps> = ({
  region,
  markerCoords,
  address,
  onMapPress,
}) => {
  const colors = useColors();
  const styles = createStyles(colors);

  return (
    <MapRenderer
      region={region}
      markerCoords={markerCoords}
      address={address}
      onMapPress={onMapPress}
      style={Platform.OS === 'web' ? styles.mapContainer : undefined}
    />
  );
};
