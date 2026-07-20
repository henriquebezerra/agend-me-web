import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from '@/constants';
import { localization } from '@/localization/localization-manager';

type ApiErrorPayload = {
  message?: string;
  violations?: Array<{ message?: string; field?: string }>;
  errors?: Array<{ message?: string }> | Record<string, string[]>;
};

const getErrorMessage = (error: AxiosError | unknown): string => {
  const payload = (error as AxiosError<ApiErrorPayload>)?.response?.data;

  if (payload && typeof payload === 'object') {
    if (typeof payload.message === 'string' && payload.message.trim()) {
      return payload.message;
    }

    if (Array.isArray(payload.violations) && payload.violations[0]?.message) {
      return payload.violations[0].message;
    }

    if (Array.isArray(payload.errors) && payload.errors[0]?.message) {
      return payload.errors[0].message;
    }

    if (payload.errors && typeof payload.errors === 'object') {
      const firstError = Object.values(payload.errors)[0];
      if (Array.isArray(firstError) && firstError[0]) {
        return firstError[0];
      }
    }
  }

  if (axios.isAxiosError(error) && error.message) {
    return error.message;
  }

  return 'Erro inesperado. Tente novamente.';
};

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
    // rawToken não é JSON — trata como token literal
    return rawToken;
  }

  return null;
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

    config.headers['Accept-Language'] =
      typeof window !== 'undefined' ? localization.languageTag : 'pt-BR';

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
    const requestUrl = originalRequest?.url ?? '';
    const isAuthRequest = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
      originalRequest._retry = true;

      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);

        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }

    const normalizedError = new Error(getErrorMessage(error));
    Object.assign(normalizedError, {
      statusCode: error.response?.status,
      response: error.response,
    });

    return Promise.reject(normalizedError);
  },
);

export default api;
