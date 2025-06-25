import React from 'react';
import { WebView } from 'react-native-webview';
import { styles } from './styles';

const VLibrasComponent = () => {
  return (
    <WebView
      source={{ uri: 'https://vlibras.gov.br/app' }} // Carrega a página oficial
      style={styles.webviewContainer}
      javaScriptEnabled={true}
      originWhitelist={['https://vlibras.gov.br', '*']}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('Erro no WebView:', nativeEvent);
      }}
    />
  );
};

export default VLibrasComponent;
