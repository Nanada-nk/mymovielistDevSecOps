import axios from "axios";
import { useUserStore } from "../stores/useUserStore.js";
import { authApi } from "./authApi.js";

const baseConfig = {
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  withCredentials: true,
};

const publicApi = axios.create(baseConfig);

const privateApi = axios.create(baseConfig);

privateApi.interceptors.request.use(
  (config) => {
    const accessToken = useUserStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      // if (!originalRequest._retry) {
      //   return Promise.reject(error);
      // }
      originalRequest._retry = true;
      try {
        // const response = await publicApi.post("/auth/refresh-token");
        const response = await authApi.refreshToken();
        const newAccessToken = response.data.accessToken;
        useUserStore.getState().setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return privateApi(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { publicApi, privateApi };
