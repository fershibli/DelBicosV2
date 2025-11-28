import React, { Component, ReactNode, ErrorInfo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    // Atualiza o estado para que a próxima renderização mostre a UI alternativa.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Você pode registrar o erro em um serviço de relatório de erros (ex: Sentry)
    console.error('MapErrorBoundary capturou erro:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          // Removi 'globalStyles.mapContainer' pois não estava definido
          <View style={styles.errorContainer}>
            <View style={styles.errorContent}>
              <Text style={styles.errorTitle}>🗺️ Mapa Indisponível</Text>
              <Text style={styles.errorText}>
                Erro ao carregar o mapa nativo.
              </Text>
              <Text style={styles.errorSubtext}>
                A funcionalidade de geolocalização continua funcionando em
                segundo plano.
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
    flex: 1, // Garante que ocupe o espaço do mapa
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderRadius: 8, // Borda arredondada para ficar bonito dentro do card
    minHeight: 200, // Altura mínima caso o flex falhe
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

export default MapErrorBoundary;
