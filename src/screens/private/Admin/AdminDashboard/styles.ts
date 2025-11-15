import { StyleSheet } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.primaryWhite },
  content: { paddingBottom: 40 },
  title: {
    fontSize: 22,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryBlue,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Afacad-SemiBold',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  month: { width: 48, fontFamily: 'Afacad-Regular' },
  barBackground: {
    flex: 1,
    height: 12,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  bar: { height: 12, backgroundColor: colors.primaryBlue, borderRadius: 6 },
  value: { width: 40, textAlign: 'right', fontFamily: 'Afacad-Regular' },
  smallText: { fontSize: 12, color: '#444', fontFamily: 'Afacad-Regular' },
});
