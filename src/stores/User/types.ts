export type User = {
  name: string;
  location: string;
};

export type UserStore = {
  user: User | null;
  login: () => void;
  logout: () => void;
};
