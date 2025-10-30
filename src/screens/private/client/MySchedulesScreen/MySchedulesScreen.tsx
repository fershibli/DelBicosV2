import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import MeusAgendamentos from '../Profile/Tabs/MeusAgendamentos';

function MySchedulesScreen() {
  return (
    <View style={styles.container}>
      <MeusAgendamentos />
    </View>
  );
}

export default MySchedulesScreen;
