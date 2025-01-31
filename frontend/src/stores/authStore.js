import { create } from "zustand";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const BASE_URL = "http://localhost:8000"; // Replace with your backend URL
// const BASE_URL = "http://39.103.137.84:8000/api"; // Replace with your backend URL

const AUTH_URL = `${BASE_URL}/auth`;

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token")) : null,

  setToken: (access_token) => {
    localStorage.setItem("token", access_token);
    set({ token: access_token, user: jwtDecode(access_token) });
  },

    isAuthenticated: () => !!localStorage.getItem("token"),

  login: async (email, password) => {
    try {
      const response = await axios.post(`${AUTH_URL}/login`, { email, password });
      console.log(response.data);
      const {access_token} = response.data;
      localStorage.setItem("token", access_token);
      set({ token: access_token, user: jwtDecode(access_token) });

      return true;

    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  }
}));

export default useAuthStore;
