import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

const ProfessionalInfo  = () => (
  <View style={styles.professionalContainer}>
    <Text style={styles.professionalName}>Jefferson Santos</Text>
    <Text style={styles.serviceInfo}>Serviço Nº 7522 | Solicitado em 15/11/2024 às 22:49</Text>
    <TouchableOpacity>
      <Text style={styles.viewProfessionalText}>Ver profissional</Text>
    </TouchableOpacity>
  </View>
);

export default ProfessionalInfo ;