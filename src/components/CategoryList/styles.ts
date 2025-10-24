import { StyleSheet, Platform } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  externalContainer: {
    backgroundColor: colors.secondaryGray,
    width: '100%',
    minHeight: 146,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  categoryCard: {
    flexDirection: 'row',
    minWidth: 200,
    maxWidth: 220,
    height: 126,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.secondaryBeige,
    justifyContent: 'space-around',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.primaryBlack,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: `0px 4px 4px ${colors.primaryBlack}40`,
      },
    }),
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primaryOrange,
    textAlign: 'center',
  },
});
