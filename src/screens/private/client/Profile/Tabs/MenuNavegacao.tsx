import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ClientProfileSubRoutes } from '@screens/types';

type ClientProfileRouteParams = {
  subroute?: ClientProfileSubRoutes;
};

type MenuItem = {
  id: number;
  title: string;
  route: ClientProfileSubRoutes;
};

const MenuNavegacao: React.FC = () => {
  const colors = useColors();
  const styles = createStyles(colors);
  // Use root navigation; we'll navigate into the nested ClientProfile navigator
  const navigation = useNavigation();

  const route = useRoute();
  const subroute =
    (route.params as ClientProfileRouteParams)?.subroute ||
    ClientProfileSubRoutes.DadosConta;

  const menuItems: MenuItem[] = [
    { id: 1, title: 'Conta', route: ClientProfileSubRoutes.DadosConta },
    { id: 2, title: 'Endereços', route: ClientProfileSubRoutes.MeusEnderecos },
    { id: 3, title: 'Segurança', route: ClientProfileSubRoutes.TrocarSenha },
    {
      id: 4,
      title: 'Agendamentos',
      route: ClientProfileSubRoutes.MeusAgendamentos,
    },
    {
      id: 5,
      title: 'Notificações',
      route: ClientProfileSubRoutes.Notificacoes,
    },
    { id: 6, title: 'Conversas', route: ClientProfileSubRoutes.Conversas },
    { id: 7, title: 'Favoritos', route: ClientProfileSubRoutes.Favoritos },
    { id: 8, title: 'Avaliações', route: ClientProfileSubRoutes.Avaliacoes },
    { id: 9, title: 'Histórico', route: ClientProfileSubRoutes.Historico },
    { id: 10, title: 'Pagamentos', route: ClientProfileSubRoutes.Pagamentos },
    { id: 11, title: 'Ajuda', route: ClientProfileSubRoutes.Ajuda },
  ];

  const handlePress = (route?: ClientProfileSubRoutes) => {
    // Navigate to nested screen inside ClientProfile
    // If we're already in ClientProfile, this will switch the nested screen.
    navigation.navigate('ClientProfile', {
      subroute: route,
    } as never);
  };

  return (
    <View style={styles.menuContainer}>
      {menuItems.map((item) => {
        const isActive = item.route === subroute;
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, isActive && styles.activeMenuItem]}
            onPress={() => handlePress(item.route)}
            activeOpacity={0.7}>
            <Text style={[styles.menuText, isActive && styles.activeMenuText]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MenuNavegacao;
