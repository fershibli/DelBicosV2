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
  });
