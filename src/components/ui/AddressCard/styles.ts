import { StyleSheet, Platform } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: colors.primaryWhite,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.primaryBlack,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: `0px 2px 8px rgba(0, 0, 0, 0.1)`,
      },
    }),
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    flexWrap: 'wrap',
  },
  inputReadOnly: {
    backgroundColor: colors.secondaryGray,
    color: colors.textSecondary,
    borderRadius: 8,
    borderColor: colors.borderColor,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
  },
  input: {
    backgroundColor: colors.primaryWhite,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
    fontFamily: 'Afacad-Regular',
    color: colors.primaryBlack,
  },
  actionsRow: {
    position: 'absolute',
    right: 16,
    top: 16,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    zIndex: 10,
  },
  saveRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 10,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: colors.primaryBlue,
  },
  cancelButton: {
    backgroundColor: colors.textSecondary,
  },
  actionButtonText: {
    color: colors.primaryWhite,
    fontWeight: 'bold',
    fontFamily: 'Afacad-Bold',
  },
  cancelButtonText: {
    color: colors.primaryWhite,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: colors.primaryWhite,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    backgroundColor: colors.primaryWhite,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
    fontFamily: 'Afacad-Regular',
    color: colors.primaryBlack,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
  },
});
