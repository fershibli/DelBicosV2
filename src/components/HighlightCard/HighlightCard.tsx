import React from 'react';
import { Text, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: () => void;
}

interface HighlightCardProps {
  item: HighlightItem;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({ item }) => {
  const handlePress = () => {
    if (item.link) {
      item.link();
    } else {
      console.log('Destaque pressionado:', item.title);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.image}
        imageStyle={styles.imageStyle}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};
