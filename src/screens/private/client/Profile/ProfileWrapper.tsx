import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import { useColors } from '@theme/ThemeProvider';
import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types';
import { ClientProfileSubRoutes } from '@screens/types';
import { UserProfileProps } from './types';
import DadosContaForm from '@screens/private/client/Profile/Tabs/DadosContaForm';
import AlterarEnderecoForm from '@screens/private/client/Profile/Tabs/AlterarEnderecoForm';
import TrocarSenhaForm from '@screens/private/client/Profile/Tabs/TrocarSenhaForm';
import MeusAgendamentos from '@screens/private/client/Profile/Tabs/MeusAgendamentos';
import NotificacoesContent from '@screens/private/client/Profile/Tabs/NotificacoesContent';
import AvaliacoesTab from '@screens/private/client/Profile/Tabs/AvaliacoesTab';
import FavoritosTab from '@screens/private/client/Profile/Tabs/FavoritosTab';
import HistoricoCompras from '@screens/private/client/Profile/Tabs/HistoricoCompras';
import MenuNavegacao from '@screens/private/client/Profile/Tabs/MenuNavegacao';

type ClientProfileRouteParams = {
  subroute?: ClientProfileSubRoutes;
};

const ProfileWrapper: React.FC<{ user: UserProfileProps }> = ({ user }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const colors = useColors();
  const { theme } = useThemeStore();
  const isDark = theme === ThemeMode.DARK;
  const styles = createStyles(colors, isMobile, isDark);

  const params = route.params as ClientProfileRouteParams;
  const activeSubroute =
    params?.subroute ||
    (isMobile ? undefined : ClientProfileSubRoutes.DadosConta);

  const renderContent = () => {
    switch (activeSubroute) {
      case ClientProfileSubRoutes.DadosConta:
        return <DadosContaForm user={user} />;
      case ClientProfileSubRoutes.MeusEnderecos:
        return <AlterarEnderecoForm />;
      case ClientProfileSubRoutes.Seguranca:
        return <TrocarSenhaForm />;
      case ClientProfileSubRoutes.MeusAgendamentos:
        return <MeusAgendamentos />;
      case ClientProfileSubRoutes.Notificacoes:
        return <NotificacoesContent />;
      case ClientProfileSubRoutes.Avaliacoes:
        return <AvaliacoesTab />;
      case ClientProfileSubRoutes.Favoritos:
        return <FavoritosTab />;
      case ClientProfileSubRoutes.Historico:
        return <HistoricoCompras />;
      default:
        return <DadosContaForm user={user} />;
    }
  };

  // --- RENDERIZAÇÃO MOBILE (Navegação em Pilha Simulada) ---
  if (isMobile) {
    if (activeSubroute) {
      return (
        <View style={styles.mobileContainer}>
          <View style={styles.mobileHeader}>
            <TouchableOpacity
              style={styles.backButton}
              // @ts-ignore
              onPress={() => navigation.setParams({ subroute: undefined })}>
              <View style={styles.backButtonIcon}>
                <FontAwesome
                  name="arrow-left"
                  size={16}
                  color={colors.primaryOrange}
                />
              </View>
              <Text style={styles.backButtonText}>Voltar ao Menu</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.mobileContentScroll}
            showsVerticalScrollIndicator={false}>
            {renderContent()}
          </ScrollView>
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.mobileContainer}
        contentContainerStyle={styles.mobileMenuScroll}>
        <View style={styles.mobileMenuHeader}>
          <Text style={styles.mobileMenuTitle}>Meu Perfil</Text>
          <Text style={styles.mobileMenuSubtitle}>
            Gerencie suas informações e preferências
          </Text>
        </View>
        <View style={styles.mobileMenuCard}>
          <MenuNavegacao />
        </View>
      </ScrollView>
    );
  }

  // --- RENDERIZAÇÃO DESKTOP (Dashboard Full Screen) ---
  return (
    <View style={styles.desktopContainer}>
      <View style={styles.desktopWrapper}>
        {/* Sidebar Fixa */}
        <View style={styles.desktopSidebar}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <MenuNavegacao />
          </ScrollView>
        </View>

        {/* Conteúdo Rolável */}
        <View style={styles.desktopMainContent}>
          <ScrollView
            contentContainerStyle={styles.desktopContentScroll}
            showsVerticalScrollIndicator={Platform.OS === 'web'}>
            {renderContent()}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors: any, isMobile: boolean, isDark: boolean) =>
  StyleSheet.create({
    // --- ESTILOS BASE ---
    desktopContainer: {
      flex: 1,
      backgroundColor: isDark ? '#1e1e1e' : '#F0F2F5',
      minHeight: Platform.OS === 'web' ? ('100vh' as any) : '100%',
    },
    desktopWrapper: {
      flex: 1,
      flexDirection: 'row',
      maxWidth: 1400,
      width: '100%',
      alignSelf: 'center',
      padding: 24,
      gap: 24,
      height: '100%',
    },

    // --- SIDEBAR (DESKTOP) ---
    desktopSidebar: {
      width: 300,
      backgroundColor: isDark ? '#2C2C2C' : colors.primaryWhite,
      borderRadius: 24,
      paddingVertical: 24,
      paddingHorizontal: 20,
      ...Platform.select({
        web: { boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)' },
        default: { elevation: 2 },
      }),
      display: 'flex',
      flexDirection: 'column',
      maxHeight:
        Platform.OS === 'web' ? ('calc(100vh - 120px)' as any) : undefined,
    },
    sidebarUserHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 32,
      paddingBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#444' : '#F0F0F0',
    },
    sidebarAvatarContainer: {
      marginRight: 16,
      ...Platform.select({
        web: { boxShadow: '0px 4px 10px rgba(252, 130, 0, 0.2)' },
      }),
    },
    sidebarAvatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      borderWidth: 2,
      borderColor: colors.primaryWhite,
    },
    sidebarGreeting: {
      fontSize: 14,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
    },
    sidebarUserName: {
      fontSize: 18,
      fontFamily: 'Afacad-Bold',
      color: isDark ? colors.primaryWhite : colors.primaryBlack,
      maxWidth: 180,
    },
    sidebarFooter: {
      marginTop: 'auto',
      paddingTop: 20,
      alignItems: 'center',
    },
    versionText: {
      fontSize: 12,
      color: colors.textTertiary,
      fontFamily: 'Afacad-Regular',
    },

    // --- CONTEÚDO PRINCIPAL (DESKTOP) ---
    desktopMainContent: {
      flex: 1,
      backgroundColor: isDark ? '#2C2C2C' : colors.primaryWhite,
      borderRadius: 24,
      ...Platform.select({
        web: { boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)' },
        default: { elevation: 2 },
      }),
      overflow: 'hidden',
    },
    desktopContentScroll: {
      padding: 40,
      minHeight: '100%',
    },

    // --- MOBILE ---
    mobileContainer: {
      flex: 1,
      backgroundColor: isDark ? '#1e1e1e' : '#F8F9FA',
    },
    mobileHeader: {
      paddingTop: 16,
      paddingBottom: 16,
      paddingHorizontal: 20,
      backgroundColor: isDark ? '#2C2C2C' : colors.primaryWhite,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#444' : '#E0E0E0',
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    backButtonIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: isDark ? '#333' : '#FFF5EB',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backButtonText: {
      fontSize: 16,
      fontFamily: 'Afacad-Bold',
      color: isDark ? colors.primaryWhite : colors.primaryBlack,
    },
    mobileContentScroll: {
      flexGrow: 1,
      padding: 20,
    },
    mobileMenuScroll: {
      padding: 20,
      paddingBottom: 40,
    },
    mobileMenuHeader: {
      marginBottom: 24,
      marginTop: 10,
    },
    mobileMenuTitle: {
      fontSize: 32,
      fontFamily: 'Afacad-Bold',
      color: isDark ? colors.primaryWhite : colors.primaryBlue,
      marginBottom: 8,
    },
    mobileMenuSubtitle: {
      fontSize: 16,
      fontFamily: 'Afacad-Regular',
      color: colors.textTertiary,
    },
    mobileMenuCard: {
      backgroundColor: isDark ? '#2C2C2C' : colors.primaryWhite,
      borderRadius: 20,
      padding: 16,
      ...Platform.select({
        default: { elevation: 2 },
        web: { boxShadow: '0px 4px 15px rgba(0,0,0,0.05)' },
      }),
    },
  });

export default ProfileWrapper;
