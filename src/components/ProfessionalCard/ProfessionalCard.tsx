import { Box, Card, CardContent, CardMedia } from '@mui/material';
import { ListedProfessional } from '@stores/Professional/types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './styles';

interface ProfessionalCardProps {
  professional: ListedProfessional;
}

function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <Card
      sx={{ display: 'flex' }}
      elevation={3}
      style={{
        padding: 0,
        margin: 10,
        width: 320,
        height: 90,
        borderRadius: 11,
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <CardMedia
          component={Image}
          source={{ uri: professional.imageUrl }}
          style={{ width: 90, height: 90, borderRadius: 11 }}
          resizeMode="cover"
          alt={professional.name}
        />
        <CardContent sx={{ flex: '1 0 auto', margin: 0, padding: 0 }}>
          <Box sx={{ flex: '1', flexDirection: 'column', marginLeft: 2 }}>
            <View>
              <Text style={styles.Name}>{professional.name}</Text>
            </View>
            <View>
              <Text style={styles.Category}>{professional.category}</Text>
            </View>
            <View>
              <Text style={styles.Rating}>
                Rating: {professional.rating.toFixed(1)} (
                {professional.ratingsCount} reviews)
              </Text>
            </View>
            <View>
              <Text style={styles.Location}>
                Location: {professional.location}
              </Text>
            </View>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
export default ProfessionalCard;
