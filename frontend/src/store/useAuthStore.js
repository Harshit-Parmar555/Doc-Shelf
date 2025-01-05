import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-hot-toast";

// Auth Store

export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth: true,
  signing: false,
  logging: false,
  updating: false,

  checkAuth: async () => {
    try {
      set({ checkingAuth: true });
      const res = await axiosInstance.get("/user/checkAuth");
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ checkingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ signing: true });
      const res = await axiosInstance.post("/user/register", data);
      toast.success("Registration Successfull");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ signing: false });
    }
  },

  login: async (data) => {
    try {
      set({ logging: true });
      const res = await axiosInstance.post("/user/login", data);
      set({ authUser: res.data.user });
      toast.success("Login SuccessFull");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ logging: false });
    }
  },

  logout: async () => {
    try {
      set({ loggingout: true });
      const res = await axiosInstance.get("/user/logout");
      set({ authUser: null });
      toast.success("Logout SuccessFull");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ loggingout: false });
    }
  },

  update: async (data) => {
    try {
      set({ updating: true });
      const res = await axiosInstance.post("/user/update-profile", data);
      toast.success("Profile Updated");
      set({ authUser: res.data.user });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ updating: false });
    }
  },
}));
