import axios from "axios";

const api = axios.create({
  baseURL: "https://locker-dashboard-production.up.railway.app", // your backend
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
