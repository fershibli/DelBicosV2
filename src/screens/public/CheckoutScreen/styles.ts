import { StyleSheet, Platform } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F4F7FA',
    },
    backButton: {
      marginTop: 30,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: colors.primaryBlue,
      borderRadius: 8,
    },
    backButtonText: {
      color: colors.primaryWhite,
      fontFamily: 'Afacad-Bold',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F4F7FA',
      minHeight: 300,
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      fontFamily: 'Afacad-Regular',
      color: '#6c757d',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#F4F7FA',
    },
    backButtonError: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: colors.primaryBlue,
      borderRadius: 8,
    },
    backButtonTextError: {
      color: colors.primaryWhite,
      fontFamily: 'Afacad-Bold',
    },
    errorMessageText: {
      color: '#D32F2F',
      fontFamily: 'Afacad-Regular',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 12,
      marginBottom: -12,
    },
    contentContainer: {
      padding: 24,
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      maxWidth: 1100,
      marginBottom: 24,
    },
    mainContent: {
      flexDirection: Platform.OS === 'web' ? 'row' : 'column',
      width: '100%',
      maxWidth: 1100,
      gap: 24,
    },
    leftColumn: {
      flex: Platform.OS === 'web' ? 1.5 : 1,
      marginBottom: Platform.OS !== 'web' ? 24 : 0,
    },
    pageTitle: {
      fontSize: 28,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlue,
      marginBottom: 16,
    },
    summaryCard: {
      backgroundColor: colors.primaryWhite,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.secondaryBeige,
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: { elevation: 2 },
        web: { boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)' },
      }),
    },
    checkoutButton: {
      backgroundColor: colors.primaryBlue,
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 24,
    },
    checkoutButtonDisabled: {
      opacity: 0.6,
    },
    checkoutButtonText: {
      color: colors.primaryWhite,
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
    },
    summaryImage: {
      width: '100%',
      height: 180,
      backgroundColor: '#EEE',
    },
    summaryContent: {
      padding: 16,
    },
    summaryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    summaryTitle: {
      fontSize: 22,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryOrange,
    },
    summarySubtitle: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: '#333',
    },
    summaryRatingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    summaryRatingText: {
      fontSize: 12,
      fontFamily: 'Afacad-Regular',
      color: '#6c757d',
      marginLeft: 4,
    },
    summaryPrice: {
      fontSize: 20,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlue,
    },
    summaryDivider: {
      height: 1,
      backgroundColor: '#F0F0F0',
      marginVertical: 12,
    },
    summaryServiceTitle: {
      fontSize: 18,
      fontFamily: 'Afacad-SemiBold',
      color: '#212529',
    },
    summaryServiceDate: {
      fontSize: 16,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlue,
      marginTop: 4,
    },
    summaryLink: {
      fontSize: 12,
      fontFamily: 'Afacad-Bold',
      color: '#D32F2F',
      textDecorationLine: 'underline',
      marginTop: 12,
      alignSelf: 'flex-start',
    },
    rightColumn: {
      flex: 1,
    },
    paymentContainer: {
      backgroundColor: colors.primaryWhite,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.secondaryBeige,
      padding: 20,
      ...Platform.select({
        // Sombra
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: { elevation: 2 },
        web: { boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)' },
      }),
    },
    sectionTitle: {
      fontSize: 22,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlue,
      marginBottom: 16,
    },
    orderSummaryContainer: {
      marginTop: 20,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    summaryLabel: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: '#6c757d',
    },
    summaryValue: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: '#212529',
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: colors.secondaryBeige,
    },
    totalLabel: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlue,
    },
    totalValue: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlue,
    },
    addressSection: {
      marginBottom: 24,
      backgroundColor: colors.primaryWhite,
      borderRadius: 8,
      padding: 16,
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
    addressCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    addressText: {
      flex: 1,
      fontFamily: 'Afacad-Regular',
      fontSize: 14,
      color: '#333',
    },
    selectAddressButton: {
      backgroundColor: colors.primaryOrange,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    selectAddressButtonText: {
      color: colors.primaryWhite,
      fontFamily: 'Afacad-Bold',
      fontSize: 16,
    },
    paymentWaitingText: {
      fontFamily: 'Afacad-Regular',
      fontSize: 15,
      textAlign: 'center',
      color: '#555',
      marginVertical: 40,
    },
    errorText: {
      fontFamily: 'Afacad-Regular',
      fontSize: 15,
      textAlign: 'center',
      color: 'red',
      marginVertical: 40,
    },
  });
