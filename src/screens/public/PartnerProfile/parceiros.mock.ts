export const parceiros = [
  {
    id: 'parceiro-1',
    nome: 'Jefferson Santos',
    categoria: 'Beleza e estética',
    subcategoria: 'Barbeiro',
    imagemCapa:
      'https://www.shutterstock.com/image-photo/haircut-by-hairdresser-barbershop-barber-600nw-2484467169.jpg',
    endereco: {
      rua: 'Rua Mascarenhas Carneio, 517',
      cep: '18600-692',
      bairro: 'Vila Santana',
      cidade: 'Sorocaba',
      estado: 'SP',
    },
    avaliacaoMedia: 4.6,
    descricao:
      'Salão especializado em cortes masculinos e barba, com atendimento personalizado e ambiente climatizado. Possuimos os melhores profissionais da região',
    comodidadesIds: ['1', '3', '6'],
    servicos: [
      {
        id: '1',
        nome: 'Corte Masculino',
        preco: 'R$ 30,00',
        duracao: '30 min',
      },
      { id: '2', nome: 'Barba', preco: 'R$ 20,00', duracao: '20 min' },
      { id: '3', nome: 'Luzes', preco: 'R$ 120,00', duracao: '1h 30min' },
    ],
    agenda: [
      {
        data: '2025-06-04',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
      {
        data: '2025-06-05',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
      {
        data: '2025-06-06',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
    ],
    galeria: [
      {
        id: '1',
        url: 'https://media.gettyimages.com/id/872361244/pt/foto/man-getting-his-beard-trimmed-with-electric-razor.jpg?s=612x612',
      },
      {
        id: '2',
        url: 'https://st2.depositphotos.com/2931363/9695/i/450/depositphotos_96952024-stock-photo-young-handsome-man-in-barbershop.jpg',
      },
      {
        id: '3',
        url: 'https://media.gettyimages.com/id/1472388969/pt/foto/smiling-barber-and-customer-in-the-barbershop-watching-a-video-on-a-smartphone.jpg?s=612x612',
      },
      {
        id: '4',
        url: 'https://thumbs.dreamstime.com/b/cabelo-profissional-do-corte-do-barbeiro-de-seu-cliente-68910066.jpg',
      },
    ],
    avaliacoes: [
      {
        id: '1',
        usuario: {
          nome: 'Carlos Silva',
          foto: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        nota: 4.5,
        titulo: 'Ótimo atendimento!',
        descricao:
          'O serviço foi excelente e o profissional muito atencioso. Recomendo!',
        data: '2023-05-15',
      },
      {
        id: '2',
        usuario: {
          nome: 'Ana Oliveira',
          foto: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
        nota: 5,
        descricao: 'Adorei o resultado, superou minhas expectativas!',
        data: '2023-06-02',
      },
    ],
  },

  {
    id: 'parceiro-2',
    nome: 'Camila Rocha',
    categoria: 'Beleza e estética',
    subcategoria: 'Pedicure',
    imagemCapa:
      'https://images.unsplash.com/photo-1588776814546-7e10856097e3?auto=format&fit=crop&w=800&q=60',
    endereco: {
      rua: 'Av. Brasil, 890',
      cep: '18600-320',
      bairro: 'Centro',
      cidade: 'Sorocaba',
      estado: 'SP',
    },
    avaliacaoMedia: 4.8,
    descricao:
      'Serviço profissional de pedicure com foco em relaxamento e cuidado dos pés.',
    comodidadesIds: ['2', '3', '5'],
    servicos: [
      {
        id: '1',
        nome: 'Pedicure Simples',
        preco: 'R$ 25,00',
        duracao: '30 min',
      },
      { id: '2', nome: 'Pedicure Spa', preco: 'R$ 45,00', duracao: '45 min' },
    ],
    agenda: [
      {
        data: '2025-06-04',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
      {
        data: '2025-06-05',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
      {
        data: '2025-06-06',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
    ],
    galeria: [
      'https://images.unsplash.com/photo-1588776814546-7e10856097e3',
      'https://images.unsplash.com/photo-1611250204475-31ff9e435f13',
    ].map((url, idx) => ({ id: `${idx + 1}`, url })),
    avaliacoes: [
      {
        id: '1',
        usuario: {
          nome: 'Mariana Costa',
          foto: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        nota: 5,
        titulo: 'Experiência incrível!',
        descricao: 'Atendimento impecável, ambiente limpo e confortável.',
        data: '2024-11-20',
      },
      {
        id: '2',
        usuario: {
          nome: 'João Pereira',
          foto: 'https://randomuser.me/api/portraits/men/23.jpg',
        },
        nota: 4.8,
        descricao: 'Muito bom! Voltarei com certeza.',
        data: '2025-01-10',
      },
    ],
  },

  {
    id: 'parceiro-3',
    nome: 'Tatiane Lima',
    categoria: 'Beleza e estética',
    subcategoria: 'Depilação',
    imagemCapa:
      'https://images.unsplash.com/photo-1611765088790-6de1005b8b14?auto=format&fit=crop&w=800&q=60',
    endereco: {
      rua: 'Rua das Flores, 123',
      cep: '18000-111',
      bairro: 'Jardim América',
      cidade: 'Sorocaba',
      estado: 'SP',
    },
    avaliacaoMedia: 4.7,
    descricao:
      'Especialista em depilação com cera, linha e laser, garantindo conforto e higiene.',
    comodidadesIds: ['1', '4'],
    servicos: [
      {
        id: '1',
        nome: 'Depilação com Cera',
        preco: 'R$ 40,00',
        duracao: '30 min',
      },
      {
        id: '2',
        nome: 'Depilação com Linha',
        preco: 'R$ 30,00',
        duracao: '20 min',
      },
    ],
    agenda: [
      {
        data: '2025-06-04',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
      {
        data: '2025-06-05',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
      {
        data: '2025-06-06',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
    ],
    galeria: [
      'https://images.unsplash.com/photo-1611765088790-6de1005b8b14',
      'https://images.unsplash.com/photo-1611262588043-2d9b03f6b496',
    ].map((url, idx) => ({ id: `${idx + 1}`, url })),
    avaliacoes: [
      {
        id: '1',
        usuario: {
          nome: 'Mariana Costa',
          foto: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        nota: 5,
        titulo: 'Experiência incrível!',
        descricao: 'Atendimento impecável, ambiente limpo e confortável.',
        data: '2024-11-20',
      },
      {
        id: '2',
        usuario: {
          nome: 'João Pereira',
          foto: 'https://randomuser.me/api/portraits/men/23.jpg',
        },
        nota: 4.8,
        descricao: 'Muito bom! Voltarei com certeza.',
        data: '2025-01-10',
      },
    ],
  },

  {
    id: 'parceiro-4',
    nome: 'Bruna Martins',
    categoria: 'Beleza e estética',
    subcategoria: 'Manicure',
    imagemCapa:
      'https://images.unsplash.com/photo-1588776814475-787e02800d6c?auto=format&fit=crop&w=800&q=60',
    endereco: {
      rua: 'Rua Rio Grande, 456',
      cep: '18015-440',
      bairro: 'Campolim',
      cidade: 'Sorocaba',
      estado: 'SP',
    },
    avaliacaoMedia: 5,
    descricao:
      'Atendimento personalizado com esmaltação artística e cuidados com as unhas.',
    comodidadesIds: ['3', '5'],
    servicos: [
      {
        id: '1',
        nome: 'Manicure Simples',
        preco: 'R$ 20,00',
        duracao: '25 min',
      },
      {
        id: '2',
        nome: 'Esmaltação Artística',
        preco: 'R$ 35,00',
        duracao: '40 min',
      },
    ],
    agenda: [
      {
        data: '2025-06-04',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
      {
        data: '2025-06-05',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
      {
        data: '2025-06-06',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
    ],
    galeria: [
      'https://images.unsplash.com/photo-1588776814475-787e02800d6c',
      'https://images.unsplash.com/photo-1611931034256-3e1d85e28992',
    ].map((url, idx) => ({ id: `${idx + 1}`, url })),
    avaliacoes: [
      {
        id: '1',
        usuario: {
          nome: 'Mariana Costa',
          foto: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        nota: 5,
        titulo: 'Experiência incrível!',
        descricao: 'Atendimento impecável, ambiente limpo e confortável.',
        data: '2024-11-20',
      },
      {
        id: '2',
        usuario: {
          nome: 'João Pereira',
          foto: 'https://randomuser.me/api/portraits/men/23.jpg',
        },
        nota: 4.8,
        descricao: 'Muito bom! Voltarei com certeza.',
        data: '2025-01-10',
      },
    ],
  },

  {
    id: 'parceiro-5',
    nome: 'Jéssica Paiva',
    categoria: 'Beleza e estética',
    subcategoria: 'Maquiagem',
    imagemCapa:
      'https://images.unsplash.com/photo-1609579403388-052d318e41d7?auto=format&fit=crop&w=800&q=60',
    endereco: {
      rua: 'Av. São Paulo, 999',
      cep: '18030-100',
      bairro: 'Jardim Simus',
      cidade: 'Sorocaba',
      estado: 'SP',
    },
    avaliacaoMedia: 4.9,
    descricao:
      'Maquiadora profissional para eventos, ensaios e produções especiais.',
    comodidadesIds: ['1', '3', '7'],
    servicos: [
      { id: '1', nome: 'Maquiagem Social', preco: 'R$ 90,00', duracao: '1h' },
      {
        id: '2',
        nome: 'Maquiagem Artística',
        preco: 'R$ 120,00',
        duracao: '1h 30min',
      },
    ],
    agenda: [
      {
        data: '2025-06-04',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
      {
        data: '2025-06-05',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
      {
        data: '2025-06-06',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
    ],
    galeria: [
      'https://images.unsplash.com/photo-1609579403388-052d318e41d7',
      'https://images.unsplash.com/photo-1581349482042-e8d2231b539b',
    ].map((url, idx) => ({ id: `${idx + 1}`, url })),
    avaliacoes: [
      {
        id: '1',
        usuario: {
          nome: 'Mariana Costa',
          foto: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        nota: 5,
        titulo: 'Experiência incrível!',
        descricao: 'Atendimento impecável, ambiente limpo e confortável.',
        data: '2024-11-20',
      },
      {
        id: '2',
        usuario: {
          nome: 'João Pereira',
          foto: 'https://randomuser.me/api/portraits/men/23.jpg',
        },
        nota: 4.8,
        descricao: 'Muito bom! Voltarei com certeza.',
        data: '2025-01-10',
      },
    ],
  },

  {
    id: 'parceiro-6',
    nome: 'Fernanda Souza',
    categoria: 'Beleza e estética',
    subcategoria: 'Esteticista',
    imagemCapa:
      'https://images.unsplash.com/photo-1615571812131-71c4f9e29489?auto=format&fit=crop&w=800&q=60',
    endereco: {
      rua: 'Rua dos Estudantes, 321',
      cep: '18035-770',
      bairro: 'Parque Campolim',
      cidade: 'Sorocaba',
      estado: 'SP',
    },
    avaliacaoMedia: 4.8,
    descricao:
      'Tratamentos estéticos faciais e corporais com equipamentos de última geração.',
    comodidadesIds: ['4', '6'],
    servicos: [
      {
        id: '1',
        nome: 'Limpeza de Pele',
        preco: 'R$ 70,00',
        duracao: '50 min',
      },
      {
        id: '2',
        nome: 'Massagem Relaxante',
        preco: 'R$ 100,00',
        duracao: '1h',
      },
    ],
    agenda: [
      {
        data: '2025-06-04',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
      {
        data: '2025-06-05',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
      {
        data: '2025-06-06',
        horarios: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
        ],
      },
    ],
    galeria: [
      'https://images.unsplash.com/photo-1615571812131-71c4f9e29489',
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e',
    ].map((url, idx) => ({ id: `${idx + 1}`, url })),
    avaliacoes: [
      {
        id: '1',
        usuario: {
          nome: 'Mariana Costa',
          foto: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        nota: 5,
        titulo: 'Experiência incrível!',
        descricao: 'Atendimento impecável, ambiente limpo e confortável.',
        data: '2024-11-20',
      },
      {
        id: '2',
        usuario: {
          nome: 'João Pereira',
          foto: 'https://randomuser.me/api/portraits/men/23.jpg',
        },
        nota: 4.8,
        descricao: 'Muito bom! Voltarei com certeza.',
        data: '2025-01-10',
      },
    ],
  },
];
