import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';

import MenuNavegacao from './Tabs/MenuNavegacao';
import AlterarEnderecoForm from './Tabs/AlterarEnderecoForm';
import DadosContaForm from './Tabs/DadosContaForm';
import TrocarSenhaForm from './Tabs/TrocarSenhaForm';
import MeusAgendamentos from './Tabs/MeusAgendamentos';
import NotificacoesContent from './Tabs/NotificacoesContent';

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
  const [currentScreen, setCurrentScreen] = useState('MeusEnderecos');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'MeusEnderecos':
        return <AlterarEnderecoForm />;
      case 'DadosContaForm':
        return <DadosContaForm user={user} />;
      case 'TrocarSenhaForm':
        return <TrocarSenhaForm />;
      case 'MeusAgendamentos':
        return <MeusAgendamentos />;
      case 'Notificacoes':
        return <NotificacoesContent userId={user.userId} />;
      default:
        return (
          <Text style={styles.contentText}>Selecione uma opção no menu</Text>
        );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho superior (se houver) */}
      {/* <View style={styles.header}>
        <UserProfile {...user} />
      </View> */}

      {/* Wrapper principal que contém o menu lateral e o conteúdo */}
      <View style={styles.bodyWrapper}>
        {/* Seção do menu lateral */}
        <View style={styles.menuSection}>
          <MenuNavegacao
            initialActive={currentScreen}
            onItemSelected={setCurrentScreen}
          />
        </View>

        {/* Seção do conteúdo principal */}
        <View style={styles.mainContent}>{renderScreen()}</View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dde6f0',
  },
  header: {
    paddingVertical: 20,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  bodyWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  menuSection: {
    width: 250,
    backgroundColor: '#f0f2f5',
    paddingVertical: 20,
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});

export default ProfileWrapper;
