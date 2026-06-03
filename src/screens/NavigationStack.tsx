import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocation } from '@lib/hooks/LocationContext';
import { useColors } from '@theme/ThemeProvider';
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
import AboutUsScreen from '@screens/public/AboutUs';
import AdminDashboard from './private/admin/AdminDashboard';
import AdminAnalytics from './private/admin/AdminAnalytics';
import ProfessionalDashboard from './private/ProfessionalDashboard';
import ProfileScreen from '@screens/private/client/Profile/Tabs/ProfileScreen';

import ProfessionalEarningsScreen from './private/ProfessionalEarningsScreen/ProfessionalEarningsScreen';
import ServicesListScreen from '@screens/private/professional/Services/ServicesList';
import AvailabilityListScreen from '@screens/private/professional/Availability/AvailabilityList';
import ProfessionalRadiusScreen from '@screens/private/professional/RadiusScreen/ProfessionalRadiusScreen';
import ChatListScreen from '@screens/private/chat/ChatListScreen';
import ChatThreadScreen from '@screens/private/chat/ChatThreadScreen';

const Tab = createBottomTabNavigator();
const FeedStack = createNativeStackNavigator();
const FeedStackScreen = () => (
  <FeedStack.Navigator screenOptions={{ headerShown: false }}>
    <FeedStack.Screen name="Feed" component={Feed} />
    <FeedStack.Screen name="PartnerProfile" component={PartnerProfile} />
    <FeedStack.Screen name="SubCategoryScreen" component={SubCategoryScreen} />
    <FeedStack.Screen name="SearchResult" component={SearchResultScreen} />
    <FeedStack.Screen name="Checkout" component={CheckoutScreen} />
    <FeedStack.Screen name="PaymentStatus" component={PaymentStatusScreen} />
    <FeedStack.Screen name="ChatThread" component={ChatThreadScreen} />
  </FeedStack.Navigator>
);

const CategoryStack = createNativeStackNavigator();
const CategoryStackScreen = () => (
  <CategoryStack.Navigator screenOptions={{ headerShown: false }}>
    <CategoryStack.Screen name="Category" component={CategoryScreen} />
    <CategoryStack.Screen
      name="SubCategoryScreen"
      component={SubCategoryScreen}
    />
    <CategoryStack.Screen name="SearchResult" component={SearchResultScreen} />
    <CategoryStack.Screen name="PartnerProfile" component={PartnerProfile} />
    <CategoryStack.Screen name="Checkout" component={CheckoutScreen} />
    <CategoryStack.Screen
      name="PaymentStatus"
      component={PaymentStatusScreen}
    />
    <CategoryStack.Screen name="ChatThread" component={ChatThreadScreen} />
  </CategoryStack.Navigator>
);

const SchedulesStack = createNativeStackNavigator();
const SchedulesStackScreen = () => (
  <SchedulesStack.Navigator screenOptions={{ headerShown: false }}>
    <SchedulesStack.Screen name="MySchedules" component={MySchedulesScreen} />
    <SchedulesStack.Screen name="ChatThread" component={ChatThreadScreen} />
    <SchedulesStack.Screen name="PartnerProfile" component={PartnerProfile} />
  </SchedulesStack.Navigator>
);

const ProfileStack = createNativeStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="Help" component={HelpScreen} />
    <ProfileStack.Screen name="AboutUs" component={AboutUsScreen} />
    <ProfileStack.Screen name="AdminDashboard" component={AdminDashboard} />
    <ProfileStack.Screen name="AdminAnalytics" component={AdminAnalytics} />
    <ProfileStack.Screen
      name="ProfessionalArea"
      component={ProfessionalRadiusScreen}
    />
    <ProfileStack.Screen
      name="ProfessionalServices"
      component={ServicesListScreen}
    />
    <ProfileStack.Screen
      name="ProfessionalAvailability"
      component={AvailabilityListScreen}
    />
    <ProfileStack.Screen
      name="ProfessionalEarnings"
      component={ProfessionalEarningsScreen}
    />
    <ProfileStack.Screen name="ChatList" component={ChatListScreen} />
    <ProfileStack.Screen name="ChatThread" component={ChatThreadScreen} />
    <ProfileStack.Screen name="PartnerProfile" component={PartnerProfile} />
  </ProfileStack.Navigator>
);

