import React from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import MenuNavegacao from './Tabs/MenuNavegacao';
import AlterarEnderecoForm from './Tabs/AlterarEnderecoForm';
import DadosContaForm from './Tabs/DadosContaForm';
import TrocarSenhaForm from './Tabs/TrocarSenhaForm';
import MeusAgendamentos from './Tabs/MeusAgendamentos';
import NotificacoesContent from './Tabs/NotificacoesContent';
import AvaliacoesTab from './Tabs/AvaliacoesTab';
import FavoritosTab from './Tabs/FavoritosTab';
import { useColors } from '@theme/ThemeProvider';
import { useThemeStore } from '@stores/Theme';
import { ThemeMode } from '@stores/Theme/types';
import HistoricoCompras from '@screens/private/client/Profile/Tabs/HistoricoCompras';
import { useRoute } from '@react-navigation/native';
import { ClientProfileSubRoutes } from '@screens/types';
import { UserProfileProps } from './types';

type ClientProfileRouteParams = {
  subroute?: ClientProfileSubRoutes;
};

const ProfileWrapper: React.FC<{ user: UserProfileProps }> = ({ user }) => {
  const route = useRoute();
  const subroute =
    (route.params as ClientProfileRouteParams)?.subroute ||
    ClientProfileSubRoutes.DadosConta;

  const renderScreen = () => {
    switch (subroute) {
      case ClientProfileSubRoutes.DadosConta:
        return <DadosContaForm user={user} />;
      case ClientProfileSubRoutes.MeusEnderecos:
        return <AlterarEnderecoForm />;
      case ClientProfileSubRoutes.TrocarSenha:
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
        return (
          <Text style={styles.contentText}>Selecione uma opção no menu</Text>
        );
    }
  };

  const { theme } = useThemeStore();
  const isDark = theme === ThemeMode.DARK;
  const isHighContrast = theme === ThemeMode.LIGHT_HI_CONTRAST;
  const colors = useColors();
  const styles = createStyles(colors);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? '#323232'
            : isHighContrast
              ? colors.backgroundElevated
              : colors.secondaryGray,
        },
      ]}>
      <View style={styles.bodyWrapper}>
        <ScrollView
          style={[
            styles.menuSection,
            isDark ? { backgroundColor: 'transparent' } : null,
          ]}>
          <MenuNavegacao />
        </ScrollView>

        <View
          style={[
            styles.mainContent,
            isDark
              ? { backgroundColor: '#545454' }
              : isHighContrast
                ? {
                    backgroundColor: colors.cardBackground,
                    borderWidth: 2,
                    borderColor: colors.primaryBlack,
                  }
                : null,
          ]}>
          {renderScreen()}
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingVertical: 20,
      backgroundColor: colors.primaryWhite,
      ...Platform.select({
        ios: {
          shadowColor: colors.primaryBlack,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 4,
        },
        web: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        },
      }),
    },
    bodyWrapper: {
      flex: 1,
      flexDirection: 'row',
    },
    menuSection: {
      width: '25%',
      minWidth: 220,
      maxWidth: 280,
      paddingVertical: 20,
      paddingHorizontal: 18,
    },
    mainContent: {
      flex: 1,
    },
    contentText: {
      fontSize: 18,
      textAlign: 'center',
      color: '#333',
      marginTop: 40,
    },
  });

export default ProfileWrapper;
