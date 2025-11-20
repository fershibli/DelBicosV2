import colors from '@theme/colors';
import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryGray,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  mainContent: {
    flexDirection: 'row',
    width: '100%',
    gap: 24,
  },
  leftColumn: {
    flex: 3,
    minWidth: 300,
  },
  rightColumn: {
    flex: 2,
    minWidth: 300,
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryBlue,
    marginBottom: 24,
  },
  subCategoryListContainer: {
    justifyContent: 'space-between',
  },
  subCategoryButton: {
    flex: 1,
    height: 80,
    backgroundColor: colors.primaryWhite,
    borderWidth: 1,
    borderColor: colors.secondaryBeige,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 8,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
      },
      default: {
        elevation: 2,
      },
    }),
  },
  subCategoryButtonActive: {
    backgroundColor: colors.primaryBlue,
    borderColor: colors.primaryBlue,
  },
  subCategoryText: {
    fontSize: 16,
    fontFamily: 'Afacad-SemiBold',
    color: colors.primaryOrange,
    textAlign: 'center',
  },
  subCategoryTextActive: {
    color: colors.primaryWhite,
  },
  calendarContainer: {
    backgroundColor: colors.primaryOrange,
    borderRadius: 16,
    overflow: 'hidden',
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: colors.primaryBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  continueButton: {
    backgroundColor: colors.primaryBlue,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  continueButtonDisabled: {
    backgroundColor: '#6c757d',
    opacity: 0.7,
  },
  continueButtonText: {
    color: colors.primaryWhite,
    fontFamily: 'Afacad-Bold',
    fontSize: 16,
  },
  footer: {
    padding: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#6c757d',
    fontFamily: 'Afacad-Regular',
  },
});
