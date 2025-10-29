import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles as globalStyles } from '../../lib/utils/styles';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class MapErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('MapErrorBoundary capturou erro:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <View style={[globalStyles.mapContainer, styles.errorContainer]}>
            <View style={styles.errorContent}>
              <Text style={styles.errorTitle}>🗺️ Mapa Indisponível</Text>
              <Text style={styles.errorText}>
                Erro ao carregar o mapa nativo
              </Text>
              <Text style={styles.errorSubtext}>
                A funcionalidade de geolocalização continua funcionando
              </Text>
            </View>
          </View>
        )
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
  },
  errorContent: {
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#991b1b',
    textAlign: 'center',
    marginBottom: 4,
  },
  errorSubtext: {
    fontSize: 12,
    color: '#7f1d1d',
    textAlign: 'center',
  },
});
