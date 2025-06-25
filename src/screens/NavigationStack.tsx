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
import Login from './public/Login';
import Header from '@components/Header';
import { useUserStore } from '@stores/User';
import { LoginPassword } from './public/LoginPassword';

// If logged in Home = Feed, otherwise Home = Login
const Home = () => {
  const { user } = useUserStore();
  return user ? <Feed /> : <Login />;
};

const RootStack = createNativeStackNavigator<NavigationParams>({
  screenOptions: {
    header: (props) => <Header {...props} />,
  },
  screens: {
    Home: {
      screen: Home,
    },
    Login: {
      screen: Login,
      linking: {
        path: 'login',
      },
      options: {
        headerShown: false,
      },
    },
    LoginPassword: {
      screen: LoginPassword,
      linking: {
        path: 'login-password',
      },
      options: {
        headerShown: false,
      },
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
        path: 'service-status/:id',
      },
    },
    PhoneConfirmation: {
      screen: PhoneConfirmation,
      options: {
        headerShown: false,
      },
    },
    ConfirmPhoneNumber: {
      screen: ConfirmPhoneNumber,
      options: {
        headerShown: false,
      },
    },
    Register: {
      screen: RegisterScreen,
      linking: {
        path: 'register',
      },
      options: {
        headerShown: false,
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
