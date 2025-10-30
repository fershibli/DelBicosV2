export type User = {
  id: number;
  client_id: number;
  email: string;
  name: string;
  phone: string;
  cpf: string;
  avatar_uri?: string | null;
  banner_uri?: string | null;
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
  verificationEmail: string | null; // Adicionar esta linha
  setVerificationEmail: (email: string | null) => void;
  signIn: () => void;
  signInPassword: (email: string, password: string) => Promise<void>;
  /** Altera a senha do usuário. Recebe a senha atual e a nova senha. */
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  signOut: () => void;
};
