import { StyleSheet, Platform } from 'react-native';
import { ColorsType } from '@theme/types';

export const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    headerContainer: {
      backgroundColor: colors.primaryWhite,
      zIndex: 100,
    },

    // --- MOBILE HEADER ---
    mobileHeader: {
      height: 60,
      backgroundColor: colors.primaryWhite,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: colors.borderColor,
      paddingHorizontal: 16,
      zIndex: 100,
    },
    mobileLogo: {
      width: 120,
      height: 40,
      resizeMode: 'contain',
    },
    mobileMenuTrigger: {
      padding: 8,
    },

    // --- DESKTOP HEADER (Top Bar) ---
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 80,
      paddingHorizontal: 32,
      borderBottomWidth: 1,
      borderColor: colors.primaryBlue,
      backgroundColor: colors.primaryWhite,
    },
    logoImage: {
      width: 180,
      height: 50,
      resizeMode: 'contain',
    },

    // --- MENU DE NAVEGAÇÃO (DESKTOP) ---
    menu: {
      flexDirection: 'row',
      gap: 24,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      marginHorizontal: 20,
    },
    menuItemPressable: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      ...Platform.select({
        web: { transition: 'background-color 0.2s ease' },
      }),
    },
    menuItemHovered: {
      backgroundColor: colors.primaryOrange,
    },
    menuItemText: {
      fontSize: 15,
      fontFamily: 'Afacad-SemiBold',
      color: colors.primaryBlack,
    },
    menuItemTextHovered: {
      color: colors.primaryWhite,
    },

    // --- SEÇÃO DIREITA (Localização, Tema, User) ---
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    locationContainer: {
      alignItems: 'flex-start',
    },
    locationLabel: {
      fontFamily: 'Afacad-Regular',
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 2,
    },

    // --- USER DROPDOWN ---
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      cursor: 'pointer',
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.borderColor,
      backgroundColor: colors.inputBackground,
    },
    authButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },

    // --- SEARCH BAR (Barra Azul) ---
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
      width: 400,
      height: 44,
    },
    searchInput: {
      flex: 1,
      paddingHorizontal: 16,
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      height: '100%',
      color: colors.primaryBlack,
      outlineStyle: 'none',
    } as any,
    searchButton: {
      paddingHorizontal: 16,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.secondaryGray,
    },

    // --- MENU POPUP (Mobile & Desktop Dropdown) ---
    menuOptionsContainer: {
      borderRadius: 8,
      marginTop: 40,
      width: 220,
      backgroundColor: colors.cardBackground,
      paddingVertical: 4,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
        },
        android: { elevation: 8 },
        web: { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)' },
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
      width: 20,
      textAlign: 'center',
    },
    menuOptionText: {
      fontFamily: 'Afacad-Regular',
      fontSize: 15,
      color: colors.primaryBlack,
    },
    menuDivider: {
      height: 1,
      backgroundColor: colors.divider,
      marginVertical: 4,
    },

    // --- MODAL DE LOCALIZAÇÃO ---
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContainer: {
      width: '100%',
      maxWidth: 700,
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 24,
      ...Platform.select({
        default: { elevation: 10 },
      }),
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontFamily: 'Afacad-Bold',
      color: colors.primaryBlue,
    },
    mapWrapper: {
      width: '100%',
      height: 400,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    modalButton: {
      backgroundColor: colors.primaryOrange,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    modalButtonDisabled: {
      backgroundColor: colors.textTertiary,
      opacity: 0.7,
    },
    modalButtonText: {
      color: colors.primaryWhite,
      fontFamily: 'Afacad-Bold',
      fontSize: 16,
    },
  });
