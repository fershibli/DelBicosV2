import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Rating } from 'react-native-ratings';
import { useColors } from '@theme/ThemeProvider';

interface ReviewCardProps {
  rating: number;
  title: string;
  serviceTitle: string;
  clientName: string;
  clientAvatar?: string;
  date: string;
}

export function ReviewCard({
  rating,
  title,
  serviceTitle,
  clientName,
  clientAvatar,
  date,
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

const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      minWidth: 280,
      maxWidth: 320,
    },
    ratingContainer: {
      marginBottom: 8,
    },
    stars: {
      alignSelf: 'flex-start',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primaryBlack || '#000',
      marginBottom: 4,
    },
    service: {
      fontSize: 14,
      color: colors.textGray || '#666',
      marginBottom: 12,
    },
    clientContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: colors.secondaryBeige || '#f0f0f0',
      paddingTop: 12,
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginRight: 8,
    },
    clientInfo: {
      flex: 1,
    },
    clientName: {
      fontSize: 13,
      fontWeight: '500',
      color: colors.primaryBlack || '#000',
      marginBottom: 2,
    },
    date: {
      fontSize: 11,
      color: colors.textGray || '#999',
    },
  });
