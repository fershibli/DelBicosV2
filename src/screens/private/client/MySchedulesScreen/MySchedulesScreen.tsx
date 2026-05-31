import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';
import MeusAgendamentos from '../Profile/Tabs/MeusAgendamentos/MeusAgendamentos';

const MySchedulesScreen: React.FC = () => {
  const colors = useColors();
  const styles = createStyles(colors);
  const route = useRoute();

  const role = route.name === 'ProfessionalSchedulesTab' ? 'professional' : 'client';

  return (
    <View style={styles.container}>
      <MeusAgendamentos role={role} />
    </View>
  );
};

export default MySchedulesScreen;
