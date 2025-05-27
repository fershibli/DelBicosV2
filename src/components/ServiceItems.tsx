import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const ServiceItems = () => (
  <View style={styles.itemsContainer}>
    <View style={styles.itemsHeader}>
      <Text style={styles.itemsHeaderText}>Itens</Text>
    </View>
    <View style={styles.itemDetails}>
      <View style={styles.itemRow}>
        <Text style={styles.itemName}>Barba</Text>
        <Text style={styles.itemDate}>(5/12/2024)</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemTime}>14:30 - 15:00</Text>
        <Text style={styles.itemPrice}>R$38,00</Text>
      </View>
      <Text style={styles.professionalText}>Profissional: Jefferson</Text>
    </View>
  </View>
);

export default ServiceItems;