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
  complement: string | null;
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
  avatarBase64: string | null;
  setVerificationEmail: (email: string | null) => void;
  signInPassword: (email: string, password: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  signOut: () => void;
  uploadAvatar: (base64Image: string) => Promise<UploadAvatarResponse>;
  removeAvatar: () => Promise<ErrorResponse>;
};
