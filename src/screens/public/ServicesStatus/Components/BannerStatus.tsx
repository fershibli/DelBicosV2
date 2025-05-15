import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

const BannerStatus = () => (
  <View style={styles.successContainer}>
    <View style={styles.successBanner}>
      <Text style={styles.successText}>Seu horário foi agendado com sucesso!</Text>
    </View>
    <TouchableOpacity style={styles.reminderButton}>
      <Text style={styles.reminderText}>Criar lembrete</Text>
    </TouchableOpacity>
  </View>
);

export default BannerStatus;