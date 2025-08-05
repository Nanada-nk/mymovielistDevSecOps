import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "../api/authApi.js";

const userStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setAccessToken: (token) => set({ accessToken: token }),

      login: async (data) => {
        const response = await authApi.login(data);
        set({
          user: response.data.user,
          accessToken: response.data.accessToken,
          isAuthenticated: true,
        });
        return response.data;
      },
      register: async (data) => {
        const response = await authApi.register(data);
        set({
          user: response.data.user,
          accessToken: response.data.accessToken,
        });
      },
      logout: async () => {
        await authApi.logout();
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
      getMe: async () => {
        try {
          const response = await authApi.getMe();
          set({ user: response.data, isAuthenticated: true });
        } catch (error) {
          set({ user: null, accessToken: null, isAuthenticated: false });
          console.error("Failed to fetch user:", error);
        }
      },
      updateProfile: async (data) => {
        const response = await authApi.updateProfile(data);
        set({ user: response.data.user });
      },
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);

export const useUserStore = userStore;