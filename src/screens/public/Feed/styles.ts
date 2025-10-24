import colors from '@theme/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryBlue,
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 10,
  },
});
