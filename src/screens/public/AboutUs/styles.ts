import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (
  colors: ColorsType,
  isMobile: boolean = false,
  isDark: boolean = false,
  isHighContrast: boolean = false,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark
        ? colors.secondaryGray
        : isHighContrast
          ? colors.primaryWhite
          : '#DDE6F0',
    },
    contentContainer: {
      paddingBottom: 40,
    },

    headerSection: {
      width: '100%',
      paddingBottom: 24,
    },

    // Title
    pageTitle: {
      fontSize: isMobile ? 36 : 62,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryOrange,
      textAlign: 'center',
      paddingHorizontal: 20,
      paddingVertical: isMobile ? 16 : 0,
      //marginTop: isMobile ? 16 : 5,
    },

    missionWrapper: {
      position: 'relative',
      marginHorizontal: isMobile ? 8 : 16,
      marginBottom: 24,
      minHeight: isMobile ? 0 : 620,
    },
    teamPhotoOverlay: {
      position: 'absolute',
      top: 90,
      left: 30,
      width: '42%',
      height: 500,
    },
    missionRow: {
      flexDirection: 'row',
    },
    missionPhotoSpace: {
      width: '45%',
      minHeight: 100,
      display: isMobile ? 'none' : 'flex',
    },

    // Mission Card
    missionCard: {
      flexDirection: 'column',
      width: '100%',
      flexShrink: 0,
      borderRadius: 25,
      backgroundColor: '#FFFFFF',
      borderWidth: isHighContrast ? 3 : isDark ? 0 : 1,
      borderColor: isHighContrast ? colors.primaryBlack : colors.borderColor,
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
        web: {},
      }),
    },
    teamPhotoPlaceholder: {
      width: '42%',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 100,
      padding: 12,
    },
    teamPhotoLogo: {
      width: '100%',
      height: isMobile ? 200 : 500,
    },
    missionTextCol: {
      flex: 1,
      padding: isMobile ? 16 : 25,
      justifyContent: 'center',
      gap: 1,
    },
    missionText: {
      fontSize: isMobile ? 16 : 24,
      fontFamily: 'Afacad-Bold',
      color: isDark ? '#000000' : colors.primaryBlack,
      lineHeight: isMobile ? 22 : 28,
      textAlign: 'justify',
    },
    logoImage: {
      width: '90%',
      height: isMobile ? 60 : 120,
      marginTop: isMobile ? 16 : 20,
    },

    // Mobile team photo (non-overlay, shown inline on mobile)
    mobileTeamPhoto: {
      width: '100%',
      height: 220,
      marginBottom: 12,
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
      fontSize: isMobile ? 36 : 60,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryWhite,
      letterSpacing: 0.5,
    },

    //  Developer Card
    developerCard: {
      flexDirection: isMobile ? 'column' : 'row',
      marginHorizontal: isMobile ? 8 : 16,
      marginBottom: 16,
      borderRadius: 12,
      borderWidth: isHighContrast ? 3 : 1,
      borderColor: isHighContrast ? colors.primaryBlack : colors.borderColor,
      backgroundColor:
        isDark || isHighContrast ? colors.cardBackground : 'transparent',
      padding: isMobile ? 12 : 16,
      gap: isMobile ? 10 : 14,
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
        web: {},
      }),
    },
    developerCardReversed: {
      flexDirection: isMobile ? 'column' : 'row-reverse',
    },
    developerPhotoWrapper: {
      alignItems: 'center',
    },
    developerPhoto: {
      width: isMobile ? 250 : 350,
      height: isMobile ? 250 : 350,
      borderRadius: isMobile ? 60 : 0,
    },
    developerPhotoPlaceholder: {
      width: isMobile ? 120 : 372,
      height: isMobile ? 120 : 372,
      alignItems: 'center',
      justifyContent: 'center',
    },
    developerSocialIcons: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    socialIconButton: {
      padding: 2,
    },
    socialIcon: {
      width: isMobile ? 24 : 30,
      height: isMobile ? 24 : 30,
    },
    socialIconDisabled: {
      opacity: 0.3,
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
      fontSize: isMobile ? 22 : 40,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryOrange,
      marginBottom: 2,
    },
    developerNameReversed: {
      textAlign: isMobile ? 'left' : 'right',
    },
    developerRoleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: isMobile ? 10 : 18,
      marginBottom: 8,
      flexWrap: 'wrap',
    },
    developerRoleRowReversed: {
      flexDirection: isMobile ? 'row' : 'row-reverse',
    },
    developerRole: {
      fontSize: isMobile ? 16 : 30,
      fontFamily: 'Afacad-SemiBold',
      color: colors.primaryBlack,
    },
    developerInitialBadge: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: colors.primaryOrange,
      alignItems: 'center',
      justifyContent: 'center',
    },
    developerBio: {
      fontSize: isMobile ? 14 : 30,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlack,
      lineHeight: isMobile ? 20 : 37,
      textAlign: 'justify',
    },

    // Separator line between developer cards
    separatorLine: {
      width: '100%',
      height: isMobile ? 40 : 70,
      //marginVertical: 0,
    },
    separatorLineReversed: {
      transform: [{ scaleX: -1 }],
    },

    // Footer
    footer: {
      padding: 20,
      textAlign: 'center',
      fontSize: 12,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
      marginTop: 8,
    },
  });
