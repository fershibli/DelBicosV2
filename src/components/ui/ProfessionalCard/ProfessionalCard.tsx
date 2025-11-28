import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { ListedProfessional } from '@stores/Professional/types';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useThemeStore, ThemeMode } from '@stores/Theme';

interface ProfessionalCardProps {
  professional: ListedProfessional;
}

function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const navigation = useNavigation();
  const { theme } = useThemeStore();
  const isDark = theme === ThemeMode.DARK;
  const colors = useColors();
  const styles = createStyles(colors);
  const [isHovered, setIsHovered] = useState(false);

  const navigateToProfile = () => {
    // @ts-ignore
    navigation.navigate('PartnerProfile', { id: professional.id });
  };

  const cardStyle = [
    styles.card,
    isDark && {
      backgroundColor: colors.cardBackground,
      borderColor: colors.cardBackground,
    },
    isHovered &&
      isDark && {
        backgroundColor: colors.primaryOrange,
      },
  ];

  const textPrimaryStyle = [
    isDark ? { color: '#E2E8F0' } : null,
    isHovered && isDark ? { color: '#FFFFFF' } : null,
  ];

  const textSecondaryStyle = [
    isDark ? { color: '#94A3B8' } : null,
    isHovered && isDark ? { color: '#E2E8F0' } : null,
  ];

  const servicesText =
    professional.offeredServices?.slice(0, 3).join(', ') ||
    professional.category;

  return (
    <Pressable
      style={({ pressed }) => [cardStyle, pressed && { opacity: 0.9 }]}
      onPress={navigateToProfile}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}>
      <Image
        source={{ uri: professional.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text
          style={[styles.name, isDark && { color: colors.primaryOrange }]}
          numberOfLines={1}>
          {professional.name}
        </Text>

        <Text style={[styles.services, textPrimaryStyle]} numberOfLines={1}>
          {servicesText}
        </Text>

        <View style={styles.ratingContainer}>
          <FontAwesome name="star" color="#FFC107" size={12} />
          <Text style={[styles.rating, textPrimaryStyle]}>
            {professional.rating.toFixed(1)}
            <Text style={[styles.ratingCount, textSecondaryStyle]}>
              {' '}
              ({professional.ratingsCount} reviews)
            </Text>
          </Text>
        </View>

        <View style={styles.footer}>
          <Text
            style={[styles.location, textPrimaryStyle]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {professional.location}
          </Text>

          {professional.distance !== undefined &&
            professional.distance !== null && (
              <View style={styles.distanceBadge}>
                <FontAwesome
                  name="map-marker"
                  size={10}
                  color={colors.primaryWhite}
                />
                <Text style={styles.distanceText}>
                  {professional.distance} km
                </Text>
              </View>
            )}
        </View>
      </View>
    </Pressable>
  );
}

export default ProfessionalCard;
