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
      partnerName: 'Jefferson Santos',
      category: 'Serviços de Eletricista',
      rating: 4.6,
      address: 'Jardim Faculdade, Sorocaba, São Paulo',
      serviceName: 'Conserto de disjuntor',
      dateTime: 'Qui, 17/10 - 10:00',
      status: 'Confirmado',
      partnerImage: 'https://inpolpolimeros.com.br/wp-content/uploads/2023/04/contratar-eletricista-scaled.jpg',
    },
    {
      id: 2,
      partnerName: 'Sofá Limpo LTDA',
      category: 'Serviços Domésticos',
      rating: 4.6,
      address: 'Jardim Faculdade, Sorocaba, São Paulo',
      serviceName: 'Limpeza de Sofá',
      dateTime: 'Sex, 18/10 - 14:00',
      status: 'Confirmardo',
      partnerImage: 'https://www.zellusservices.com.br/wp-content/uploads/2022/02/Passo-a-passo-de-uma-limpeza-de-sofa-profissional.png',
    },
    {
      id: 3,
      partnerName: 'Roberta Pereira',
      category: 'Serviços Domésticos',
      rating: 4.6,
      address: 'Jardim Faculdade, Sorocaba, São Paulo',
      serviceName: 'Serviços Domésticos',
      dateTime: 'Sab, 19/10 - 08:00',
      status: 'Confirmardo',
      partnerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV1n3DbwHUCNoI2AQu-ei5I0HbfnfrmqgMkA&s',
    },
    {
      id: 4,
      partnerName: 'Sol Hammer',
      category: 'Beleza e estética',
      rating: 4.9,
      address: 'Jardim Faculdade, Sorocaba, São Paulo',
      serviceName: 'Manicure e Pedicure',
      dateTime: 'Sab, 19/10 - 11:00',
      status: 'Pendente',
      partnerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgwBE2BAY8raFdxM98IHTH-JKmeCGjWp8Jw&s',
    },
    {
      id: 5,
      partnerName: 'Chaveiro Fenômeno',
      category: 'Reformas e Reparos',
      rating: 4.9,
      address: 'Jardim Faculdade, Sorocaba, São Paulo',
      serviceName: 'Troca de fechadura',
      dateTime: 'Sab, 19/10 - 15:00',
      status: 'Pendente',
      partnerImage: 'https://chiptronic.com.br/blog/wp-content/uploads/2017/06/chaveiro-%C3%A9-uma-boa-profiss%C3%A3o.jpg',
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