export enum ClientProfileSubRoutes {
  DadosConta = 'DadosConta',
  MeusEnderecos = 'MeusEnderecos',
  TrocarSenha = 'TrocarSenha',
  Seguranca = 'Seguranca',
  MeusAgendamentos = 'MeusAgendamentos',
  Notificacoes = 'Notificacoes',
  Conversas = 'Conversas',
  Favoritos = 'Favoritos',
  Avaliacoes = 'Avaliacoes',
  Historico = 'Historico',
  Pagamentos = 'Pagamentos',
  Ajuda = 'Ajuda',
}

export type ClientProfileParams = {
  [K in ClientProfileSubRoutes]: undefined;
};

export type NavigationParams = {
  Home: undefined;
  Login: undefined;
  LoginPassword: undefined;
  Feed: undefined;
  PartnerProfile: { id: string };
  Register: undefined;
  NotFound: undefined;
  VerificationScreen: { email: string };
  Category: undefined;
  SubCategoryScreen: { categoryId: string };
  ClientProfile: { subroute?: ClientProfileSubRoutes };
  SearchResult: { subcategoryId: number; date: string };
  Checkout: {
    professionalId: number;
    priceFrom: number;
    selectedTime: string;
    imageUrl?: string;
    professionalName?: string;
    serviceId: number;
  };
  PaymentStatus: undefined;
  MySchedules: undefined;
  ProviderDashboard: undefined;
  Help: undefined;
  AdminDashboard: undefined;
  AdminAnalytics: undefined;
};
