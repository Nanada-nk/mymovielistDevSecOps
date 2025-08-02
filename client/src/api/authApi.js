import { publicApi } from "./baseApi";

const authApi = {
  register: (data) => {
    return publicApi.post("/auth/register", data);
  },
  login: (data) => {
    return publicApi.post("/auth/login", data);
  },
  logout: () => {
    return publicApi.post("/auth/logout");
  },
  updateProfile: (data) => {
    return publicApi.put("/auth/profile", data);
  },
  forgotPassword: (data) => {
    return publicApi.post("/auth/forgot-password", data);
  },
  resetPassword: (token, data) => {
    return publicApi.post(`/auth/reset-password/${token}`, data);
  },
};

export { authApi };
