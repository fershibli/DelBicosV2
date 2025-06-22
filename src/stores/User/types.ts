export type User = {
  id: number;
  clientId: number;
  email: string;
  name: string;
  phone: string;
  cpf: string;
};

export type Address = {
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
};

export type UserStore = {
  user: User | null;
  address: Address | null;
  token: string | null;
  signIn: () => void;
  signInPassword: (email: string, password: string) => void;
  signOut: () => void;
};
