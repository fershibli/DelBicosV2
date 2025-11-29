import { StyleSheet } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    card: {
      height: 200,
      backgroundColor: colors.secondaryGray,
      overflow: 'hidden',
    },
    image: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    imageStyle: {},
    gradient: {
      height: '100%',
      justifyContent: 'flex-end',
      padding: 20,
    },
    textContainer: {
      gap: 4,
    },
    title: {
      fontFamily: 'Afacad-Bold',
      fontSize: 24,
      color: colors.primaryWhite,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
    },
    description: {
      fontFamily: 'Afacad-Regular',
      fontSize: 16,
      color: '#E2E8F0',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 5,
    },
  });
