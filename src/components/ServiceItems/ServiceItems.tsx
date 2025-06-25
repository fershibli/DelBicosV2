import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';

interface ServiceItem {
  id: number | string;
  title: string;
  description: string;
  bannerImg?: string;
  price: string | number;
  duration?: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  professional?: string;
}

interface ServiceItemsProps {
  items: ServiceItem[];
}

const ServiceItems: React.FC<ServiceItemsProps> = ({ items }) => {
  const formatPrice = (price: number | string): string => {
    const value =
      typeof price === 'string' ? parseFloat(price.replace(',', '.')) : price;

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(isNaN(value) ? 0 : value);
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <View style={styles.itemsContainer}>
      <View style={styles.itemsHeader}>
        <Text style={styles.itemsHeaderText}>Serviço Contratado</Text>
      </View>

      {items.map((item) => (
        <View key={item.id} style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>

          {item.date && (
            <View style={styles.itemRow}>
              <Text style={styles.itemDate}>{item.date}</Text>
              {item.startTime && item.endTime && (
                <Text style={styles.itemTime}>
                  {item.startTime} - {item.endTime}
                </Text>
              )}
            </View>
          )}

          <View style={styles.itemRow}>
            {item.duration && (
              <Text style={styles.itemDuration}>
                Duração: {formatDuration(item.duration)}
              </Text>
            )}
            <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ServiceItems;
