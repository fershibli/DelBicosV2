import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../config/navigation';
import { useAuthStore } from '../../stores/authStore';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const useAuth = () => {
  const navigation = useNavigation<NavigationProp>();
  const { phoneNumber, setPhoneNumber } = useAuthStore();

  useEffect(() => {
    if (!phoneNumber) {
      navigation.navigate('ConfirmNumber');
    }
  }, [phoneNumber, navigation]);

  return { phoneNumber, setPhoneNumber };
};