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

const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

  if (!rawToken) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawToken);
    const persistedState = parsed?.state ?? parsed;

    if (persistedState && typeof persistedState === 'object') {
      if (typeof persistedState.token === 'string' && persistedState.token) {
        return persistedState.token;
      }

      if (typeof persistedState.accessToken === 'string' && persistedState.accessToken) {
        return persistedState.accessToken;
      }
    }

    if (typeof parsed?.token === 'string' && parsed.token) {
      return parsed.token;
    }

    if (typeof parsed?.accessToken === 'string' && parsed.accessToken) {
      return parsed.accessToken;
    }
  } catch {
    return rawToken;
  }

  return rawToken;
};

// ============================================================
// Request Interceptor — attach Bearer token
// ============================================================

api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
