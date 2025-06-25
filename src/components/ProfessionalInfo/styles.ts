import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  professionalContainer: {
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  viewProfessionalText: {
    fontWeight: '300',
    fontSize: 9,
    lineHeight: 11,
    color: '#005A93',
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
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  disabledText: {
    color: '#AAAAAA',
  },
});
