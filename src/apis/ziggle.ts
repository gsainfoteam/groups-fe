import LocalStorageKeys from "@/types/localstorage";
import axios from "axios";

const ziggleapi = axios.create({
  baseURL: import.meta.env.VITE_ZIGGLE_URL,
});

ziggleapi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(LocalStorageKeys.AccessToken);
  if (!accessToken) return config;

  config.headers["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

export default ziggleapi