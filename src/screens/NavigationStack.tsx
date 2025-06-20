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
import Header from '@components/Header';

const RootStack = createNativeStackNavigator<NavigationParams>({
  screenOptions: {
    header: (props) => <Header {...props} />,
  },
  screens: {
    Home: {
      // Alterado de 'Loading' para 'Home'
      screen: Home,
    },
    Feed: {
      screen: Feed,
      linking: {
        path: 'feed',
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
    },
    ConfirmPhoneNumber: {
      screen: ConfirmPhoneNumber,
    },
    Register: {
      screen: RegisterScreen,
      linking: {
        path: 'register',
      },
    },
    NotFound: {
      screen: NotFound,
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
