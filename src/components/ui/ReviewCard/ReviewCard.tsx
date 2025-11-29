import React from 'react';
import { View, Text, Image } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useColors } from '@theme/ThemeProvider';
import { createStyles } from './styles';

interface ReviewCardProps {
  rating: number;
  title: string;
  serviceTitle: string;
  clientName: string;
  clientAvatar?: string;
  date: string;
  review?: string;
}

export function ReviewCard({
  rating,
  title,
  serviceTitle,
  clientName,
  clientAvatar,
  date,
  review,
}: ReviewCardProps) {
  const colors = useColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.card}>
      {/* Rating stars */}
      <View style={styles.ratingContainer}>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={20}
          readonly
          startingValue={rating}
          tintColor="#fff"
          style={styles.stars}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Service */}
      <Text style={styles.service}>{serviceTitle}</Text>

      {/* Review comment */}
      {review && review.trim() !== '' && (
        <Text style={styles.reviewText}>{review}</Text>
      )}

      {/* Client info */}
      <View style={styles.clientContainer}>
        <Image
          source={{
            uri: clientAvatar || 'https://via.placeholder.com/32',
          }}
          style={styles.avatar}
        />
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{clientName}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </View>
  );
}
