import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ClientProfileSubRoutes } from '@screens/types';
import { useColors } from '@theme/ThemeProvider';
import { MaterialIcons } from '@expo/vector-icons';

const menuOptions = [
  {
    id: ClientProfileSubRoutes.DadosConta,
    label: 'Dados da Conta',
    icon: 'person-outline',
    activeIcon: 'person',
  },
  {
    id: ClientProfileSubRoutes.MeusEnderecos,
    label: 'Endereços',
    icon: 'location-on',
    activeIcon: 'location-on',
  },
  {
    id: ClientProfileSubRoutes.Seguranca,
    label: 'Segurança',
    icon: 'lock-outline',
    activeIcon: 'lock',
  },
  {
    id: ClientProfileSubRoutes.MeusAgendamentos,
    label: 'Agendamentos',
    icon: 'calendar-today',
    activeIcon: 'calendar-view-day',
  },
  {
    id: ClientProfileSubRoutes.Notificacoes,
    label: 'Notificações',
    icon: 'notifications-none',
    activeIcon: 'notifications',
  },
  // {
  //   id: ClientProfileSubRoutes.Conversas,
  //   label: 'Conversas',
  //   icon: 'chat-bubble-outline',
  //   activeIcon: 'chat-bubble',
  // },
  {
    id: ClientProfileSubRoutes.Favoritos,
    label: 'Favoritos',
    icon: 'favorite-border',
    activeIcon: 'favorite',
  },
  {
    id: ClientProfileSubRoutes.Avaliacoes,
    label: 'Avaliações',
    icon: 'star-outline',
    activeIcon: 'star',
  },
  {
    id: ClientProfileSubRoutes.Historico,
    label: 'Histórico',
    icon: 'history',
    activeIcon: 'history',
  },
];

const MenuNavegacao = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const colors = useColors();

  // Determina a rota ativa. Se não houver, assume DadosConta
  const currentSubroute =
    (route.params as any)?.subroute || ClientProfileSubRoutes.DadosConta;

  const handlePress = (subroute: ClientProfileSubRoutes) => {
    // @ts-ignore - Atualiza o parâmetro na rota atual
    navigation.setParams({ subroute });
  };

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {menuOptions.map((item) => {
        const isActive = currentSubroute === item.id;
        // Nome do ícone baseado no estado ativo/inativo
        const iconName = isActive ? item.activeIcon : item.icon;

        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, isActive && styles.activeMenuItem]}
            onPress={() => handlePress(item.id)}
            activeOpacity={0.7}>
            {/* Indicador lateral (barra laranja) */}
            {isActive && <View style={styles.activeIndicator} />}

            <View style={styles.iconContainer}>
              <MaterialIcons
                name={iconName as any}
                size={22}
                color={isActive ? colors.primaryOrange : colors.textTertiary}
              />
            </View>
            <Text style={[styles.menuText, isActive && styles.activeMenuText]}>
              {item.label}
            </Text>

            {/* Ícone de chevron (seta) sutil na direita para itens inativos */}
            {!isActive && (
              <MaterialIcons
                name="chevron-right"
                size={20}
                color={colors.borderColor}
                style={{ marginLeft: 'auto' }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 8, // Espaçamento entre os itens
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12, // Cantos arredondados modernos
      backgroundColor: 'transparent', // Fundo transparente por padrão
      // Transição suave na web
      ...Platform.select({
        web: { transition: 'all 0.2s ease-in-out' },
      }),
    },
    activeMenuItem: {
      // Fundo laranja bem clarinho (tint) quando ativo
      backgroundColor: '#FFF5EB',
    },
    activeIndicator: {
      position: 'absolute',
      left: 0,
      height: 24, // Altura da barrinha lateral
      width: 4,
      backgroundColor: colors.primaryOrange,
      borderRadius: 2,
    },
    iconContainer: {
      width: 32,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    menuText: {
      fontSize: 16,
      fontFamily: 'Afacad-SemiBold',
      color: colors.textSecondary, // Cinza escuro
    },
    activeMenuText: {
      fontFamily: 'Afacad-Bold',
      color: colors.primaryOrange, // Laranja quando ativo
    },
  });

export default MenuNavegacao;
