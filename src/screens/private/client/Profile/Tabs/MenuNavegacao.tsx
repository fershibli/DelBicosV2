
import React, { useEffect, useState } from 'react';
import TextCostumization from './TextCostumization';


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
  
  // Sincroniza quando a tela ativa fornecida pelo pai mudar
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

  // Estilos para web
  const menuContainer: React.CSSProperties = {
    margin: '20px 0',
    maxWidth: '100%',
  };
  const menuItem: React.CSSProperties = {
    width: "90%",
    height: 41,
    borderRadius: 20,
    marginBottom: 17,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 15,
    cursor: 'pointer',
    userSelect: 'none',
    border: 'none',
    background: 'none',
  };
  // Inativo: neutro claro; Ativo: laranja (mock)
  const activeMenuItem: React.CSSProperties = {
    backgroundColor: '#FC8200',
  };
  const inactiveMenuItem: React.CSSProperties = {
    backgroundColor: '#e8eef5',
  };
  const menuText: React.CSSProperties = {
    fontSize: 23,
    fontWeight: 400,
    color: '#222',
  };
  const activeMenuText: React.CSSProperties = {
    color: '#fff',
  };

  return (
    <div>
      <div style={menuContainer}>
        {menuItems.map((item) => {
          const isActive = item.screen === activeItem;
          return (
            <button
              key={item.id}
              style={{
                ...menuItem,
                ...(isActive ? activeMenuItem : inactiveMenuItem),
              }}
              onClick={() => handlePress(item.screen)}
            >
              <TextCostumization
                style={{
                  ...menuText,
                  ...(isActive ? activeMenuText : {}),
                }}
              >
                {item.title}
              </TextCostumization>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuNavegacao;