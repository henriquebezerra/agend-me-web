import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from '@/constants';
import { localization } from '@/localization/localization-manager';
import type { User } from '@/types';

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

// ============================================================
// LocalStorage helpers
// ============================================================

const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const state = parsed?.state ?? parsed;
    const token = state?.user?.token;
    return typeof token === 'string' && token ? token : null;
  } catch {
    return null;
  }
};

const getStoredRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const state = parsed?.state ?? parsed;
    const refreshToken = state?.user?.refreshToken;
    return typeof refreshToken === 'string' && refreshToken ? refreshToken : null;
  } catch {
    return null;
  }
};

const forceLogout = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  document.cookie = `${STORAGE_KEYS.AUTH_TOKEN}=; path=/; max-age=0`;
  if (window.location.pathname !== '/login') window.location.href = '/login';
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
// Response Interceptor — lock+queue refresh token cycle
// ============================================================

type QueueItem = { resolve: (token: string) => void; reject: (err: unknown) => void };

let isRefreshing = false;
let pendingQueue: QueueItem[] = [];

const drainQueue = (token: string) => {
  pendingQueue.forEach((item) => item.resolve(token));
  pendingQueue = [];
};

const rejectQueue = (err: unknown) => {
  pendingQueue.forEach((item) => item.reject(err));
  pendingQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const requestUrl = originalRequest?.url ?? '';
    const isAuthRequest = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/refresh');

    if (error.response?.status !== 401 || isAuthRequest) {
      return Promise.reject(new Error(getErrorMessage(error)));
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest._retry = true;
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return api(originalRequest);
      });
    }

    const storedRefreshToken = getStoredRefreshToken();
    if (!storedRefreshToken) {
      forceLogout();
      return Promise.reject(new Error(getErrorMessage(error)));
    }

    isRefreshing = true;
    originalRequest._retry = true;

    try {
      const { data: updatedUser } = await axios.post<User>(
        `${API_BASE_URL}/auth/refresh`,
        storedRefreshToken,
        { headers: { 'Content-Type': 'text/plain', Accept: 'application/json' } },
      );

      // Persiste o novo User no localStorage
      const raw = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const parsed = raw ? JSON.parse(raw) : {};
      parsed.state = { ...parsed.state, user: updatedUser, isAuthenticated: true };
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, JSON.stringify(parsed));

      // Atualiza o cookie para o proxy server-side
      if (updatedUser.token) {
        document.cookie = `${STORAGE_KEYS.AUTH_TOKEN}=${updatedUser.token}; path=/; SameSite=Lax`;
      }

      // Sincroniza o store Zustand em memória
      const { useAuthStore } = await import('@/store/auth.store');
      useAuthStore.getState().setUser(updatedUser);

      drainQueue(updatedUser.token!);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${updatedUser.token}`;
      }
      return api(originalRequest);
    } catch (refreshError) {
      rejectQueue(refreshError);
      forceLogout();
      return Promise.reject(new Error(getErrorMessage(refreshError)));
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
