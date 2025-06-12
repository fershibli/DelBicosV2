import { StyleSheet } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  externalContainer: {
    backgroundColor: colors.secondaryGray,
    width: '100%',
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
    shadowColor: colors.primaryBlack,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Android shadow
    backgroundColor: colors.secondaryBeige,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primaryOrange,
    textAlign: 'center',
  },
});
