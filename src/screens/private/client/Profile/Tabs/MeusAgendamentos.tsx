import { useAppointmentStore } from '@stores/Appointment';
import { Appointment } from '@stores/Appointment/types';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AppointmentItem from '@components/AppointmentItem';
import { Grid } from '@mui/material';

function MeusAgendamentos() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { fetchAppointments } = useAppointmentStore();

  useEffect(() => {
    const loadAppointments = async () => {
      const data = await fetchAppointments();
      setAppointments(data);
    };

    loadAppointments();
  }, [fetchAppointments]);

  return (
    <View style={{ gap: 10 }}>
      <Text>Meus Agendamentos</Text>
      <Grid container spacing={3}>
        {appointments.map((appointment) => (
          <AppointmentItem key={appointment.id} appointment={appointment} />
        ))}
      </Grid>
    </View>
  );
}

export default MeusAgendamentos;
