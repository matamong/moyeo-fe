import { create } from 'zustand';

const AuthStore = create((set) => ({
  authUser: null,

  setauthUser: (authUser) => set({ authUser }),
  clearAuthUser: () => set({ authUser: null }),
}));

export default AuthStore;