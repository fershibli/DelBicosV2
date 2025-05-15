import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Components/header';
import ProfessionalInfo from './Components/ProfessionalInfo';
import BannerStatus from './Components/BannerStatus';
import ServiceItems from './Components/ServiceItems';
import PaymentInfo from './Components/PaymentInfo';
import styles from './styles';

const ServiceStatusScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ProfessionalInfo />
      <View style={styles.divider} />
      <BannerStatus />
      <ServiceItems />
      <PaymentInfo />
    </View>
  );
};

export default ServiceStatusScreen;