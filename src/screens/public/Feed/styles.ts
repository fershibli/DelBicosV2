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
  testButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  testButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
