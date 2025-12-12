import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useFonts } from 'expo-font';
import { Navigation } from '@screens/NavigationStack';
import { LocationProvider } from '@lib/hooks/LocationContext';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider } from '@theme/ThemeProvider';
import { Platform } from 'react-native';
import { initGAWeb } from './utils/ga-web';
import { initClarityWeb } from './utils/clarity';
import { GOOGLE_ANALYTICS_ID, CLARITY_ID } from './config/varEnvs';
import VLibrasSetup from '@components/features/Accessibility/VLibrasSetup';
import { registerTokenProvider } from '@lib/helpers/httpClient';
import { useUserStore } from '@stores/User';

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

function NotificationManager() {
  return null;
}

registerTokenProvider(() => useUserStore.getState().token);

export function App() {
  const [loaded, error] = useFonts({
    'Afacad-Regular': require('@assets/fonts/Afacad/Afacad-Regular.otf'),
    'Afacad-SemiBold': require('@assets/fonts/Afacad/Afacad-SemiBold.otf'),
    'Afacad-Bold': require('@assets/fonts/Afacad/Afacad-Bold.otf'),
    'CenturyGothic-Regular': require('@assets/fonts/CenturyGothic/Century-Gothic.otf'),
    'CenturyGothic-Bold': require('@assets/fonts/CenturyGothic/Century-Gothic-Bold.otf'),
    'CenturyGothic-BoldItalic': require('@assets/fonts/CenturyGothic/Century-Gothic-Bold-Italic.otf'),
    'CenturyGothic-Italic': require('@assets/fonts/CenturyGothic/Century-Gothic-Italic.otf'),
  });

  React.useEffect(() => {
    if (Platform.OS === 'web') {
      if (GOOGLE_ANALYTICS_ID) {
        initGAWeb(GOOGLE_ANALYTICS_ID);
      } else {
        console.warn('Variável de conexão do GA não definida');
      }

      if (CLARITY_ID) {
        initClarityWeb(CLARITY_ID);
      } else {
        console.warn('Variável de conexão do Clarity não definida');
      }
    }

    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded || error) {
    return null;
  }

  return (
    <MenuProvider>
      <ThemeProvider>
        <LocationProvider>
          <VLibrasSetup />
          <NotificationManager />
          <Navigation
            linking={{
              enabled: 'auto',
              prefixes: ['delbicos://'],
            }}
            onReady={() => {
              SplashScreen.hideAsync();
            }}
          />
        </LocationProvider>
      </ThemeProvider>
    </MenuProvider>
  );
}
