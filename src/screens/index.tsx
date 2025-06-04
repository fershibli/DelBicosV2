import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Loading } from './LoadingScreen';
import { Home } from './Home'; // Adicionando a Home que foi criada anteriormente
import { Profile } from './Profile';
import { Settings } from './Settings';
import { Updates } from './Updates';
import { NotFound } from './NotFound';
import { PhoneConfirmation } from './PhoneConfirmation';
import { ConfirmPhoneNumber } from './ConfirmPhoneNumber';
import { RegisterScreen } from './RegisterScreen';
import ServiceStatusScreen from './public/ServicesStatus/ServiceStatusScreen';

const LoadingTabs = createNativeStackNavigator({
  screens: {
    Loading: {
      screen: Loading,
      options: {
        headerShown: false,
      },
    },
  },
});

const TabNavigator = createBottomTabNavigator({
  screens: {
    Home: {
      // Alterado de 'Loading' para 'Home'
      screen: Home,
      options: {
        title: 'Feed',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Updates: {
      screen: Updates,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    LoadingTabs: {
      screen: LoadingTabs,
      options: {
        title: 'Loading',
        headerShown: false,
      },
    },
    Home: {
      // Alterado de 'Loading' para 'Home' para refletir o fluxo correto
      screen: TabNavigator,
      options: {
        headerShown: false,
      },
    },
    ServiceStatus: {
      screen: ServiceStatusScreen,
      linking: {
        path: 'service-status',
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
    PhoneConfirmation: {
      screen: PhoneConfirmation,
      options: {
        title: 'Acesse sua conta',
        headerStyle: { backgroundColor: '#e6f0fa' },
        headerTintColor: '#003366',
        headerTitleStyle: { fontWeight: 'bold' },
      },
    },
    ConfirmPhoneNumber: {
      screen: ConfirmPhoneNumber,
      options: {
        title: 'Confirme seu número',
        headerStyle: { backgroundColor: '#e6f0fa' },
        headerTintColor: '#003366',
        headerTitleStyle: { fontWeight: 'bold' },
      },
    },
    Register: {
      screen: RegisterScreen,
      options: {
        title: 'Cadastre-se',
        headerStyle: { backgroundColor: '#e6f0fa' },
        headerTintColor: '#003366',
        headerTitleStyle: { fontWeight: 'bold' },
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
