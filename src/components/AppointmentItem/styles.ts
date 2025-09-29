import { Card } from '@mui/material';
import { StyleSheet, Text, View } from 'react-native';
import colors from '@theme/colors';

// CardContainer -> row
// ImageContainer -> 100%
//   StatusBadge -> top-right
//   ViewProfileButton -> bottom-right
// DetailsContainer -> column
//   ProfessionalName -> Alata, weight 400, 32px, primaryOrange
//   CategoryTitle -> Alata, weight 400, 14px, primaryBlack
//   LocationTitle -> Alata, weight 400, 10px, primaryBlue
//   ServiceTitle -> Inter, weight 400, 24px, primaryBlack
//   StartTime -> Inter, weight 500, 24px, primaryOrange
//   DetailButton

export const Styles = StyleSheet.create({
  Card: {
    flexDirection: 'row',
    backgroundColor: colors.primaryWhite,
    borderRadius: 5,
  },
  OuterContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  ProfessionalName: {
    fontFamily: 'Afacad-Regular',
    fontSize: 32,
    fontWeight: '400',
    color: colors.primaryOrange,
  },
  CategoryTitle: {
    fontFamily: 'Afacad-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: colors.primaryBlack,
  },
  LocationTitle: {
    fontFamily: 'Afacad-Regular',
    fontSize: 10,
    fontWeight: '400',
    color: colors.primaryBlue,
  },
  ServiceTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 24,
    fontWeight: '400',
    color: colors.primaryBlack,
  },
  StartTime: {
    fontFamily: 'Inter-Medium',
    fontSize: 24,
    fontWeight: '500',
    color: colors.primaryOrange,
  },
});
