import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginVertical: 12 },
  errorBox: { padding: 12, backgroundColor: '#fdecea', borderRadius: 6 },
  errorText: { color: '#611a15' },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  kpiCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#fff',
    padding: 12,
    margin: 6,
    borderRadius: 8,
    elevation: 2,
  },
  kpiLabel: { fontSize: 12, color: '#666' },
  kpiValue: { fontSize: 20, fontWeight: '700', marginTop: 6 },
  chartsRow: { flexDirection: 'row', gap: 12 },
  mainChart: { flex: 1 },
  sideColumn: { width: 320, marginLeft: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  summaryKey: { color: '#333' },
  summaryVal: { fontWeight: '700' },
});
