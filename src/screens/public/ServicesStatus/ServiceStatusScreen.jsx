import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import ProfessionalInfo from '@components/ProfessionalInfo';
import BannerStatus from '@components/BannerStatus';
import ServiceItems from '@components/ServiceItems';
import PaymentInfo from '@components/PaymentInfo';
import { styles } from './styles';
import { useAppointmentStore } from '@stores/Appointments/AppointmentStore';
import { useProfessionalDetailsStore } from '@stores/Professional/professionalDetails';

const ServiceStatusScreen = ({ route }) => {
  const [services, setServices] = useState([]);
  const [professional, setProfessional] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const appointmentId = route?.params?.appointmentId || 1;
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const { getAppointmentById } = useAppointmentStore();
  const { getProfessionalById } = useProfessionalDetailsStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointment = await getAppointmentById(appointmentId);
        setStatus(appointment.status);

        const createdAt = new Date(appointment.createdAt);
        setAppointmentDate(createdAt.toLocaleDateString('pt-BR'));
        setAppointmentTime(
          createdAt.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        );

        const professionalData = await getProfessionalById(appointment.professional_id);
        const user = professionalData.User;

        const formattedService = {
          id: appointment.service_id,
          name: appointment.service_title || 'Serviço',
          date: new Date(appointment.start_time).toLocaleDateString(),
          startTime: new Date(appointment.start_time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          endTime: new Date(appointment.end_time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          price: Number(appointment.service_price || 0),
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
  }, [appointmentId, getAppointmentById, getProfessionalById]);

  const subtotal = services.reduce((sum, s) => sum + s.price, 0);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
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