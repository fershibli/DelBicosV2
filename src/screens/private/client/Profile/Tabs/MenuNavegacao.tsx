import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type MenuNavegacaoProps = {
  onItemSelected: (screen: string) => void;
  activeItem: string;
};

type MenuItem = {
  id: number;
  title: string;
  screen: string;
};

const MenuNavegacao: React.FC<MenuNavegacaoProps> = ({
  onItemSelected,
  activeItem,
}) => {
  const menuItems: MenuItem[] = [
    { id: 1, title: 'Conta', screen: 'DadosContaForm' },
    { id: 2, title: 'Endereços', screen: 'MeusEnderecos' },
    { id: 3, title: 'Segurança', screen: 'TrocarSenhaForm' },
    { id: 4, title: 'Agendamentos', screen: 'MeusAgendamentos' },
    { id: 5, title: 'Notificações', screen: 'Notificacoes' },
    { id: 6, title: 'Conversas', screen: 'Conversas' },
    { id: 7, title: 'Favoritos', screen: 'Favoritos' },
    { id: 8, title: 'Avaliações', screen: 'Avaliacoes' },
    { id: 9, title: 'Histórico', screen: 'Historico' },
    { id: 10, title: 'Pagamentos', screen: 'Pagamentos' },
    { id: 11, title: 'Ajuda', screen: 'Ajuda' },
  ];

  const handlePress = (screen: string) => {
    onItemSelected(screen);
  };

  return (
    <View style={styles.menuContainer}>
      {menuItems.map((item) => {
        const isActive = item.screen === activeItem;
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.menuItem, isActive && styles.activeMenuItem]}
            onPress={() => handlePress(item.screen)}
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
