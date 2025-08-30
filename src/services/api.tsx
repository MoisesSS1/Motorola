import { create } from "apisauce";
import Cookies from "js-cookie";

const api = create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor que injeta o token antes de cada requisição
api.axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export { api };
