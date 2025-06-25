import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ProfessionalInfo from '@components/ProfessionalInfo';
import BannerStatus from '@components/BannerStatus';
import ServiceItems from '@components/ServiceItems';
import PaymentInfo from '@components/PaymentInfo';
import { styles } from './styles';
import { useAppointmentStore } from '@stores/Appointments/AppointmentStore';
import { useProfessionalDetailsStore } from '@stores/Professional/Professional';
import { useServiceStore } from '@stores/Service/Services';

const ServiceStatusScreen = () => {
  const route = useRoute();
  const [service, setService] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const appointmentId =
    route.params?.appointmentId ||
    (route.params?.id ? Number(route.params.id) : 1);

  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const { getAppointmentById } = useAppointmentStore();
  const { professional, fetchProfessionalById } = useProfessionalDetailsStore();
  const { service: serviceDetails, fetchServiceById } = useServiceStore(); // Obtenha a store de serviços

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

        await fetchProfessionalById(appointment.professional_id.toString());

        await fetchServiceById(appointment.service_id);

        const formattedService = {
          id: appointment.service_id,
          name: appointment.service_title || 'Serviço',
          title:
            serviceDetails?.title || appointment.service_title || 'Serviço',
          description: serviceDetails?.description || '',
          bannerImg: serviceDetails?.bannerImg,
          duration: serviceDetails?.duration,
          date: new Date(appointment.start_time).toLocaleDateString('pt-BR'),
          startTime: new Date(appointment.start_time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          endTime: new Date(appointment.end_time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          price: Number(serviceDetails.price || 0),
        };

        setService(formattedService);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    appointmentId,
    getAppointmentById,
    fetchProfessionalById,
    fetchServiceById,
    serviceDetails,
  ]);

  const subtotal = service ? service.price : 0;

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
          professional={{
            name: professional?.User?.name || 'Profissional não encontrado',
            avatarImg: professional?.User?.avatarImg,
          }}
          appointmentDate={appointmentDate}
          appointmentTime={appointmentTime}
        />
        <BannerStatus status={status} />
      </View>
      <View style={styles.divider} />
      {service && (
        <ServiceItems
          items={[
            {
              id: service.id,
              title: service.title,
              description: service.description,
              bannerImg: service.bannerImg,
              price: service.price,
              duration: service.duration,
              date: service.date,
              startTime: service.startTime,
              endTime: service.endTime,
              professional: professional?.User?.name,
            },
          ]}
        />
      )}
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
