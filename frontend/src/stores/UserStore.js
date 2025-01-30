// use zustand store the user status
import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: null,
    verified: false,

    register: (user) => set({ user }),

    login: (user) => set({ user }),

    logout: () => set({ user: null }),

    reset: () => set({ user: null, verified: false }),

    isAuthenticated: () => !!useUserStore.getState().user,

    setVerified: (verified) => set({ verified }),
}));
