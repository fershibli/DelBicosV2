export type User = {
  id: string;
  email: string;
  name: string;
  phone: string;
  location?: string;
};

export type UserStore = {
  user: User | null;
  token: string | null;
  signIn: () => void;
  signInPassword: (email: string, password: string) => void;
  signOut: () => void;
};
