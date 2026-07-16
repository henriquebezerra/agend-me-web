import api from '@/lib/api/axios';
import { type User } from '@/types';

// ============================================================
// Auth Service — handles all authentication API calls
// ============================================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await api.post<User>('/auth/login', {
      email: credentials.email,
      senha: credentials.password,
    });
    return response.data;
  },

  register: async (payload: RegisterPayload): Promise<User> => {
    const response = await api.post<User>('/auth/register', payload);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  refreshToken: async (refreshToken: string): Promise<AuthTokens> => {
    const response = await api.post<AuthTokens>('/auth/refresh', { refreshToken });
    return response.data;
  },

  me: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
};

export default authService;
