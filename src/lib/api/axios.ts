import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from '@/constants';

// ============================================================
// Axios Instance
// ============================================================

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ============================================================
// Request Interceptor — attach Bearer token
// ============================================================

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

      if (token) {
        try {
          const parsed = JSON.parse(token);
          if (parsed?.token) {
            token = parsed.token;
          } else if (parsed?.accessToken) {
            token = parsed.accessToken;
          }
        } catch {
          // token remains raw string when parse fails
        }

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ============================================================
// Response Interceptor — handle 401 / token refresh
// ============================================================

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default api;
