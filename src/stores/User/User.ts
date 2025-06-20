import { create } from 'zustand';
import { UserStore } from './types';

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  signIn: () => {
    try {
      const mockedUser = {
        name: 'Douglas W.',
        location: 'São Paulo, SP',
      };
      set({ user: mockedUser });
    } catch (error) {
      console.error('Error during login:', error);
      return;
    }
  },
  signOut: () => set({ user: null }),
}));
