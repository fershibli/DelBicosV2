import { Box, Card, CardContent, CardMedia } from '@mui/material';
import { ListedProfessional } from '@stores/Professional/types';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface ProfessionalCardProps {
  professional: ListedProfessional;
}

function ProfessionalCard({ professional }: ProfessionalCardProps) {
  return (
    <Card
      sx={{ display: 'flex' }}
      elevation={3}
      style={{ margin: 10, width: 320, height: 90 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardMedia
          component={Image}
          source={{ uri: professional.imageUrl }}
          style={{ width: 90, height: 90, borderRadius: 10 }}
          resizeMode="cover"
          alt={professional.name}
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box sx={{ flex: '1', flexDirection: 'column' }}>
            <View>
              <Text>{professional.name}</Text>
            </View>
            <View>
              <Text>{professional.category}</Text>
            </View>
            <View>
              <Text>
                Rating: {professional.rating.toFixed(1)} (
                {professional.ratingsCount} reviews)
              </Text>
            </View>
            <View>
              <Text>Location: {professional.location}</Text>
            </View>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
export default ProfessionalCard;
