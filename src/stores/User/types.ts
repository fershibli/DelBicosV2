export type User = {
  name: string;
  location: string;
};

export type UserStore = {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
};
