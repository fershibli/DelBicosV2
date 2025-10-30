export type User = {
  id: number;
  client_id: number;
  email: string;
  name: string;
  phone: string;
  cpf: string;
  avatar_uri?: string | null;
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

export type ErrorResponse = {
  erro: boolean;
  mensagem: string;
};

export type UploadAvatarResponse = {
  erro: boolean;
  mensagem: string;
  avatar_uri?: string;
};

export type UserStore = {
  user: User | null;
  address: Address | null;
  token: string | null;
  verificationEmail: string | null;
  // Base64 completo do avatar
  avatarBase64: string | null;
  setVerificationEmail: (email: string | null) => void;
  signIn: () => void;
  signInPassword: (email: string, password: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  signOut: () => void;
  // Funções para gerenciamento de avatar
  uploadAvatar: (
    userId: string,
    base64Image: string,
  ) => Promise<UploadAvatarResponse>;
  removeAvatar: (userId: string) => Promise<ErrorResponse>;
  fetchUserById: (
    userId: string,
  ) => Promise<{ erro: boolean; mensagem: string; user?: User }>;
  // Função para definir o base64 do avatar
  setAvatarBase64: (base64: string | null) => void;
};
