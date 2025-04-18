import { create } from "zustand";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  mobile: string;
  signup: (formData: {
    username: string;
    email: string;
    password: string;
  }) => void;
  signin: (formData: { email: string; password: string }) => void;
  updateProfile: (formData: { mobile: string }) => void;
  verify: () => void;
  getProfile: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  mobile: "",

  signup: async (formData) => {
    try {
      const response = await axiosInstance.post("/v1/auth/register", formData);
      set({ user: response.data.user, isAuthenticated: true });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isAuthenticated", "true");
      toast.success(response.data.msg, { duration: 3000 });
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Signup failed", {
        duration: 3000,
      });
    }
  },

  signin: async (formData) => {
    try {
      const response = await axiosInstance.post("/v1/auth/login", formData);
      set({ user: response.data.user, isAuthenticated: true });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isAuthenticated", "true");
      toast.success(response.data.msg, { duration: 3000 });
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Login failed", {
        duration: 3000,
      });
    }
  },

  verify: async () => {
    try {
      const response = await axiosInstance.get("/v1/auth/verify");
      set({ user: response.data.user, isAuthenticated: true });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isAuthenticated", "true");
    } catch (error: any) {
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    }
  },

  updateProfile: async (formData) => {
    try {
      const response = await axiosInstance.post("/v1/auth/profile", formData);
      set({ mobile: response.data.userDetails.mobile });
      toast.success(response.data.msg, { duration: 3000 });
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Update failed", {
        duration: 3000,
      });
      console.log(error)
    }
  },

  getProfile: async () => {
    try {
      const response = await axiosInstance.get("/v1/auth/profile");
      set({ mobile: response.data.userDetails.mobile });
    } catch (error: any) {
      
    }
  },

  logout: async () => {
    try {
      if (!localStorage.getItem("isAuthenticated")) return;
      await axiosInstance.get("/v1/auth/logout");
      toast.success("Logged out successfully", { duration: 3000 });
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/";
    } catch (error: any) {
      toast.error(error?.response?.data?.msg || "Logout failed", {
        duration: 3000,
      });
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/signin";
    } finally {
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    }
  },
}));

export default useAuthStore;
