import { StyleSheet } from 'react-native';
import { inputBaseStyle } from '@components/ui/CustomTextInput/styles';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondaryGray,
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
      color: colors.primaryBlack,
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
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 20,
    },
  });
