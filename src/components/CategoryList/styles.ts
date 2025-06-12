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
    width: 200,
    height: 126,
    margin: 14,
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
  },
});
