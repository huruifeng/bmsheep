import { create } from "zustand";
import {jwtDecode} from "jwt-decode";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist((set, get) => ({
    token: null,
    user: null,

    login: (token) => {
        set({ token, user: jwtDecode(token) });
    },
    logout: () => {
        set({ token: null, user: null });
    },

      isAuthenticated: () => {
          return !!get().token;
      },

      getUser: () => {
          return get().user;
      },

      getToken: () => {
          return get().token;
      },

      setToken: (token) => {
          set({ token });
      },

      setUser: (user) => {
          set({ user });
      },

  }),
      {
          name: "auth-storage",
          storage: createJSONStorage(() => localStorage),
      }
  )
);

export default useAuthStore;
