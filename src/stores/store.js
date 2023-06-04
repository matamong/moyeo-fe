import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(devtools((set) => ({
  authUser: null,

  setAuthUser: (user) => set({ authUser: user }),
  clearAuthUser: () => set({ authUser: null }),
})));

export default useStore;