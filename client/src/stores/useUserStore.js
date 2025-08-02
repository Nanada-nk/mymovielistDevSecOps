import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "../api/authApi";

const userStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: () => {
        const state = get();
        return !!state.user && !!state.accessToken;
      },
      setAccessToken: (token) => set({ accessToken: token }),
      login: async (data) => {
        const response = await authApi.login(data);
        set({
          user: response.data.user,
          accessToken: response.data.accessToken,
        });
      },
      register: async (data) => {
        const response = await authApi.register(data);
        set({
          user: response.data.user,
          accessToken: response.data.accessToken,
        });
      },
      updateProfile: async (data) => {
        const response = await authApi.updateProfile(data);
        set({ user: response.data.user });
      },
      logout: async () => {
        await authApi.logout();
        set({ user: null, accessToken: null });
      },
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);

export const useUserStore = userStore;
