import React from 'react';
import { ScrollView } from 'react-native';
import { styles } from './styles';
// Importe o componente que você já tem e que mostra a lista
import MeusAgendamentos from '../Profile/Tabs/MeusAgendamentos';

function MySchedulesScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {/* Removido o título da página daqui, pois o componente MeusAgendamentos já tem 
        um título "Meus Agendamentos". Se ele não tiver, descomente esta linha:
        <Text style={styles.pageTitle}>Meus Agendamentos</Text> 
      */}
      <MeusAgendamentos />
    </ScrollView>
  );
}

export default MySchedulesScreen;
