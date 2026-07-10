import api from '@/lib/api/axios';
import { type ApiResponse } from '@/types';

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

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
    return response.data;
  },

  register: async (payload: RegisterPayload): Promise<ApiResponse<AuthUser>> => {
    const response = await api.post<ApiResponse<AuthUser>>('/auth/register', payload);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<AuthTokens>> => {
    const response = await api.post<ApiResponse<AuthTokens>>('/auth/refresh', { refreshToken });
    return response.data;
  },

  me: async (): Promise<ApiResponse<AuthUser>> => {
    const response = await api.get<ApiResponse<AuthUser>>('/auth/me');
    return response.data;
  },
};

export default authService;
