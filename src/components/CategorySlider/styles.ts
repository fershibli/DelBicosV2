import { StyleSheet, Platform } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  externalContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    minHeight: 120,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    width: 210,
    height: 90,
    marginHorizontal: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.primaryWhite,
    borderWidth: 1,
    borderColor: colors.secondaryBeige,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.primaryBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.1)`,
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
      },
    }),
  },
  categoryCardHovered: {
    ...Platform.select({
      web: {
        backgroundColor: colors.primaryBlue,
        borderColor: colors.primaryBlue,
        transform: [{ scale: 1.03 }],
      },
    }),
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Afacad-SemiBold',
    color: '#003366', // Texto azul
    textAlign: 'left',
    flexShrink: 1,
    marginLeft: 12,
  },
  categoryTitleHovered: {
    color: colors.primaryWhite,
  },
});
