import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

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
}

const AppointmentCard =  ({ appointment = {} as Appointment }: { appointment?: Appointment }) => {
  const { 
    partnerName = '', 
    category = '', 
    rating = 0, 
    address= '', 
    serviceName = '', 
    dateTime = '', 
    status = 'Pendente', 
    partnerImage = '', 
  } = appointment || {};

  return (
    <View style={styles.cardContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.partnerName}>{partnerName}</Text>
        <View style={styles.categoryRatingContainer}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.rating}>{rating} ★</Text>
        </View>
        <Text style={styles.address}>{address}</Text>
        
        <Text style={styles.serviceName}>{serviceName}</Text>
        <Text style={styles.dateTime}>{dateTime}</Text>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.buttonText}>Detalhes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.imageContainer}>
        <Image source={{ uri: partnerImage }} style={styles.partnerImage} />
        <View style={[styles.statusBadge, 
                     { backgroundColor: getStatusColor(status) }]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileButtonText}>Ver Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Confirmado': return '#4CAF50';
    case 'Pendente': return '#FFC107';
    case 'Cancelado': return '#F44336';
    default: return '#9E9E9E';
  }
};

export default AppointmentCard;