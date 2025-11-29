import React from 'react';
import { View } from 'react-native';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';
import MeusAgendamentos from '../Profile/Tabs/MeusAgendamentos/MeusAgendamentos';

const MySchedulesScreen: React.FC = () => {
  const colors = useColors();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <MeusAgendamentos />
    </View>
  );
};

export default MySchedulesScreen;
