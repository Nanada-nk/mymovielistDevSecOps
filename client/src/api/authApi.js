import { privateApi, publicApi } from "./baseApi";

const authApi = {
  register: (data) => {
    return publicApi.post("/auth/register", data);
  },
  login: (data) => {
    return publicApi.post("/auth/login", data);
  },
  forgotPassword: (data) => {
    return publicApi.post("/auth/forgot-password", data);
  },
  resetPassword: (token, data) => {
    return publicApi.post(`/auth/reset-password/${token}`, data);
  },
  refreshToken: () => {
    return publicApi.post("/auth/refresh-token");
  },
  getMe: () => {
    return privateApi.get("/auth/me");
  },
  logout: () => {
    return privateApi.post("/auth/logout");
  },
  updateProfile: (data) => {
    return privateApi.put("/auth/profile", data);
  },
};

export { authApi };
