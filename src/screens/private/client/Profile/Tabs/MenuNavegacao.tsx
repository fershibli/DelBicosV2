import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TextCostumization from './TextCostumization';
import ButtonNative from '@components/Button/Button.native';

type MenuNavegacaoProps = {
  onItemSelected?: (screen: string) => void;
  initialActive?: string;
};

type MenuItem = {
  id: number;
  title: string;
  screen: string;
};

const MenuNavegacao: React.FC<MenuNavegacaoProps> = ({
  onItemSelected,
  initialActive = 'DadosConta',
}) => {
  const [activeItem, setActiveItem] = useState(initialActive);

  useEffect(() => {
    setActiveItem(initialActive);
  }, [initialActive]);

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
    setActiveItem(screen);
    if (onItemSelected) {
      onItemSelected(screen);
    }
  };

  return (
    <View style={styles.menuContainer}>
      {menuItems.map((item) => {
        const isActive = item.screen === activeItem;
        
        const colorVariant = isActive ? 'primary' : 'primaryWhite';
        
        return (
          <ButtonNative
            key={item.id}
            onPress={() => handlePress(item.screen)}
            colorVariant={colorVariant}
            sizeVariant="largePill"
            style={[
              styles.menuItem,
              isActive && styles.activeMenuItem
            ]}
          >
            <TextCostumization
              style={[
                styles.menuText,
                isActive && styles.activeMenuText
              ]}
            >
              {item.title}
            </TextCostumization>
          </ButtonNative>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  menuItem: {
    width: '90%',
    height: 41,
    marginBottom: 17,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  activeMenuItem: {
    backgroundColor: '#005A93',
  },
  menuText: {
    fontSize: 23,
    fontWeight: '400',
    color: '#222',
  },
  activeMenuText: {
    color: '#fff',
  },
});

export default MenuNavegacao;