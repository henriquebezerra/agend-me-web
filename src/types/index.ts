// ============================================================
// Global TypeScript Types & Interfaces
// ============================================================

export interface User {
  id: number;
  nome: string;
  email: string;
  avatar?: string;
  role: UserRole;
  token?: string;
  senha?: string | null;
  dataExpiracao?: string;
  exp?: number;
}

export type UserRole = 'PRESTADOR' | 'ADMIN' | 'CLIENTE';

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface SelectOption {
  label: string;
  value: string;
}
