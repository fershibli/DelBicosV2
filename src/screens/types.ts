export type NavigationParams = {
  Home: undefined;
  Login: undefined;
  LoginPassword: undefined;
  Feed: undefined;
  PartnerProfile: { id: string };
  PhoneConfirmation: undefined;
  ConfirmPhoneNumber: { code: string };
  Register: undefined;
  NotFound: undefined;
  VerificationScreen: { email: string };
  ClientProfile: undefined;
  Category: undefined;
  SubCategoryScreen: { categoryId: string };
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
  Help: undefined;
};
