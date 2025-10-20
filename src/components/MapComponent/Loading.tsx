import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { styles } from '../../lib/utils/styles';

interface LoadingIndicatorProps {
  loading: boolean;
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  loading, 
  message = 'Localizando...' 
}) => {
  if (!loading) return null;

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};