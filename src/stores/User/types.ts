
export type User = {
  name: string;
  location: string;
};

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};