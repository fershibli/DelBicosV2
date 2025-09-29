import React, { useEffect, useState } from 'react';
import { Appointment } from '@stores/Appointment/types';
import { Styles } from './styles';
import { Card, CardMedia, Modal, Rating, TextField } from '@mui/material';
import { Text, View } from 'react-native';
import { useUnsplashStore } from '@stores/Unsplash/Unsplash';
import { Button } from '@components/Button';

interface ReviewAppointmentProps {
  appointment: Appointment;
  onClose: () => void;
}

const ReviewAppointment = ({
  appointment,
  onClose,
}: ReviewAppointmentProps) => {
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState<string>('');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          gap: 10,
          width: 300,
        }}>
        <Text>Avaliar Serviço</Text>
        <Rating
          name="appointment-rating"
          value={rating}
          precision={1}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <Text>Comentários:</Text>
        <TextField
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={review}
          onChange={(event) => setReview(event.target.value)}
        />
        <Button
          sizeVariant="medium"
          colorVariant="primaryGreen"
          fontVariant="AfacadRegular15"
          onClick={onClose}>
          Enviar Avaliação
        </Button>
      </View>
    </View>
  );
};

interface AppointmentItemProps {
  appointment: Appointment;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
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
              onClick={() => setIsReviewModalOpen(true)}>
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
      <Modal
        open={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ReviewAppointment
          appointment={appointment}
          onClose={() => setIsReviewModalOpen(false)}
        />
      </Modal>
    </Card>
  );
};

export default AppointmentItem;
