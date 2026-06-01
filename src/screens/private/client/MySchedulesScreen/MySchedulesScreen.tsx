import React from 'react';
import { View } from 'react-native';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';
import { useThemeStore, ThemeMode } from '@stores/Theme';
import MeusAgendamentos from '../Profile/Tabs/MeusAgendamentos/MeusAgendamentos';

const MySchedulesScreen: React.FC = () => {
  const colors = useColors();
  const { theme } = useThemeStore();
  const isDark = theme === ThemeMode.DARK;
  const isHighContrast = theme === ThemeMode.LIGHT_HI_CONTRAST;
  const styles = createStyles(colors, isDark, isHighContrast);

  return (
    <View style={styles.container}>
      <MeusAgendamentos />
    </View>
  );
};

export default MySchedulesScreen;
