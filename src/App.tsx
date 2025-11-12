import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useFonts } from 'expo-font';
import { Navigation } from '@screens/NavigationStack';
import { LocationProvider } from '@lib/hooks/LocationContext';
import { MenuProvider } from 'react-native-popup-menu';
import { Platform } from 'react-native';
import { initGAWeb } from './utils/ga-web';

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

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
      initGAWeb();
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
      <LocationProvider>
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
    </MenuProvider>
  );
}
