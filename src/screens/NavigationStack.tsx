import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Platform, Image } from 'react-native';
import Feed from './public/Feed';
import NotFound from './public/NotFound';
import RegisterScreen from './public/RegisterScreen';
import VerificationScreen from './public/VerificationScreen';
import PartnerProfile from './public/PartnerProfile';
import { NavigationParams } from './types';
import Login from './public/Login';
import Header from '@components/layout/Header';
import { useUserStore } from '@stores/User';
import { LoginPassword } from './public/LoginPassword';
import CategoryScreen from './public/Category';
import SubCategoryScreen from './public/SubCategoryScreen';
import SearchResultScreen from './public/SearchResultScreen';
import CheckoutScreen from './public/CheckoutScreen/CheckoutScreen';
import PaymentStatusScreen from './public/PaymentStatusScreen';
import MySchedulesScreen from './private/client/MySchedulesScreen';
import HelpScreen from '@screens/public/HelpScreen';
import AdminDashboard from './private/admin/AdminDashboard';
import AdminAnalytics from './private/admin/AdminAnalytics';
import ProfessionalDashboard from './private/ProfessionalDashboard';
import ProfileScreen from '@screens/private/client/Profile/Tabs/ProfileScreen';

import ProfessionalEarningsScreen from './private/ProfessionalEarningsScreen/ProfessionalEarningsScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { user } = useUserStore();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.OS === 'web' ? { display: 'none' } : {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#FF6F00', // primaryOrange
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontFamily: 'Afacad-SemiBold',
          fontSize: 12,
        }
      }}
    >
      <Tab.Screen 
        name="FeedTab" 
        component={Feed} 
        options={{ title: 'Início', tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} /> }} 
      />
      <Tab.Screen 
        name="CategoryTab" 
        component={CategoryScreen} 
        options={{ title: 'Buscar', tabBarIcon: ({ color, size }) => <FontAwesome name="search" size={size} color={color} /> }} 
      />
      <Tab.Screen 
        name="SchedulesTab" 
        component={MySchedulesScreen} 
        options={{ title: 'Agenda', tabBarIcon: ({ color, size }) => <FontAwesome name="calendar-o" size={size} color={color} /> }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{ 
          title: 'Perfil', 
          tabBarIcon: ({ color, size }) => 
            user?.avatar_uri ? (
              <Image 
                source={{ uri: user.avatar_uri }} 
                style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 1, borderColor: color }} 
              />
            ) : (
              <FontAwesome name="user-o" size={size} color={color} />
            ) 
        }} 
      />
    </Tab.Navigator>
  );
};

const ProfessionalTabs = () => {
  const { user } = useUserStore();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.OS === 'web' ? { display: 'none' } : {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#FF6F00',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontFamily: 'Afacad-SemiBold',
          fontSize: 12,
        }
      }}
    >
      <Tab.Screen 
        name="ProfessionalHomeTab" 
        component={ProfessionalDashboard} 
        options={{ title: 'Início', tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} /> }} 
      />
      <Tab.Screen 
        name="ProfessionalSchedulesTab" 
        component={MySchedulesScreen} 
        options={{ title: 'Agenda', tabBarIcon: ({ color, size }) => <FontAwesome name="calendar-o" size={size} color={color} /> }} 
      />
      <Tab.Screen 
        name="ProfessionalEarningsTab" 
        component={ProfessionalEarningsScreen} 
        options={{ title: 'Saldo', tabBarIcon: ({ color, size }) => <FontAwesome name="dollar" size={size} color={color} /> }} 
      />
      <Tab.Screen 
        name="ProfessionalProfileTab" 
        component={ProfileScreen} 
        options={{ 
          title: 'Perfil', 
          tabBarIcon: ({ color, size }) => 
            user?.avatar_uri ? (
              <Image 
                source={{ uri: user.avatar_uri }} 
                style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 1, borderColor: color }} 
              />
            ) : (
              <FontAwesome name="user-o" size={size} color={color} />
            ) 
        }} 
      />
    </Tab.Navigator>
  );
};

// If logged in Home = MainTabs (mobile) or Feed (web), otherwise Home = Login
const Home = () => {
  const { user } = useUserStore();
  return user ? (Platform.OS === 'web' ? <Feed /> : <MainTabs />) : <Login />;
};

const RootStack = createNativeStackNavigator<NavigationParams>({
  screenOptions: {
    header: (props) => <Header {...props} />,
  },
  screens: {
    Home: {
      screen: Home,
    },
    MainTabs: {
      screen: MainTabs,
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
        // Use wildcard so any nested path under client-profile is handled by the app
        path: 'client-profile/*',
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
    ProfessionalTabs: {
      screen: ProfessionalTabs,
      options: {
        headerShown: false,
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
      linking: {
        path: 'admin-dashboard',
      },
      options: {
        title: 'Admin',
      },
    },
    AdminAnalytics: {
      screen: AdminAnalytics,
      linking: {
        path: 'admin-analytics',
      },
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
