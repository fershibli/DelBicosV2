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
    title: {
      fontSize: 22,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
      paddingHorizontal: 20,
      marginTop: 24,
      marginBottom: 12,
    },
    mobileSearchSection: {
      paddingHorizontal: 20,
      marginTop: 24,
      marginBottom: 12,
    },
    mobileSearchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardBackground,
      borderRadius: 24,
      height: 52,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.borderColor,
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
        web: {
          boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
        } as any,
      }),
    },
    mobileSearchInput: {
      flex: 1,
      fontSize: 16,
      fontFamily: 'Afacad-Regular',
      color: colors.primaryBlack,
      height: '100%',
      ...Platform.select({
        web: { outlineStyle: 'none' } as any,
      }),
    },
    mobileSearchButton: {
      padding: 8,
    },
    carouselSection: {
      marginBottom: 24,
      position: 'relative',
    },
    carouselContainer: {
      width: '100%',
      height: 220,
      position: 'relative',
    },
    carouselListContainer: {
      paddingHorizontal: 0,
    },
    scrollButton: {
      position: 'absolute',
      top: '50%',
      marginTop: -20,
      zIndex: 10,
      backgroundColor: colors.cardBackground,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      ...Platform.select({
        web: {
          boxShadow: '0px 2px 8px rgba(0,0,0,0.2)',
          cursor: 'pointer',
        },
        default: {
          elevation: 5,
        },
      }),
    },
    scrollButtonLeft: {
      left: 16,
    },
    scrollButtonRight: {
      right: 16,
    },
    paginationContainer: {
      position: 'absolute',
      bottom: 24,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 20,
    },
    dropdownContainer: {
      position: 'absolute',
      top: 80,
      left: 20,
      right: 20,
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.borderColor,
      overflow: 'hidden',
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 5,
        },
      }),
    },
    dropdownItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
    },
    dropdownIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginRight: 12,
      backgroundColor: colors.inputBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dropdownTextContainer: {
      flex: 1,
    },
    dropdownName: {
      fontSize: 15,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlack,
    },
    dropdownService: {
      fontSize: 13,
      fontFamily: 'Afacad-Regular',
      color: colors.textSecondary,
    },
    dropdownEmpty: {
      padding: 16,
      alignItems: 'center',
    },
    dropdownEmptyText: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
      textAlign: 'center',
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      marginHorizontal: 4,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
    },
    dotActive: {
      backgroundColor: '#FFFFFF',
      width: 10,
      height: 10,
      borderColor: 'transparent',
    },
    categorySection: {
      marginBottom: 24,
    },
    listSection: {
      marginBottom: 24,
      paddingHorizontal: 16,
    },
    list: {
      flex: 1,
    },
  });
