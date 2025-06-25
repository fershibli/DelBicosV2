import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { styles } from './styles';

interface VLibrasProps {
  forceOnload?: boolean;
}

const VLibrasComponent = ({ forceOnload }: VLibrasProps) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
        <script>
          window.onload = function() {
            new window.VLibras.Widget('https://vlibras.gov.br/app');
            ${forceOnload ? 'if (window.onload) window.onload();' : ''}
          };
        </script>
      </head>
      <body>
        <div vw="true" class="enabled">
          <div vw-access-button="true" class="active"></div>
          <div vw-plugin-wrapper="true">
            <div class="vw-plugin-top-wrapper"></div>
          </div>
        </div>
      </body>
    </html>
  `;

  useEffect(() => {
    console.log('VLibrasComponent montado com forceOnload:', forceOnload);
  }, [forceOnload]);

  return (
    <WebView
      source={{ html: htmlContent }}
      style={styles.webviewContainer}
      javaScriptEnabled={true}
      originWhitelist={['https://vlibras.gov.br', '*']}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('Erro no WebView VLibras:', nativeEvent);
      }}
      onLoad={() => console.log('WebView VLibras carregado')}
    />
  );
};

export default VLibrasComponent;
