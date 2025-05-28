import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

interface ServiceItemsProps {
  items: {
    id: string;
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    price: number;
    professional: string;
  }[];
}

const ServiceItems: React.FC<ServiceItemsProps> = ({ items }) => {
  const formatPrice = (price: number) => {
    return `R$${price.toFixed(2).replace('.', ',')}`;
  };

  const formatDate = (dateString: string) => {
    return `(${dateString})`;
  };

  return (
    <View style={styles.itemsContainer}>
      <View style={styles.itemsHeader}>
        <Text style={styles.itemsHeaderText}>Itens</Text>
      </View>
      
      {items.map((item) => (
        <View key={item.id} style={styles.itemDetails}>
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDate}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemTime}>{`${item.startTime} - ${item.endTime}`}</Text>
            <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
          </View>
          <Text style={styles.professionalText}>Profissional: {item.professional}</Text>
        </View>
      ))}
    </View>
  );
};

export default ServiceItems;