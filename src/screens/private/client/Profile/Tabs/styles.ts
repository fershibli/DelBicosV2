import { StyleSheet, Platform } from 'react-native';
import colors from '@theme/colors';

export const styles = StyleSheet.create({
  // Container Principal
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F7FA',
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: 'Afacad-Bold',
    color: '#003366',
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
    borderRadius: 50, // Círculo perfeito
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
    justifyContent: 'flex-end', // Alinha o botão na parte de baixo
    alignItems: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#003366',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  optionsContainer: {
    backgroundColor: colors.primaryWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  optionButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  optionText: {
    fontSize: 18,
    fontFamily: 'Afacad-Regular',
    color: '#007AFF', // Cor azul padrão do iOS para ações
    textAlign: 'center',
  },
  removeOption: {
    borderBottomWidth: 0,
  },
  removeText: {
    color: '#FF3B30', // Cor vermelha para ação destrutiva
  },
  cancelOption: {
    marginTop: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    borderBottomWidth: 0,
  },
  cancelText: {
    color: '#007AFF',
    fontFamily: 'Afacad-Bold',
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 16,
    backgroundColor: '#e8eef5',
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#003366',
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
    backgroundColor: '#003366',
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
