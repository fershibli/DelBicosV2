import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDE6F0',
    paddingHorizontal: 15,
  },
  divider: {
    height: 2,
    backgroundColor: '#D9D9D9',
    marginVertical: 15,
  },
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
  paymentContainer: {
    marginBottom: 20,
  },
  paymentTitle: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 18,
    color: '#000000',
    marginBottom: 5,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontWeight: '300',
    fontSize: 15,
    lineHeight: 18,
    color: '#000000',
  },
});

export default styles;
