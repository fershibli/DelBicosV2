import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDE6F0',
    paddingHorizontal: 15,
  },
  header: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'flex-start',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 18,
    color: '#005A93',
  },
  professionalContainer: {
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 15
  },
  professionalName: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 18,
    color: '#000000',
    marginBottom: 5,
  },
  serviceInfo: {
    fontWeight: '300',
    fontSize: 12,
    color: '#000000',
    marginBottom: 5,
  },
  viewProfessionalText: {
    fontWeight: '300',
    fontSize: 9,
    lineHeight: 11,
    color: '#005A93',
  },
  divider: {
    height: 2,
    backgroundColor: '#D9D9D9',
    marginVertical: 15,
  },
  statusContainer: {
    marginBottom: 20,
  },
  statusBanner: {
    backgroundColor: '#22843B',
    borderWidth: 1,
    borderColor: '#22843B',
    borderRadius: 3,
    width: '40%',
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  reminderButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  reminderText: {
    fontSize: 9,
    lineHeight: 11,
    color: '#000000',
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
    marginBottom: 2
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
  addressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  addressText: {
    fontSize: 15,
    lineHeight: 18,
    color: 'black',
    textAlign: 'center',
  },
  parnerLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  professionalInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partnerLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  paymentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#005A93',
  },
  paymentStatus: {
    backgroundColor: '#E1F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paymentStatusText: {
    color: '#22843B',
    fontSize: 12,
    fontWeight: '600',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666666',
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  discountValue: {
    color: '#DC3545',
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 10,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#005A93',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22843B',
  },
  paymentMethodContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  paymentMethodTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  paymentMethodCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: '#005A93',
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#005A93',
  },
  paymentMethodDetails: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  couponTag: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  couponText: {
    fontSize: 12,
    color: '#FC8200',
  },
  paymentContainer: {
  marginBottom: 20,
  backgroundColor: '#F5F5F5',
  padding: 15,
  borderRadius: 8,
},
paymentSummary: {
  marginBottom: 15,
},
discountText: {
  color: '#DC3545',
},
paymentMethod: {
  backgroundColor: '#E9F5FF',
  padding: 10,
  borderRadius: 5,
},
paymentNote: {
  marginTop: 10,
  fontSize: 12,
  color: '#22843B',
  fontStyle: 'italic',
}
});

export default styles;