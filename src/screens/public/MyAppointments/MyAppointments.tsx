import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import AppointmentCard from '@components/AppointmentCard/AppointmentCard';
import axios from 'axios';

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
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.get('http://localhost:3000/api/appointments');
        const dataArray = response.data as any[];
        const formatted = dataArray.map((item: any, index: number) => ({
          id: item.id,  
          partnerName: item.Professional?.User?.name ?? 'Profissional',
          category: item.Service?.Subcategory?.Category?.title ?? 'Categoria não informada',
          rating: 4.6,
          address: item.Professional?.Address?.full_address ?? 'Endereço não informado',
          serviceName: item.Service?.title ?? 'Serviço',
          dateTime: formatDate(item.start_time),
          status: mapStatus(item.status),
          partnerImage: staticImages[index % staticImages.length]
        }));
        setAppointments(formatted);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    }

    fetchAppointments();
  }, []);

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

const staticImages = [
  'https://inpolpolimeros.com.br/wp-content/uploads/2023/04/contratar-eletricista-scaled.jpg',
  'https://www.zellusservices.com.br/wp-content/uploads/2022/02/Passo-a-passo-de-uma-limpeza-de-sofa-profissional.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV1n3DbwHUCNoI2AQu-ei5I0HbfnfrmqgMkA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgwBE2BAY8raFdxM98IHTH-JKmeCGjWp8Jw&s',
  'https://chiptronic.com.br/blog/wp-content/uploads/2017/06/chaveiro-%C3%A9-uma-boa-profiss%C3%A3o.jpg',
];

function formatDate(isoString: string) {
  const date = new Date(isoString);
  return date.toLocaleString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(',', ' -');
}

function mapStatus(status: string): 'Confirmado' | 'Pendente' | 'Cancelado' {
  const map: Record<string, 'Confirmado' | 'Pendente' | 'Cancelado'> = {
    confirmed: 'Confirmado',
    pending: 'Pendente',
    canceled: 'Cancelado',
  };
  return map[status] || 'Pendente';
}
