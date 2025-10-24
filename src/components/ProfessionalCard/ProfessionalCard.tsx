import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ListedProfessional } from '@stores/Professional/types';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

interface ProfessionalCardProps {
  professional: ListedProfessional;
}

function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    // Navega para o perfil do profissional
    navigation.navigate('PartnerProfile', { id: professional.id });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={navigateToProfile}
      activeOpacity={0.8}>
      <Image
        source={{ uri: professional.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.Name} numberOfLines={1}>
          {professional.name}
        </Text>
        <Text style={styles.Category} numberOfLines={1}>
          {professional.category}
        </Text>
        <View style={styles.ratingRow}>
          <FontAwesome name="star" color="#FFC107" size={12} />
          <Text style={styles.Rating}>{professional.rating.toFixed(1)}</Text>
          <Text style={styles.RatingCount} numberOfLines={1}>
            ({professional.ratingsCount} reviews)
          </Text>
        </View>
        <Text style={styles.Location} numberOfLines={1} ellipsizeMode="tail">
          {professional.location}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export default ProfessionalCard;
