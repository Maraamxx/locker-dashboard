import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL ?? '/api';
const api = axios.create({
  baseURL, // uses env var in dev or relative '/api' in production
});

// Add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401/403 errors and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      // Dispatch a custom event instead of navigating directly
      window.dispatchEvent(new CustomEvent("logout"));
    }
    return Promise.reject(error);
  }
);

export default api;
