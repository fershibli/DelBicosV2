import { StyleSheet, Platform } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.primaryWhite,
  },

  mobileHeader: {
    height: 60,
    backgroundColor: colors.primaryWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  mobileLogo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  logoImage: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  menu: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  locationContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  locationLabel: {
    fontFamily: 'Afacad-Regular',
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },

  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  userName: {
    fontFamily: 'Afacad-SemiBold',
    fontSize: 14,
    color: colors.primaryBlack,
  },
  loginButton: {
    paddingHorizontal: 10,
  },

  searchBar: {
    backgroundColor: colors.primaryBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 12,
    gap: 20,
  },
  searchText: {
    color: colors.primaryWhite,
    fontSize: 16,
    fontFamily: 'Afacad-SemiBold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryWhite,
    borderRadius: 8,
    overflow: 'hidden',
    width: 350,
    height: 40,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: 'Afacad-Regular',
    height: '100%',
  },
  searchButton: {
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },

  menuOptionsContainer: {
    borderRadius: 8,
    marginTop: 50,
    width: 180,
    ...Platform.select({
      ios: {
        shadowColor: colors.primaryBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
      },
      android: { elevation: 5 },
      web: { boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)' },
    }),
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuOptionText: {
    fontFamily: 'Afacad-Regular',
    fontSize: 15,
    color: '#333',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#EFEFEF',
  },
  menuItemPressable: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    ...Platform.select({
      web: {
        transition: 'background-color 0.2s ease',
      },
    }),
  },
  menuItemHovered: {
    ...Platform.select({
      web: {
        backgroundColor: '#E0E8F0',
      },
    }),
  },
  menuItemText: {
    fontSize: 15,
    fontFamily: 'Afacad-SemiBold',
    color: '#333',
  },
  menuItemTextHovered: {
    ...Platform.select({
      web: {
        color: colors.primaryBlue,
      },
    }),
  },
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  authButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#003366',
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        transition: 'all 0.2s ease',
      },
    }),
  },
  authButtonText: {
    fontFamily: 'Afacad-SemiBold',
    fontSize: 14,
    color: '#003366',
  },
  authButtonHovered: {
    ...Platform.select({
      web: {
        backgroundColor: 'rgba(0, 51, 102, 0.1)',
        borderColor: colors.primaryBlue,
      },
    }),
  },
  authButtonTextHovered: {
    ...Platform.select({
      web: {
        color: colors.primaryBlue,
      },
    }),
  },

  authButtonSecondary: {
    backgroundColor: colors.primaryOrange,
    borderColor: colors.primaryOrange,
  },
  authButtonTextSecondary: {
    color: '#FFFFFF',
  },
  authButtonSecondaryHovered: {
    ...Platform.select({
      web: {
        backgroundColor: '#ca6f00ff',
        borderColor: '#ca6f00ff',
      },
    }),
  },

  authButtonPressed: {
    opacity: 0.8,
  },
});
