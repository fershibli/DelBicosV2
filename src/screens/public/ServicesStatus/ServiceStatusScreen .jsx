import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '@components/header';
import ProfessionalInfo from '@components/ProfessionalInfo';
import BannerStatus from '@components/BannerStatus';
import ServiceItems from '@components/ServiceItems';
import PaymentInfo from '@components/PaymentInfo';
import styles from '@components/styles';

const ServiceStatusScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ProfessionalInfo />
      <View style={styles.divider} />
      <BannerStatus  status="Cancelado"/>
      <ServiceItems />
      <PaymentInfo />
    </View>
  );
};

export default ServiceStatusScreen;