import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      verified: false,

      register: (user) => set({ user }),

      login: (user) => set({ user }),

      logout: () => set({ user: null }),

      reset: () => set({ user: null, verified: false }),

      isAuthenticated: () => !!get().user,

      setVerified: (verified) => set({ verified }),
    }),
    {
        name: "user-storage", // Key in localStorage
        storage: createJSONStorage(() => localStorage), // Use localStorage to persist data, this is the default, you can delete this line

        // Optional: Use sessionStorage instead of localStorage
        // storage: createJSONStorage(() => sessionStorage),
    }
  )
);
