import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { ListedProfessional } from '@stores/Professional/types';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useThemeStore, ThemeMode } from '@stores/Theme';
import colors from '@theme/colors';

interface ProfessionalCardProps {
  professional: ListedProfessional;
}

function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const navigation = useNavigation();
  const { theme } = useThemeStore();
  const isDark = theme === ThemeMode.DARK;
  const isHighContrast = theme === ThemeMode.LIGHT_HI_CONTRAST;
  const [isHovered, setIsHovered] = useState(false);

  const navigateToProfile = () => {
    // @ts-ignore
    navigation.navigate('PartnerProfile', { id: professional.id });
  };

  const cardStyle = [
    styles.card,
    isDark
      ? {
          backgroundColor: colors.secondaryGray,
          borderColor: colors.secondaryGray,
        }
      : null,
    isHovered && isDark
      ? {
          backgroundColor: colors.primaryOrange,
          borderColor: colors.primaryOrange,
        }
      : null,
  ];

  const nameStyle = [
    styles.Name,
    isDark ? { color: '#E2E8F0' } : null,
    isHovered && isDark ? { color: '#E2E8F0' } : null,
  ];

  const textStyle = [styles.Category, isDark ? { color: '#E2E8F0' } : null];

  const ratingStyle = [styles.Rating, isDark ? { color: '#E2E8F0' } : null];

  const locationStyle = [styles.Location, isDark ? { color: '#E2E8F0' } : null];

  return (
    <Pressable
      style={cardStyle}
      onPress={navigateToProfile}
      android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}>
      <Image
        source={{ uri: professional.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={nameStyle} numberOfLines={1}>
          {professional.name}
        </Text>
        <Text style={textStyle} numberOfLines={1}>
          {professional.category}
        </Text>
        <View style={styles.ratingRow}>
          <FontAwesome name="star" color="#FFC107" size={12} />
          <Text style={ratingStyle}>{professional.rating}</Text>
          <Text style={styles.RatingCount} numberOfLines={1}>
            ({professional.ratingsCount} reviews)
          </Text>
        </View>
        <Text style={locationStyle} numberOfLines={1} ellipsizeMode="tail">
          {professional.location}
        </Text>
      </View>
    </Pressable>
  );
}
export default ProfessionalCard;
