import React from 'react';
import { View } from 'react-native';
import ProfessionalInfo from '@components/ProfessionalInfo';
import BannerStatus from '@components/BannerStatus';
import ServiceItems from '@components/ServiceItems';
import PaymentInfo from '@components/PaymentInfo';
import { styles } from './styles';

const mockServices = [
  {
    id: '1',
    name: 'Barba',
    date: '5/12/2024',
    startTime: '14:30',
    endTime: '15:00',
    price: 38.0,
    professional: 'Jefferson',
  },
  {
    id: '2',
    name: 'Corte de Cabelo',
    date: '5/12/2024',
    startTime: '15:00',
    endTime: '15:45',
    price: 45.0,
    professional: 'Jefferson',
  },
  {
    id: '3',
    name: 'Limpeza de Pele',
    date: '5/12/2024',
    startTime: '16:00',
    endTime: '16:30',
    price: 50.0,
    professional: 'Jefferson',
  },
];

const ServiceStatusScreen = () => {
  const subtotal = mockServices.reduce(
    (sum, service) => sum + service.price,
    0,
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <ProfessionalInfo />
        <BannerStatus status="Executado" />
      </View>
      <View style={styles.divider} />
      <ServiceItems items={mockServices} />
      <PaymentInfo
        total={subtotal}
        discount={40.0}
        couponCode="BARBEIRO40"
        paymentMethod="Cartão de Crédito"
        installments={6}
      />
    </View>
  );
};

export default ServiceStatusScreen;
