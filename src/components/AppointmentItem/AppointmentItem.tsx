import React, { useEffect, useState } from 'react';
import { Appointment } from '@stores/Appointment/types';
import { Styles } from './styles';
import { Card, CardMedia } from '@mui/material';
import { Text, View } from 'react-native';
import { useUnsplashStore } from '@stores/Unsplash/Unsplash';
import { Button } from '@components/Button';

// Interface
interface AppointmentItemProps {
  appointment: Appointment;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment }) => {
  const [mockedImage, setMockedImage] = useState<string | null>(null);
  const { fetchRandomPhoto } = useUnsplashStore();

  useEffect(() => {
    // Carregar a imagem mockada
    const loadMockedImage = async () => {
      const response = await fetchRandomPhoto(appointment.Service.title);
      setMockedImage(response);
    };
    loadMockedImage();
  }, [appointment.Service.title, fetchRandomPhoto]);

  return (
    <Card elevation={4} style={Styles.Card}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={Styles.ProfessionalName}>
            {appointment.Professional.User.name}
          </Text>
          <Text style={Styles.CategoryTitle}>{appointment.Service.title}</Text>
          <Text style={Styles.LocationTitle}>{appointment.address_id}</Text>
          <Text style={Styles.ServiceTitle}>{appointment.Service.title}</Text>
          <Text style={Styles.StartTime}>
            {new Date(appointment.start_time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <View>
            <Button
              sizeVariant="medium"
              colorVariant="primaryGreen"
              fontVariant="AfacadRegular15"
              onClick={() => {}}>
              Avaliar
            </Button>
          </View>
        </View>

        <View>
          {mockedImage && (
            <CardMedia
              component="img"
              image={appointment.Service.banner_uri || mockedImage}
              alt={appointment.Service.title}
            />
          )}
        </View>
      </View>
    </Card>
  );
};

export default AppointmentItem;
