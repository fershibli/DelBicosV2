import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useFonts } from 'expo-font';
import { Navigation } from '@screens/NavigationStack';
import { LocationProvider } from '@lib/hooks/LocationContext';
import { MenuProvider } from 'react-native-popup-menu';

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
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Global handler for unhandled promise rejections (helps debug `Uncaught (in promise) Object`)
  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.addEventListener) return;

    const onUnhandledRejection = (event: any) => {
      // log as much helpful information as possible
      // eslint-disable-next-line no-console
      console.error('[unhandledrejection] reason:', event?.reason ?? event);
      // if the reason is an AxiosError we may have a normalizedMessage
      try {
        const reason = event?.reason;
        if (reason && typeof reason === 'object') {
          // eslint-disable-next-line no-console
          console.error('[unhandledrejection] details:', reason);
        }
      } catch (e) {
        // ignore
      }
    };

    window.addEventListener('unhandledrejection', onUnhandledRejection as EventListener);
    return () => {
      window.removeEventListener('unhandledrejection', onUnhandledRejection as EventListener);
    };
  }, []);

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
