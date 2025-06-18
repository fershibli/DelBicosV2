import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width: 520,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 10,
    padding: 15,
    boxShadow: '0px 2px 3.8px rgba(0, 0, 0, 0.25)',
    elevation: 5,
  },
  infoContainer: {
    flex: 2,
    paddingRight: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FC8200',
    marginBottom: 5,
  },
  categoryRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  category: {
    fontSize: 12,
    color: '#005A93',
    marginRight: 10,
  },
  rating: {
    fontSize: 12,
    color: '#FFC107',
  },
  address: {
    fontSize: 10,
    color: '#005A93',
    marginBottom: 15,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 16,
    color: '#FC8200',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FC8200',
    padding: 5,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: '#005A93',
    borderRadius: 10,
    padding: 8,
    width: 120,
  },
  cancelButton: {
    backgroundColor: '#F30000',
    borderRadius: 10,
    padding: 8,
    width: 120,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  partnerImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  statusBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#005A93',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  profileButtonText: {
    color: '#DDE6F0',
    fontSize: 12,
  },
});

export default AppointmentCard;