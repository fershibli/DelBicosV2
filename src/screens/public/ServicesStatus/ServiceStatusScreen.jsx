import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import ProfessionalInfo from '@components/ProfessionalInfo';
import BannerStatus from '@components/BannerStatus';
import ServiceItems from '@components/ServiceItems';
import PaymentInfo from '@components/PaymentInfo';
import { styles } from './styles';

const ServiceStatusScreen = ({ route }) => {
  const [services, setServices] = useState([]);
  const [professional, setProfessional] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const appointmentId = route?.params?.appointmentId || 1;
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

useEffect(() => {
  const fetchData = async () => {
    try {
      const { data: appointment } = await axios.get(`http://localhost:3000/api/appointments/${appointmentId}`);
      setStatus(appointment.status);

      const createdAt = new Date(appointment.createdAt);
      setAppointmentDate(createdAt.toLocaleDateString('pt-BR'));
      setAppointmentTime(createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

      const { data: service } = await axios.get(`http://localhost:3000/api/services/${appointment.service_id}`);
      const { data: professional } = await axios.get(`http://localhost:3000/api/professionals/${appointment.professional_id}`);
      const user = professional.User;

      const formattedService = {
        id: service.id,
        name: service.title,
        date: new Date(appointment.start_time).toLocaleDateString(),
        startTime: new Date(appointment.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: new Date(appointment.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: Number(service.price),
        professional: user.name,
      };

      setServices([formattedService]);
      setProfessional(user);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [appointmentId]);

  const subtotal = services.reduce((sum, s) => sum + s.price, 0);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <ProfessionalInfo 
          professional={professional}
          appointmentDate={appointmentDate}
          appointmentTime={appointmentTime}
        />
        <BannerStatus status={status} />
      </View>
      <View style={styles.divider} />
      <ServiceItems items={services} />
      <PaymentInfo
        total={subtotal}
        discount={0}
        couponCode={null}
        paymentMethod="Cartão de Crédito"
        installments={1}
      />
    </View>
  );
};

export default ServiceStatusScreen;
