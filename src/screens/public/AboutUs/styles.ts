import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.inputBackground,
    },
    contentContainer: {
      paddingBottom: 40,
    },

    // Title
    pageTitle: {
      fontSize: 62,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryOrange,
      textAlign: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },

    // Mission Card 
    missionCard: {
      flexDirection: 'row',
      marginHorizontal: 16,
      marginBottom: 24,
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.borderColor,
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },
        android: {
          elevation: 3,
        },
        web: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        },
      }),
    },
    teamPhotoPlaceholder: {
      width: '42%',
      //backgroundColor: colors.primaryBlue,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 200,
      padding: 12,
    },
    teamPhotoLogo: {
      width: '100%',
      height: 500,
    },
    missionTextCol: {
      flex: 1,
      padding: 14,
      justifyContent: 'center',
      gap: 10,
    },
    missionText: {
      fontSize: 24,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      lineHeight: 28,
      textAlign: 'justify',
    },
    tagline: {
      fontSize: 24,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryOrange,
      textDecorationLine: 'underline',
    },
    logoImage: {
      width: '100%',
      height: 100,
      marginTop: 4,
    },

    //  Developers Banner
    developersBanner: {
      backgroundColor: colors.primaryBlue,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginBottom: 10,
      alignItems: 'center',
    },
    developersBannerTitle: {
      fontSize: 60,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryWhite,
      letterSpacing: 0.5,
    },

    //  Developer Card
    developerCard: {
      flexDirection: 'row',
      marginHorizontal: 16,
      marginBottom: 16,
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.borderColor,
      padding: 16,
      gap: 14,
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
        web: {
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)',
        },
      }),
    },
    developerCardReversed: {
      flexDirection: 'row-reverse',
    },
    developerPhotoWrapper: {
      alignItems: 'center',
    },
    developerPhoto: {
      width: 300,
      height: 300,
    },
    developerPhotoPlaceholder: {
      width: 372,
      height: 372,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    developerPhotoInitial: {
      fontSize: 48,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryWhite,
    },
    developerInfo: {
      flex: 1,
    },
    developerName: {
      fontSize: 40,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryOrange,
      marginBottom: 2,
    },
    developerNameReversed: {
      textAlign: 'right',
    },
    developerRoleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 18,
      marginBottom: 8,
    },
    developerRoleRowReversed: {
      flexDirection: 'row-reverse',
    },
    developerRole: {
      fontSize: 30,
      fontFamily: 'Afacad-SemiBold',
      color: colors.primaryBlue,
    },
    developerInitialBadge: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: colors.primaryOrange,
      alignItems: 'center',
      justifyContent: 'center',
    },
    developerInitialBadgeText: {
      fontSize: 11,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryWhite,
    },
    developerBio: {
      fontSize: 25,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlack,
      lineHeight: 28,
      textAlign: 'justify',
    },
  });
