import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUserStore } from '@stores/User';
import { ClientProfileSubRoutes } from '@screens/types';
import { useColors } from '@theme/ThemeProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { createStyles } from './styles';

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
    id: ClientProfileSubRoutes.Notificacoes,
    label: 'Notificações',
    icon: 'notifications-none',
    activeIcon: 'notifications',
  },
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
  {
    id: ClientProfileSubRoutes.TornarParceiro,
    label: 'Tornar-se Colaborador',
    icon: 'card-travel',
    activeIcon: 'work',
  },
];

const MenuNavegacao = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useUserStore();
  const colors = useColors();
  const styles = createStyles(colors);

  const currentSubroute =
    (route.params as any)?.subroute || ClientProfileSubRoutes.DadosConta;

  const isProfessionalTab = route.name === 'ProfessionalProfileTab';

  const dynamicMenuOptions = menuOptions.map((option) => {
    if (option.id === ClientProfileSubRoutes.TornarParceiro) {
      if (isProfessionalTab) {
        return {
          ...option,
          id: 'VoltarCliente',
          label: 'Acessar Painel Cliente',
          icon: 'person',
          activeIcon: 'person',
        } as any;
      } else if (user?.professional_id) {
        return {
          ...option,
          id: 'AcessarParceiro',
          label: 'Acessar Painel Colaborador',
          icon: 'work',
          activeIcon: 'work',
        } as any;
      }
    }

    return option;
  });

  const handlePress = (subroute: string) => {
    if (subroute === 'VoltarCliente') {
      // @ts-ignore
      navigation.navigate('MainTabs', { screen: 'ProfileTab' });
      return;
    }
    if (subroute === 'AcessarParceiro') {
      // @ts-ignore
      navigation.navigate('ProfessionalTabs', { screen: 'ProfessionalProfileTab' });
      return;
    }
    // @ts-ignore - Atualiza o parâmetro na rota atual
    navigation.setParams({ subroute });
  };

  return (
    <View style={styles.menuContainer}>
      {dynamicMenuOptions.map((item) => {
        const isActive = currentSubroute === item.id;
        const iconName = isActive ? item.activeIcon : item.icon;

        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              isActive && styles.activeMenuItem,
              (item as any).disabled && { opacity: 0.5 },
            ]}
            onPress={() => !(item as any).disabled && handlePress(item.id)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{
              selected: isActive,
              disabled: !!(item as any).disabled,
            }}
            accessibilityLabel={`Ir para ${item.label}`}>
            {isActive && <View style={styles.activeIndicator} />}

            <View style={styles.menuIconContainer}>
              <MaterialIcons
                name={iconName as any}
                size={22}
                color={isActive ? colors.primaryOrange : colors.textTertiary}
              />
            </View>

            <Text style={[styles.menuText, isActive && styles.activeMenuText]}>
              {item.label}
            </Text>

            {!isActive && (
              <MaterialIcons
                name="chevron-right"
                size={20}
                color={colors.borderColor}
                style={styles.chevronIcon}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MenuNavegacao;
