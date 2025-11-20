import { StyleSheet, Platform } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  // Container Principal
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.secondaryGray,
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryBlue,
    marginBottom: 24,
  },

  // Card Principal
  card: {
    backgroundColor: colors.primaryWhite,
    borderRadius: 16,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: colors.primaryBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: `0px 2px 8px rgba(0, 0, 0, 0.1)`,
      },
    }),
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Avatar
  avatarContainer: {
    width: 100,
    height: 100,
    marginRight: 24,
  },
  avatarTouchable: {
    width: '100%',
    height: '100%',
  },
  avatarAnimatedWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: colors.primaryOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarInitials: {
    fontSize: 40,
    fontFamily: 'Afacad-Bold',
    color: colors.primaryWhite,
  },
  avatarOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarOverlayText: {
    color: colors.primaryWhite,
    fontFamily: 'Afacad-SemiBold',
    fontSize: 14,
    textAlign: 'center',
  },

  // Grid do Formulário
  formGrid: {
    flex: 1,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
  },
  formCol: {
    flex: 1,
  },
  saveButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  saveButton: {
    backgroundColor: colors.primaryBlue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  saveButtonText: {
    color: colors.primaryWhite,
    fontFamily: 'Afacad-Bold',
    fontSize: 16,
  },

  // Modal de Opções do Avatar
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    backgroundColor: colors.primaryWhite,
    borderRadius: 16,
    padding: 16,
    width: '90%',
    maxWidth: 350,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  optionButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  optionText: {
    fontSize: 18,
    fontFamily: 'Afacad-Regular',
    color: '#007AFF',
    textAlign: 'center',
  },
  removeOption: {
    borderBottomWidth: 0,
  },
  removeText: {
    color: '#FF3B30',
  },
  cancelOption: {
    marginTop: 10,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    borderBottomWidth: 0,
    paddingVertical: 16,
  },
  cancelText: {
    color: '#007AFF',
    fontFamily: 'Afacad-Bold',
    textAlign: 'center',
  },

  // Modal de Status (Sucesso/Erro/Loading)
  statusModalContainer: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
    maxWidth: 350,
  },
  statusModalIcon: {
    fontSize: 40,
    marginBottom: 15,
  },
  statusModalTitle: {
    fontSize: 22,
    fontFamily: 'Afacad-Bold',
    marginBottom: 10,
    color: '#1d2b36',
  },
  statusModalMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  statusModalButton: {
    marginTop: 10,
    backgroundColor: colors.primaryBlue,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  statusModalButtonText: {
    color: colors.primaryWhite,
    fontFamily: 'Afacad-Bold',
    fontSize: 16,
  },

  // Menu de navegação
  menuContainer: {
    paddingVertical: 20,
    paddingRight: 16,
  },
  menuItem: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginBottom: 12,
    backgroundColor: colors.secondaryBeige,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      web: {
        transition: 'background-color 0.2s ease',
      },
    }),
  },
  activeMenuItem: {
    backgroundColor: colors.primaryOrange,
    ...Platform.select({
      ios: {
        shadowColor: colors.primaryOrange,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: `0px 2px 6px ${colors.primaryOrange}80`,
      },
    }),
  },
  menuText: {
    fontSize: 18,
    fontFamily: 'Afacad-SemiBold',
    color: colors.primaryBlack,
  },
  activeMenuText: {
    color: colors.primaryWhite,
    fontFamily: 'Afacad-Bold',
  },

  // Password Change Section
  formContainer: {
    padding: 16,
  },
  passwordRules: {
    fontSize: 14,
    fontFamily: 'Afacad-Regular',
    color: '#007bff',
    marginTop: -8,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  buttonContainer: {
    marginTop: 24,
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: colors.primaryBlue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.primaryWhite,
    fontFamily: 'Afacad-Bold',
    fontSize: 16,
  },

  // Message Banner (Success/Error)
  messageBanner: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: colors.primaryBlack,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.15)`,
      },
    }),
  },
  successBanner: {
    backgroundColor: '#D4EDDA',
    borderColor: '#28A745',
  },
  errorBanner: {
    backgroundColor: '#F8D7DA',
    borderColor: '#DC3545',
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Afacad-SemiBold',
    textAlign: 'center',
  },
  successText: {
    color: '#155724',
  },
  errorText: {
    color: '#721C24',
  },
});
