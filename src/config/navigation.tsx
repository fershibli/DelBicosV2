import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from '../screens/public/LoadingScreen';
import ConfirmNumberScreen from '../screens/public/ConfirmNumberScreen';
import ConfirmCodeScreen from '../screens/public/ConfirmCodeScreen';
import RegisterScreen from '../screens/public/RegisterScreen';
import HomeScreen from '../screens/private/client/HomeScreen';

export type RootStackParamList = {
  Loading: undefined;
  ConfirmNumber: undefined;
  ConfirmCode: { phoneNumber: string };
  Register: { phoneNumber: string };
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmNumber" component={ConfirmNumberScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;