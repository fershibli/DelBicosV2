import { StyleSheet } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  itemsContainer: {
    borderWidth: 0.3,
    borderColor: colors.primaryBlack,
    borderRadius: 3,
    marginBottom: 10,
    overflow: 'hidden',
  },
  itemsHeader: {
    backgroundColor: colors.primaryOrange,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  itemsHeaderText: {
    fontWeight: '800',
    fontSize: 9,
    lineHeight: 11,
    color: colors.primaryWhite,
  },
  itemDetails: {
    backgroundColor: '#FFE092',
    padding: 10,
    marginBottom: 2,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemName: {
    fontWeight: '800',
    fontSize: 9,
    lineHeight: 11,
    color: colors.primaryBlack,
  },
  itemDate: {
    fontWeight: '400',
    fontSize: 9,
    lineHeight: 11,
    color: colors.primaryBlack,
  },
  itemTime: {
    fontWeight: '500',
    fontSize: 9,
    lineHeight: 11,
    color: colors.primaryBlack,
  },
  itemPrice: {
    fontWeight: '800',
    fontSize: 9,
    lineHeight: 11,
    color: colors.primaryBlack,
  },
  professionalText: {
    fontWeight: '500',
    fontSize: 9,
    lineHeight: 11,
    color: colors.primaryBlack,
    marginTop: 5,
  },
});
