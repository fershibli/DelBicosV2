import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../lib/utils/styles';

interface ErrorDisplayProps {
  error: string | null;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
}) => {
  if (!error) return null;

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>❌ {error}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>🔄 Tentar Novamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
