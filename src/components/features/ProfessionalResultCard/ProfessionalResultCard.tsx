import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';

// Interface movida para fora ou importada de um arquivo de types
export interface ProfessionalResult {
  id: number;
  name: string;
  serviceName: string;
  serviceId: number;
  rating: number;
  ratingsCount: number;
  priceFrom: number;
  availableTimes: string[];
  offeredServices: string[];
  distance: number;
  location: string;
  imageUrl: string;
}

interface ProfessionalResultCardProps {
  professional: ProfessionalResult;
  selectedDate: string;
}

const ProfessionalResultCard: React.FC<ProfessionalResultCardProps> = ({
  professional,
  selectedDate,
}) => {
  const colors = useColors();
  const styles = createStyles(colors);
  const navigation = useNavigation();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleTimeSlotPress = (time: string) => {
    setSelectedTime(time);
    const dateTimeString = `${selectedDate} ${time}`;

    // @ts-ignore
    navigation.navigate('Checkout', {
      professionalId: professional.id,
      priceFrom: professional.priceFrom,
      selectedTime: dateTimeString,
      imageUrl: professional.imageUrl,
      professionalName: professional.name,
      serviceId: professional.serviceId,
    });
  };

  const navigateToProfile = () => {
    // @ts-ignore
    navigation.navigate('PartnerProfile', { id: professional.id });
  };

  return (
    <View style={styles.card}>
      {/* --- COLUNA ESQUERDA: DETALHES --- */}
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.professionalName} numberOfLines={1}>
            {professional.name}
          </Text>
          <Text style={styles.serviceName} numberOfLines={1}>
            {professional.serviceName}
          </Text>

          <View style={styles.ratingRow}>
            <FontAwesome name="star" color="#FFC107" size={14} />
            <Text style={styles.ratingText}>
              {professional.rating.toFixed(1)}
            </Text>
            <Text style={styles.ratingCount}>
              ({professional.ratingsCount})
            </Text>
          </View>
        </View>

        <View style={styles.timesContainer}>
          <Text style={styles.timesTitle}>Horários disponíveis:</Text>
          <View style={styles.timesRow}>
            {professional.availableTimes.slice(0, 4).map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotActive,
                ]}
                onPress={() => handleTimeSlotPress(time)}>
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.timeTextActive,
                  ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
            {professional.availableTimes.length > 4 && (
              <View style={styles.timeSlot}>
                <Text style={styles.timeText}>...</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.servicesContainer}>
          <Text
            style={styles.servicesText}
            numberOfLines={1}
            ellipsizeMode="tail">
            {professional.offeredServices.join(', ')}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.locationText} numberOfLines={1}>
            📍 {professional.location}
          </Text>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={navigateToProfile}>
            <Text style={styles.profileButtonText}>Ver Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* --- COLUNA DIREITA: IMAGEM --- */}
      <ImageBackground
        source={{ uri: professional.imageUrl }}
        style={styles.imageContainer}
        resizeMode="cover">
        {/* Overlay para escurecer levemente e destacar o texto branco */}
        <View style={styles.imageOverlay} />

        <View style={styles.priceTag}>
          <Text style={styles.priceText}>R$ {professional.priceFrom}</Text>
        </View>

        <View style={styles.distanceTag}>
          <Text style={styles.distanceText}>{professional.distance}km</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfessionalResultCard;
