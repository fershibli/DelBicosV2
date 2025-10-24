import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

// Esta é a interface mockada baseada na sua imagem.
// Importe a sua interface real quando a tiver.
export interface ProfessionalResult {
  id: number;
  name: string;
  serviceName: string;
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
}

const ProfessionalResultCard: React.FC<ProfessionalResultCardProps> = ({
  professional,
}) => {
  const navigation = useNavigation();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const navigateToProfile = () => {
    navigation.navigate('PartnerProfile', { id: professional.id });
  };

  return (
    <View style={styles.card}>
      {/* --- COLUNA ESQUERDA: DETALHES --- */}
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.professionalName}>{professional.name}</Text>
            <Text style={styles.serviceName}>{professional.serviceName}</Text>
            <View style={styles.ratingRow}>
              <FontAwesome
                name="star"
                color="#FFC107"
                size={14}
                style={styles.starIcon}
              />
              <Text style={styles.ratingText}>
                {professional.rating.toFixed(1)}
              </Text>
              <Text style={styles.ratingCount}>
                ({professional.ratingsCount} reviews)
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.timesContainer}>
          <Text style={styles.timesTitle}>Horários disponíveis:</Text>
          <View style={styles.timesRow}>
            {professional.availableTimes.slice(0, 5).map(
              (
                time, // Limita a 5 para não quebrar
              ) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeSlot,
                    selectedTime === time && styles.timeSlotActive,
                  ]}
                  onPress={() => setSelectedTime(time)}>
                  <Text
                    style={[
                      styles.timeText,
                      selectedTime === time && styles.timeTextActive,
                    ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ),
            )}
            {professional.availableTimes.length > 5 && (
              <TouchableOpacity style={styles.timeSlot}>
                <Text style={styles.timeText}>Ver +</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.servicesContainer}>
          <Text style={styles.servicesTitle}>Serviços oferecidos:</Text>
          <Text
            style={styles.servicesText}
            numberOfLines={2}
            ellipsizeMode="tail">
            {professional.offeredServices.join(', ')}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.locationText} numberOfLines={1}>
            {professional.location}
          </Text>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={navigateToProfile}>
            <Text style={styles.profileButtonText}>Ver Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* --- COLUNA DIREITA: IMAGEM E TAGS --- */}
      <ImageBackground
        source={{ uri: professional.imageUrl }}
        style={styles.imageContainer}>
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>
            A partir de R${professional.priceFrom}
          </Text>
        </View>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              Há {professional.distance}km de distância
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfessionalResultCard;
