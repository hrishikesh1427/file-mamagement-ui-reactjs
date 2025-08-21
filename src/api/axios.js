import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", 
});

// Add token to every request if present
API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Refresh token if 401 unauthorized
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        if (refresh) {
          const { data } = await axios.post("http://localhost:8000/api/auth/token/refresh/", { refresh });
          localStorage.setItem("access", data.access);
          API.defaults.headers.Authorization = `Bearer ${data.access}`;
          return API(originalRequest);
        }
      } catch (err) {
        localStorage.clear();
        window.location.href = "/"; // redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default API;
