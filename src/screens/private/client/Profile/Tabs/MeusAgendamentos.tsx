import { useAppointmentStore } from '@stores/Appointment';
import React, { useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Platform,
  useWindowDimensions,
} from 'react-native';
import AppointmentItem from '@components/AppointmentItem';

const getNumColumns = (width: number) => {
  if (Platform.OS === 'web') {
    if (width > 1600) return 5;
    if (width > 1200) return 4;
    if (width > 900) return 3;
    if (width > 600) return 2;
  }
  return 1;
};

function MeusAgendamentos() {
  const { appointments, loading, fetchAppointments } = useAppointmentStore();

  const { width } = useWindowDimensions();
  const numColumns = getNumColumns(width);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 200,
        }}>
        <ActivityIndicator size="large" color="#003366" />
      </View>
    );
  }

  return (
    <FlatList
      data={appointments}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      key={numColumns}
      ListHeaderComponent={
        <Text
          style={{
            fontSize: 28,
            fontFamily: 'Afacad-Bold',
            color: '#003366',
            marginBottom: 16,
          }}>
          Meus Agendamentos
        </Text>
      }
      ListEmptyComponent={
        <Text style={{ textAlign: 'center', padding: 20, color: '#6c757d' }}>
          Você ainda não possui agendamentos.
        </Text>
      }
      renderItem={({ item }) => (
        <View style={{ width: `${100 / numColumns}%` }}>
          <AppointmentItem appointment={item} />
        </View>
      )}
      columnWrapperStyle={
        numColumns > 1 ? { justifyContent: 'flex-start' } : undefined
      }
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 8 }}
    />
  );
}

export default MeusAgendamentos;
