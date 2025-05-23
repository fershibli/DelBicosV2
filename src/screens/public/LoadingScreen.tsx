import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../config/navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Loading'>;

const LoadingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('ConfirmNumber');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#1E88E5" style={styles.loading} />
      <Text style={styles.title}>DelBicos</Text>
      <Text style={styles.message}>Agende todo tipo de serviço, hoje mesmo!</Text>
      <Text style={styles.subtitle}>Profissionais a um clique!</Text>
      <Text style={styles.footer}>© DelBicos - 2024 - Todos os direitos reservados</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5A623',
  },
  logoImage: {
    width: wp('30%'),
    height: wp('30%'),
    marginBottom: hp('2%'),
  },
  loading: {
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: wp('6%'),
    marginBottom: hp('1%'),
  },
  message: {
    fontSize: wp('4%'),
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: wp('3.5%'),
    marginBottom: hp('5%'),
  },
  footer: {
    position: 'absolute',
    bottom: hp('2%'),
    color: '#FFFFFF',
    fontSize: wp('3%'),
  },
});

export default LoadingScreen;