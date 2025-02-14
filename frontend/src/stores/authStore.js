import { create } from "zustand";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const BASE_URL = "http://localhost:8000"; // Replace with your backend URL
// const BASE_URL = "http://39.103.137.84:8000/api"; // Replace with your backend URL

const AUTH_URL = `${BASE_URL}/auth`;

const storedToken = sessionStorage.getItem("token");
const validToken = storedToken && storedToken !== "undefined" ? storedToken : null;


const useAuthStore = create((set) => ({
    token: validToken,
    user: validToken ? jwtDecode(validToken) : null,

    setToken: (access_token) => {
        if (!access_token || access_token === "undefined") return;

        sessionStorage.removeItem("token");
        set({ token: null, user: null });

        sessionStorage.setItem("token", access_token);
        set({ token: access_token, user: jwtDecode(access_token) });
    },

    isAuthenticated: () => !!sessionStorage.getItem("token"),

    login: async (email, password) => {
        try {
            const response = await axios.post(`${AUTH_URL}/login`, { email, password });
            // console.log(response.data);

            if (response.data.success){
                const {access_token} = response.data;
                if (!access_token) return {success: false, message: "Error in getting access token."};

                sessionStorage.setItem("token", access_token);
                set({ token: access_token, user: jwtDecode(access_token) });

                return response.data;
            }else{
                return response.data;
            }

        } catch (error) {
            console.error("Login failed", error);
            return {success: false, message: "Login error occurred."};
        }
    },

    getNewToken: async (email) => {
        try {
            const response = await axios.post(`${AUTH_URL}/get_token`, { email });
            const {access_token} = response.data;
            sessionStorage.setItem("token", access_token);
            set({ token: access_token, user: jwtDecode(access_token) });
            return response.data;
        } catch (error) {
            console.error("Token refresh failed", error);
            return {success: false, message: "Token refresh failed"};
        }
    },

    logout: () => {
        sessionStorage.removeItem("token");
        set({ token: null, user: null });
    }
}));

export default useAuthStore;
