import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import MenuNavegacao from './Tabs/MenuNavegacao';
import AlterarEnderecoForm from './Tabs/AlterarEnderecoForm';
import DadosContaForm from './Tabs/DadosContaForm';
import TrocarSenhaForm from './Tabs/TrocarSenhaForm';
import MeusAgendamentos from './Tabs/MeusAgendamentos';
import NotificacoesContent from './Tabs/NotificacoesContent';
import colors from '@theme/colors';
import HistoricoCompras from '@screens/private/client/Profile/Tabs/HistoricoCompras';

interface UserProfileProps {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  avatarSource: { uri: string | null };
  onAvatarChange: (base64: string | null) => Promise<void>;
  uploading?: boolean;
}

const ProfileWrapper: React.FC<{ user: UserProfileProps }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('DadosContaForm');

  const renderScreen = () => {
    switch (activeTab) {
      case 'DadosContaForm':
        return <DadosContaForm user={user} />;
      case 'MeusEnderecos':
        return <AlterarEnderecoForm />;
      case 'TrocarSenhaForm':
        return <TrocarSenhaForm />;
      case 'MeusAgendamentos':
        return <MeusAgendamentos />;
      case 'Notificacoes':
        return <NotificacoesContent userId={user.userId} />;
      case 'Historico':
        return <HistoricoCompras />;
      default:
        return (
          <Text style={styles.contentText}>Selecione uma opção no menu</Text>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bodyWrapper}>
        <ScrollView style={styles.menuSection}>
          <MenuNavegacao activeItem={activeTab} onItemSelected={setActiveTab} />
        </ScrollView>

        <View style={styles.mainContent}>{renderScreen()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryGray,
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
    backgroundColor: '#f0f2f5',
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
