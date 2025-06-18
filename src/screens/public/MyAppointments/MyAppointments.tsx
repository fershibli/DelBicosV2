import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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
  status: 'Confirmado' | 'Pendente' | 'Cancelado';
  partnerImage: string;
};

const ITEMS_PER_PAGE = 6;

const MyAppointments = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
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
      status: 'Confirmado',
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
      status: 'Confirmado',
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
      status: 'Confirmado',
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
    }
  ];

  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);
  const paginatedData = appointments.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Agendamentos</Text>
      
      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <AppointmentCard appointment={item} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
      
      {totalPages > 1 && (
        <View style={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.pageButton,
                currentPage === index && styles.activePageButton
              ]}
              onPress={() => goToPage(index)}
            >
              <Text style={[
                styles.pageText,
                currentPage === index && styles.activePageText
              ]}>
                {index + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default MyAppointments;