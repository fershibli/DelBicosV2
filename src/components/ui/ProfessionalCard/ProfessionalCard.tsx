import React, { useState, useMemo } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { ListedProfessional } from '@stores/Professional/types';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types';

interface ProfessionalCardProps {
  professional: ListedProfessional;
}

function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const navigation = useNavigation();
  const { theme } = useThemeStore();
  const colors = useColors();
  const styles = createStyles(colors);

  const [isHovered, setIsHovered] = useState(false);

  const isDark = theme === ThemeMode.DARK;
  const isHighContrast = theme === ThemeMode.LIGHT_HI_CONTRAST;

  const colorProps = useMemo(() => {
    let bgColor = colors.cardBackground;
    let borderColor = colors.borderColor;
    let nameColor = colors.primaryOrange;
    let textColor = colors.primaryBlack;
    let subTextColor = colors.textSecondary;
    let locationColor = colors.primaryBlue;

    if (isDark) {
      bgColor = colors.cardBackground;
      borderColor = '#444444';
      nameColor = colors.primaryOrange;
      textColor = '#FFFFFF';
      subTextColor = '#CCCCCC';
      locationColor = '#60A5FA';
    }

    if (isHighContrast) {
      bgColor = colors.primaryWhite;
      borderColor = colors.primaryBlack;
      nameColor = colors.primaryBlack;
      textColor = colors.primaryBlack;
      subTextColor = colors.primaryBlack;
      locationColor = colors.primaryBlack;
    }

    if (isHovered) {
      if (isHighContrast) {
        bgColor = colors.primaryBlue;
        nameColor = colors.primaryWhite;
        textColor = colors.primaryWhite;
        subTextColor = colors.primaryWhite;
        locationColor = colors.primaryWhite;
      } else if (isDark) {
        bgColor = '#3A3A3A';
        borderColor = colors.primaryOrange;
      } else {
        borderColor = colors.primaryBlue;
      }
    }

    return {
      bgColor,
      borderColor,
      nameColor,
      textColor,
      subTextColor,
      locationColor,
    };
  }, [isDark, isHighContrast, isHovered, colors]);

  const navigateToProfile = () => {
    // @ts-ignore
    navigation.navigate('PartnerProfile', { id: professional.id });
  };

  const servicesText =
    professional.offeredServices?.slice(0, 2).join(', ') ||
    professional.category;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colorProps.bgColor,
          borderColor: colorProps.borderColor,
          transform: [{ scale: pressed || isHovered ? 1.01 : 1 }],
        },
        isHighContrast && { borderWidth: 2 },
      ]}
      onPress={navigateToProfile}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      accessibilityRole="button"
      accessibilityLabel={`Profissional ${professional.name}`}>
      <Image
        source={{
          uri: professional.imageUrl || 'https://via.placeholder.com/100',
        }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text
          style={[styles.name, { color: colorProps.nameColor }]}
          numberOfLines={1}>
          {professional.name}
        </Text>

        <Text
          style={[styles.services, { color: colorProps.textColor }]}
          numberOfLines={2}>
          {servicesText}
        </Text>

        <View style={styles.ratingContainer}>
          <FontAwesome name="star" color="#FFC107" size={14} />
          <Text style={[styles.rating, { color: colorProps.textColor }]}>
            {professional.rating.toFixed(1)}
            <Text
              style={[styles.ratingCount, { color: colorProps.subTextColor }]}>
              {' '}
              ({professional.ratingsCount})
            </Text>
          </Text>
        </View>

        <View style={styles.footer}>
          <Text
            style={[styles.location, { color: colorProps.locationColor }]}
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
