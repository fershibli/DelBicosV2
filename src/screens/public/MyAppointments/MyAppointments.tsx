import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';
import AppointmentCard from '@components/AppointmentCard/AppointmentCard';

interface Appointment {
  id: number;
  partnerName: string;
  category: string;
  rating: number;
  address: string;
  serviceName: string;
  dateTime: string;
  status: string;
  partnerImage: string;
};

const MyAppointments = () => {
  const appointments = [
    {
      id: 1,
      partnerName: 'Roberta Pereira',
      category: 'Diarista',
      rating: 4.8,
      address: 'Jardim Faculdade, Sorocaba, São Paulo',
      serviceName: 'Diarista',
      dateTime: 'Qui, 17/10 - 10:00',
      status: 'Confirmado',
      partnerImage: 'https://diaristalegal.com.br/wp-content/uploads/2016/10/diarista-4.jpg',
    },
    {
      id: 2,
      partnerName: 'Carlos Silva',
      category: 'Encanador',
      rating: 4.5,
      address: 'Centro, Sorocaba, São Paulo',
      serviceName: 'Reparo Hidráulico',
      dateTime: 'Sex, 18/10 - 14:00',
      status: 'Pendente',
      partnerImage: 'https://www.esgotecnicalitoral.com.br/wp-content/uploads/2018/07/como-escolher-encanador.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Agendamentos</Text>
      <ScrollView>
        {appointments.map(appointment => (
          <AppointmentCard 
            key={appointment.id} 
            appointment={appointment} 
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyAppointments;