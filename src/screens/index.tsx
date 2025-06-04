import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import newspaper from '../assets/newspaper.png';
import { Loading } from './LoadingScreen';
import Home from './public/Home';
import NotFound from './public/NotFound';
import PhoneConfirmation from './public/PhoneConfirmation';
import ConfirmPhoneNumber from './public/ConfirmPhoneNumber';
import RegisterScreen from './public/RegisterScreen';
import PartnerProfile from './public/PartnerProfile';
import ServiceStatusScreen from './public/ServicesStatus/ServiceStatusScreen ';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: Home,
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
