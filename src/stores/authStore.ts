import { create } from 'zustand';

interface AuthState {
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: string | null) => void;
  location: { city: string; state: string } | null;
  setLocation: (location: { city: string; state: string } | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  phoneNumber: null,
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  location: null,
  setLocation: (location) => set({ location }),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));