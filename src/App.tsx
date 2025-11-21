import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useFonts } from 'expo-font';
import { Navigation } from '@screens/NavigationStack';
import { LocationProvider } from '@lib/hooks/LocationContext';
import { MenuProvider } from 'react-native-popup-menu';
import { Platform, View } from 'react-native';
import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types';
import colors from '@theme/colors';
import { initGAWeb } from './utils/ga-web';
import { initClarityWeb } from './utils/clarity';
import { GOOGLE_ANALYTICS_ID, CLARITY_ID } from './config/varEnvs';

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
      <LocationProvider>
        <InnerNavigation />
      </LocationProvider>
    </MenuProvider>
  );
}

function InnerNavigation() {
  const { theme } = useThemeStore();
  const isDark = theme === ThemeMode.DARK;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.primaryWhite : colors.secondaryGray,
      }}>
      <Navigation
        linking={{
          enabled: 'auto',
          prefixes: ['delbicos://'],
        }}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
    </View>
  );
}
