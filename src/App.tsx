import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './screens';
import { LocationProvider } from './lib/util/LocationContext';

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
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
  );
}
