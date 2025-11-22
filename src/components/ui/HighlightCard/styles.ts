import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width;
const CARD_HEIGHT = 250;

export const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: 0,
      marginHorizontal: 0,
      backgroundColor: colors.secondaryBeige,
    },
    image: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    imageStyle: {
      borderRadius: 0,
    },
    gradient: {
      flex: 1,
      justifyContent: 'flex-end',
      padding: 24,
      borderRadius: 0,
    },
    title: {
      fontFamily: 'Afacad-Bold',
      fontSize: 24,
      color: '#E2E8F0',
      marginBottom: 4,
    },
    description: {
      fontFamily: 'Afacad-Regular',
      fontSize: 16,
      color: '#E2E8F0',
    },
  });
