import LocalstorageKeys from "@/types/localstorage";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(LocalstorageKeys.AccessToken);
  if (!accessToken) return config;

  config.headers["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

export default api;
