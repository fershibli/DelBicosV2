import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
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
    color: '#003366',
    marginBottom: 24,
  },
  subCategoryListContainer: {
    justifyContent: 'space-between',
  },
  subCategoryButton: {
    flex: 1,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
    backgroundColor: '#005A93',
    borderColor: '#005A93',
  },
  subCategoryText: {
    fontSize: 16,
    fontFamily: 'Afacad-SemiBold',
    color: '#FC8200',
    textAlign: 'center',
  },
  subCategoryTextActive: {
    color: '#FFFFFF',
  },
  calendarContainer: {
    backgroundColor: '#FC8200',
    borderRadius: 16,
    overflow: 'hidden',
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
    backgroundColor: '#005A93',
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
    color: '#FFFFFF',
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
