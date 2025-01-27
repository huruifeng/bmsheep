// use zustand store the user status
import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: null,

    setUser: (user) => set({ user }),

    getUser: () => useUserStore.getState().user,

    login: (user) => set({ user }),
    logout: () => set({ user: null }),

    isAuthenticated: () => !!useUserStore.getState().user,

    register: (user) => set({ user }),

}));