const MainTabs = () => {
  const { user } = useUserStore();
  const colors = useColors();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.cardBackground }}
      edges={['top', 'bottom']}>
      <Tab.Navigator
        tabBar={Platform.OS === 'web' ? () => null : undefined}
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: colors.cardBackground },
          tabBarStyle:
            Platform.OS === 'web'
              ? { display: 'none' }
              : {
                  backgroundColor: colors.cardBackground,
                  borderTopWidth: 1,
                  borderTopColor: colors.borderColor,
                  height: 60,
                  paddingBottom: 8,
                  paddingTop: 8,
                },
          tabBarActiveTintColor: colors.primaryOrange,
          tabBarInactiveTintColor: colors.textTertiary,
          tabBarLabelStyle: {
            fontFamily: 'Afacad-SemiBold',
            fontSize: 12,
          },
        }}>
        <Tab.Screen
          name="FeedTab"
          component={FeedStackScreen}
          options={{
            title: 'Início',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="CategoryTab"
          component={CategoryStackScreen}
          options={{
            title: 'Buscar',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="SchedulesTab"
          component={SchedulesStackScreen}
          options={{
            title: 'Agenda',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="calendar-o" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackScreen}
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }) =>
              user?.avatar_uri ? (
                <Image
                  source={{ uri: user.avatar_uri }}
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: 1,
                    borderColor: color,
                  }}
                />
              ) : (
                <FontAwesome name="user-o" size={size} color={color} />
              ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const ProfessionalTabs = () => {
  const { user } = useUserStore();
  const colors = useColors();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.cardBackground }}
      edges={['top', 'bottom']}>
      <Tab.Navigator
        tabBar={Platform.OS === 'web' ? () => null : undefined}
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: colors.cardBackground },
          tabBarStyle:
            Platform.OS === 'web'
              ? { display: 'none' }
              : {
                  backgroundColor: colors.cardBackground,
                  borderTopWidth: 1,
                  borderTopColor: colors.borderColor,
                  height: 60,
                  paddingBottom: 8,
                  paddingTop: 8,
                },
          tabBarActiveTintColor: colors.primaryOrange,
          tabBarInactiveTintColor: colors.textTertiary,
          tabBarLabelStyle: {
            fontFamily: 'Afacad-SemiBold',
            fontSize: 12,
          },
        }}>
        <Tab.Screen
          name="ProfessionalHomeTab"
          component={ProfessionalDashboard}
          options={{
            title: 'Início',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfessionalSchedulesTab"
          component={MySchedulesScreen}
          options={{
            title: 'Agenda',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="calendar-o" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfessionalEarningsTab"
          component={ProfessionalEarningsScreen}
          options={{
            title: 'Saldo',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="dollar" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="ProfessionalProfileTab"
          component={ProfileStackScreen}
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }) =>
              user?.avatar_uri ? (
                <Image
                  source={{ uri: user.avatar_uri }}
                  style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderWidth: 1,
                    borderColor: color,
                  }}
                />
              ) : (
                <FontAwesome name="user-o" size={size} color={color} />
              ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

// If logged in or location selected, Home = MainTabs/ProfessionalTabs (mobile) or Feed (web), otherwise Home = Login
const Home = () => {
  const { user, activeRole } = useUserStore();
  const { city } = useLocation();
  const hasAccess = user || city;

  if (!hasAccess) {
    return <Login />;
  }

  if (Platform.OS === 'web') {
    return <Feed />;
  }

  if (activeRole === 'professional' && user?.professional_id) {
    return <ProfessionalTabs />;
  }

  return <MainTabs />;
};

const RootStack = createNativeStackNavigator({
  screenOptions: {
    header:
      Platform.OS === 'web' ? (props) => <Header {...props} /> : undefined,
    headerShown: Platform.OS === 'web',
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
    AboutUs: {
      screen: AboutUsScreen,
      linking: {
        path: 'about-us',
      },
      options: {
        title: 'Sobre Nós',
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
    ProfessionalArea: {
      screen: ProfessionalRadiusScreen,
      options: {
        title: 'Área de Atendimento',
      },
    },
    ChatList: {
      screen: ChatListScreen,
      linking: {
        path: 'chats',
      },
      options: {
        title: 'Conversas',
      },
    },
    ChatThread: {
      screen: ChatThreadScreen,
      linking: {
        path: 'chat/:roomId',
        parse: {
          roomId: (value: string) => Number(value),
        },
      },
      options: {
        headerShown: false,
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = NavigationParams;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
