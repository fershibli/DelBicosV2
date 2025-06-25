import React from 'react';
import { WebView } from 'react-native-webview';
import { styles } from './styles';

const VLibrasComponent = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
        <script>
          new window.VLibras.Widget('https://vlibras.gov.br/app');
        </script>
      </head>
      <body>
        <div id="vlibras"></div>
      </body>
    </html>
  `;

  return (
    <WebView
      source={{ html: htmlContent }}
      style={styles.webviewContainer}
      javaScriptEnabled={true}
      originWhitelist={['*']}
    />
  );
};

export default VLibrasComponent;
