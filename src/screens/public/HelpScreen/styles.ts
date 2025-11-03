import { StyleSheet } from 'react-native';
import colors from '@theme/colors';
import { inputBaseStyle } from '@components/ui/CustomTextInput/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  mainContent: {
    width: '100%',
    maxWidth: 900,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryBlue,
    marginBottom: 24,
  },
  searchBarContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    gap: 12,
  },
  searchInput: {
    ...inputBaseStyle.input,
    flex: 1,
    height: 50,
  },
  searchButton: {
    backgroundColor: colors.primaryBlue,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faqSection: {
    width: '100%',
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 22,
    fontFamily: 'Afacad-SemiBold',
    color: colors.primaryOrange,
    marginBottom: 16,
    borderBottomWidth: 2,
    borderColor: colors.primaryOrange,
    paddingBottom: 8,
  },
  notFoundText: {
    fontFamily: 'Afacad-Regular',
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 20,
  },
});
