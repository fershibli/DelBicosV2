import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
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
  const styles = createStyles(colors);

  const currentSubroute =
    (route.params as any)?.subroute || ClientProfileSubRoutes.DadosConta;

  const handlePress = (subroute: ClientProfileSubRoutes) => {
    // @ts-ignore - Atualiza o parâmetro na rota atual
    navigation.setParams({ subroute });
  };

  return (
    <View style={styles.menuContainer}>
      {menuOptions.map((item) => {
        const isActive = currentSubroute === item.id;
        const iconName = isActive ? item.activeIcon : item.icon;

        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, isActive && styles.activeMenuItem]}
            onPress={() => handlePress(item.id)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
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
