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
  TornarParceiro = 'TornarParceiro',
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
  PaymentStatus:
    | {
        appointmentId?: number;
        paymentIntentId?: string;
      }
    | undefined;
  MySchedules: undefined;
  ProfessionalTabs: undefined;
  ProfessionalHomeTab: undefined;
  ProfessionalSchedulesTab: undefined;
  ProfessionalEarningsTab: undefined;
  ProfessionalProfileTab: undefined;
  Help: undefined;
  AdminDashboard: undefined;
  AdminAnalytics: undefined;
};
