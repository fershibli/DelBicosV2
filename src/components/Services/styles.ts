import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      backgroundColor: colors.surfaceSecondary,
      borderRadius: 8,
      marginBottom: 8,
    },
    info: { flex: 1 },
    title: { fontSize: 16, color: colors.textPrimary, fontWeight: '600' },
    meta: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
    actions: { marginLeft: 12, alignItems: 'flex-end' },
    actionEdit: { color: colors.primaryBlue, marginBottom: 6 },
    actionDelete: { color: colors.primaryRed },
  });

export default createStyles;
