import { create } from 'zustand';

interface AuthState {
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  phoneNumber: null,
  setPhoneNumber: (phoneNumber: string | null) => set({ phoneNumber }),
}));