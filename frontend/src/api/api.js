import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  console.log("API Request:", config.method?.toUpperCase(), config.url);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.config.url, response.status, response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", error.config?.url, error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);
