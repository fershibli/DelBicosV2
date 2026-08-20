import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useFonts } from 'expo-font';
import { Navigation } from '@screens/NavigationStack';
import { navigationRef } from '@screens/navigationRef';
import { LocationProvider } from '@lib/hooks/LocationContext';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider, useColors } from '@theme/ThemeProvider';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { initGAWeb } from './utils/ga-web';
import { initClarityWeb } from './utils/clarity';
import { GOOGLE_ANALYTICS_ID, CLARITY_ID } from './config/varEnvs';
import VLibrasSetup from '@components/features/Accessibility/VLibrasSetup';
import { registerTokenProvider } from '@lib/helpers/httpClient';
import { useUserStore } from '@stores/User';
import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types';
import { ChatWidget } from '@components/features/ChatBot/ChatWidget';

Asset.loadAsync([...NavigationAssets]);

SplashScreen.preventAutoHideAsync();

function NotificationManager() {
  return null;
}

registerTokenProvider(() => useUserStore.getState().token);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

// Componente interno que vive dentro do ThemeProvider e tem acesso aos tokens de cor.
// Responsável por sincronizar StatusBar, SafeAreaView e NavigationContainer com o tema atual.
function AppContent() {
  const { theme } = useThemeStore();
  const colors = useColors();
  const { user } = useUserStore();
  const isDark = theme === ThemeMode.DARK;
  const [currentRouteName, setCurrentRouteName] = React.useState<
    string | undefined
  >();

  const syncCurrentRoute = React.useCallback(() => {
    setCurrentRouteName(navigationRef.getCurrentRoute()?.name);
  }, []);

  // Tema do NavigationContainer mapeado para os nossos tokens de cor
  const navTheme = React.useMemo(
    () => ({
      dark: isDark,
      colors: {
        primary: colors.primaryOrange,
        background: colors.secondaryGray,
        card: colors.cardBackground,
        text: colors.primaryBlack,
        border: colors.borderColor,
        notification: colors.primaryOrange,
      },
      fonts: {
        regular: { fontFamily: 'Afacad-Regular', fontWeight: '400' as const },
        medium: { fontFamily: 'Afacad-SemiBold', fontWeight: '600' as const },
        bold: { fontFamily: 'Afacad-Bold', fontWeight: '700' as const },
        heavy: { fontFamily: 'Afacad-Bold', fontWeight: '900' as const },
      },
    }),
    [isDark, colors],
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.cardBackground }]}
      edges={Platform.OS !== 'web' ? ['top', 'bottom'] : []}>
      {Platform.OS !== 'web' && (
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={colors.cardBackground}
          translucent={false}
        />
      )}
      <LocationProvider>
        <VLibrasSetup />
        <NotificationManager />
        <View style={styles.safeArea}>
          <Navigation
            ref={navigationRef}
            theme={navTheme}
            linking={{
              enabled: 'auto',
              prefixes: ['delbicos://'],
            }}
            onReady={() => {
              syncCurrentRoute();
              SplashScreen.hideAsync();
            }}
            onStateChange={syncCurrentRoute}
          />
          {/* Evita montar um segundo chat sobre a tela dedicada do assistente. */}
          {!!user && !!currentRouteName && currentRouteName !== 'ChatBot' && (
            <ChatWidget bottomOffset={Platform.OS === 'web' ? 24 : 80} />
          )}
        </View>
      </LocationProvider>
    </SafeAreaView>
  );
}

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
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <MenuProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </MenuProvider>
    </SafeAreaProvider>
  );
}
