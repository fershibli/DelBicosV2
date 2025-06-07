import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feed from './public/Feed';
import NotFound from './public/NotFound';
import PhoneConfirmation from './public/PhoneConfirmation';
import ConfirmPhoneNumber from './public/ConfirmPhoneNumber';
import RegisterScreen from './public/RegisterScreen';
import PartnerProfile from './public/PartnerProfile';
import ServiceStatusScreen from './public/ServicesStatus';
import { NavigationParams } from './types';
import Home from './public/Home';

const RootStack = createNativeStackNavigator<NavigationParams>({
  screens: {
    Home: {
      // Alterado de 'Loading' para 'Home'
      screen: Home,
      options: {
        headerShown: false,
      },
    },
    Feed: {
      screen: Feed,
      linking: {
        path: 'feed',
      },
      options: {
        headerShown: false,
      },
    },
    PartnerProfile: {
      screen: PartnerProfile,
      linking: {
        path: 'partner/:id',
        parse: {
          id: (value) => value,
        },
        stringify: {
          id: (value) => value,
        },
      },
    },
    ServiceStatus: {
      screen: ServiceStatusScreen,
      linking: {
        path: 'service-status',
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
      linking: {
        path: 'register',
      },
      options: {
        title: 'Cadastre-se',
        headerStyle: { backgroundColor: '#e6f0fa' },
        headerTintColor: '#003366',
        headerTitleStyle: { fontWeight: 'bold' },
      },
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
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
