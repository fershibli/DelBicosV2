import { StyleSheet, Platform } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  headerContainer: {
    flexShrink: 1,
    backgroundColor: colors.primaryWhite,
    padding: 0,
    margin: 0,
  },
  navContainer: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  navButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  divider: {
    height: 2,
    backgroundColor: colors.primaryBlack,
  },
  logoImage: {
    width: 476,
    height: 145,
    marginTop: 24,
    marginLeft: 32,
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 43,
  },
  locationLabel: {
    fontFamily: 'Afacad-Regular',
    fontSize: 18,
    color: colors.primaryBlack,
    marginBottom: 0,
  },
  userContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  userName: {
    fontFamily: 'Afacad-Bold',
    fontSize: 16,
    color: colors.primaryBlack,
  },
  blueBar: {
    height: 42,
    backgroundColor: colors.primaryBlue,
    width: '100%',
  },
  menuOptionsContainer: {
    borderRadius: 8,
    marginTop: 40,
    ...Platform.select({
      ios: {
        shadowColor: colors.primaryBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuOptionText: {
    fontFamily: 'Afacad-Regular',
    fontSize: 16,
    color: '#333',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#EFEFEF',
  },
});
