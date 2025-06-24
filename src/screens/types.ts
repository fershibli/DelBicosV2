export type NavigationParams = {
  Home: undefined;
  Login: undefined;
  LoginPassword: undefined;
  Feed: undefined;
  PartnerProfile: { id: string };
  ServiceStatus: undefined;
  PhoneConfirmation: undefined;
  ConfirmPhoneNumber: { code: string };
  Register: undefined;
  NotFound: undefined;
};

export interface Professional {
  id: number;
  user_id: number;
  main_address_id: number;
  cpf: string;
  cnpj: string;
  createdAt: string;
  updatedAt: string;
  User: User;
  address: Address;
  services: any[];
  amenities: any[];
  gallery: GalleryImage[];
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  active: boolean;
  avatarImg: string;
  bannerImg: string;
  createdAt: string;
  updatedAt: string;
}

interface Address {
  id: number;
  lat: string;
  lng: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country_iso: string;
  postal_code: string;
  user_id: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GalleryImage {
  id: number;
  professional_id: number;
  url: string;
  description: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
