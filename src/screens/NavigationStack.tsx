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
import VerificationScreen from './public/VerificationScreen';
import PartnerProfile from './public/PartnerProfile';
import { NavigationParams } from './types';
import Login from './public/Login';
import Header from '@components/layout/Header';
import { useUserStore } from '@stores/User';
import { LoginPassword } from './public/LoginPassword';
import ProfileScreen from './private/client/Profile';
import CategoryScreen from './public/Category';
import SubCategoryScreen from './public/SubCategoryScreen';
import SearchResultScreen from './public/SearchResultScreen';
import CheckoutScreen from './public/CheckoutScreen';
import PaymentStatusScreen from './public/PaymentStatusScreen';
import MySchedulesScreen from './private/client/MySchedulesScreen';
import HelpScreen from '@screens/public/HelpScreen';
import AdminDashboard from './private/Admin/AdminDashboard';
import AdminAnalytics from './private/Admin/AdminAnalytics';
import ProviderDashboard from './private/ProviderDashboard';

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
    VerificationScreen: {
      screen: VerificationScreen,
      options: {
        headerShown: false, // Para manter a consistência com as telas de login/registro
      },
    },
    ClientProfile: {
      screen: ProfileScreen,
      linking: {
        path: 'client-profile',
      },
    },
    NotFound: {
      screen: NotFound,
      linking: {
        path: '*',
      },
    },
    Category: {
      screen: CategoryScreen,
      linking: {
        path: 'categories',
      },
      options: {
        title: 'Categorias', // Título que pode ser usado pelo Header
      },
    },
    SubCategoryScreen: {
      screen: SubCategoryScreen,
      linking: {
        path: 'category/:categoryId',
        parse: {
          categoryId: (value) => Number(value), // Converte o ID da URL para número
        },
      },
      options: {
        title: 'Serviços',
      },
    },
    SearchResult: {
      screen: SearchResultScreen,
      linking: {
        path: 'search', // A URL será algo como /search?subcategory=...&date=...
      },
      options: {
        title: 'Resultados da Busca',
      },
    },
    Checkout: {
      screen: CheckoutScreen,
      linking: {
        path: 'checkout', // A URL será algo como /checkout?professionalId=...&time=...
      },
      options: {
        headerShown: false, // Opcional: Esconde o header padrão
      },
    },
    PaymentStatus: {
      screen: PaymentStatusScreen,
      linking: {
        path: 'payment-status', // <-- Esta é a URL de retorno
      },
      options: {
        headerShown: false, // Sem header
      },
    },
    MySchedules: {
      screen: MySchedulesScreen,
      options: {
        title: 'Meus Agendamentos',
      },
    },
    ProviderDashboard: {
      screen: ProviderDashboard,
      options: {
        title: 'Painel do Prestador',
      },
    },
    Help: {
      screen: HelpScreen,
      options: {
        title: 'Central de Ajuda',
      },
    },
    AdminDashboard: {
      screen: AdminDashboard,
      options: {
        title: 'Admin',
      },
    },
    AdminAnalytics: {
      screen: AdminAnalytics,
      options: {
        title: 'Analytics',
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
