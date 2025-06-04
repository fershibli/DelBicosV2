import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  itemsContainer: {
    borderWidth: 0.3,
    borderColor: '#000000',
    borderRadius: 3,
    marginBottom: 10,
    overflow: 'hidden',
  },
  itemsHeader: {
    backgroundColor: '#FC8200',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  itemsHeaderText: {
    fontWeight: '800',
    fontSize: 9,
    lineHeight: 11,
    color: '#FFFFFF',
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
    color: '#000000',
  },
  itemDate: {
    fontWeight: '400',
    fontSize: 9,
    lineHeight: 11,
    color: '#000000',
  },
  itemTime: {
    fontWeight: '500',
    fontSize: 9,
    lineHeight: 11,
    color: '#000000',
  },
  itemPrice: {
    fontWeight: '800',
    fontSize: 9,
    lineHeight: 11,
    color: '#000000',
  },
  professionalText: {
    fontWeight: '500',
    fontSize: 9,
    lineHeight: 11,
    color: '#000000',
    marginTop: 5,
  },
});
