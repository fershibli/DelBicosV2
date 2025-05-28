import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '@components/header';
import ProfessionalInfo from '@components/ProfessionalInfo';
import BannerStatus from '@components/BannerStatus';
import ServiceItems from '@components/ServiceItems';
import PaymentInfo from '@components/PaymentInfo';
import styles from '@components/styles';

const mockServices = [
  {
    id: '1',
    name: 'Barba',
    date: '5/12/2024',
    startTime: '14:30',
    endTime: '15:00',
    price: 38.00,
    professional: 'Jefferson'
  },
  {
    id: '2',
    name: 'Corte de Cabelo',
    date: '5/12/2024',
    startTime: '15:00',
    endTime: '15:45',
    price: 45.00,
    professional: 'Jefferson'
  }
];

const ServiceStatusScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ProfessionalInfo />
      <View style={styles.divider} />
      <BannerStatus  status="Executado"/>
      <ServiceItems />
      <PaymentInfo />
    </View>
  );
};

export default ServiceStatusScreen;