import { StyleSheet, Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: wp('5%'),
    paddingBottom: hp('10%'),
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: hp('4%'),
    paddingVertical: hp('3%'),
    backgroundColor: '#fff',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  successIcon: {
    fontSize: 64,
    color: '#4CAF50',
    marginBottom: hp('2%'),
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  serviceInfo: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: wp('5%'),
    marginBottom: hp('3%'),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: hp('1%'),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp('1.5%'),
    paddingVertical: hp('0.5%'),
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 2,
    textAlign: 'right',
    flexWrap: 'wrap',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2%'),
    paddingTop: hp('2%'),
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  invoiceSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: wp('5%'),
    marginBottom: hp('3%'),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  invoiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  invoiceIcon: {
    fontSize: 24,
    color: '#4A90E2',
    marginRight: wp('2%'),
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  invoiceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: hp('3%'),
  },
  shareButton: {
    borderColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: hp('1.5%'),
  },
  backButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: hp('2%'),
    marginBottom: hp('3%'),
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#4A90E2',
    marginLeft: wp('2%'),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 18,
    color: '#4A90E2',
    marginRight: wp('2%'),
  },
  buttonText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  additionalInfo: {
    backgroundColor: '#e8f5e8',
    borderRadius: 12,
    padding: wp('4%'),
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  additionalInfoText: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: hp('1%'),
    lineHeight: 20,
  },
});
