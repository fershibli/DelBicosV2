import React from 'react';
import { Platform } from 'react-native';
import RegisterScreen from './RegisterScreen';
import RegisterScreenWeb from './RegisterScreen.web';
import { LocationProvider } from '@lib/hooks/LocationContext';

const RegisterScreenSelector: React.FC = () => {
  const isWeb = Platform.OS === 'web';

  return (
    <LocationProvider>
      {isWeb ? <RegisterScreenWeb /> : <RegisterScreen />}
    </LocationProvider>
  );
};

export default RegisterScreenSelector;
