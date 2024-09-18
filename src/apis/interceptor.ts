import axios from "axios";

const groupsApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

groupsApi.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default groupsApi;
