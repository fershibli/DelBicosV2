import { StyleSheet } from 'react-native';
import colors from '@theme/colors';

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
    color: colors.primaryBlue,
  },
  professionalName: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 18,
    color: colors.primaryBlack,
    marginBottom: 5,
  },
  serviceInfo: {
    fontWeight: '300',
    fontSize: 12,
    color: colors.primaryBlack,
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
});
