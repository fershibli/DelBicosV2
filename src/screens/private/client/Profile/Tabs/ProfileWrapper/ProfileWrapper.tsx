import React from 'react';
import {
  View,
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
import { UserProfileProps } from '../../types';
import { createStyles } from './styles';
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

  // No mobile, se não tem subrota, mostra o menu. No desktop, padrão é DadosConta.
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

  // --- RENDERIZAÇÃO MOBILE (Menu -> Subtela) ---
  if (isMobile) {
    if (activeSubroute) {
      // Exibe a subtela com botão de voltar
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

    // Exibe o Menu Principal
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

  // --- RENDERIZAÇÃO DESKTOP (Sidebar + Conteúdo) ---
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

export default ProfileWrapper;
